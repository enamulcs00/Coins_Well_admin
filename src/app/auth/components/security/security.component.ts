import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/_services/common.service';
import { NotificationsService } from 'src/app/_services/notifications.service';
import { urls } from 'src/app/_services/urls';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {
  AML:FormGroup;
  isLoading: boolean=false;
  userDoc: any;
  constructor(private fb:FormBuilder,public service: CommonService,private _noti: NotificationsService,private toastr:ToastrService) {
    this.AML = this.fb.group({
      specification: this.fb.array([], [Validators.required]),
    })
   }

  ngOnInit(): void {
    this.GetAML();
  }
  
  GetAML(){ 
    this.service.get('cms/get-details/').subscribe((res:any)=>
    {
      console.log(JSON.parse(res?.data?.security));
      this.setSpecifications(JSON.parse(res?.data?.security))
    })
} 

  addNewSpecification() {
    this.specification().push(this.newSpecifiaction())
  }
  removeSpecification(i: number) {
    this.specification().removeAt(i);
  }
newSpecifiaction(): FormGroup {
    return this.fb.group({
      title: new FormControl('', [Validators.required]),
      heading: new FormControl('', [Validators.required]),
      image: new FormControl('')
    })
  }
 specification(): FormArray {
    return this.AML.get('specification') as FormArray;
  }

  public errorHandling = (control: string, error: string) => {
    return this.AML.controls[control].hasError(error);
  }

  AMLSubmit()
  {
    // this.AML.controls['specification'].value.forEach(v => (v.id=="")?delete v.id:'')
    console.log(this.AML.value);
    if(this.AML.valid)
    {
      let obj={security: JSON.stringify(this.AML.value.specification)}
      this.updateFn(obj);
    }else{
      this.AML.markAllAsTouched()
    }
 
  }
   
  updateFn(obj) {
    this.service.post(`cms/create-update/`, obj).subscribe((res: any) => {
      if (res.code == 200) {
        this._noti.show("success", "Data updated successfully.", "Success!");
        this.GetAML();
        this.isLoading = false;
      }
    }, _ => {
      this.isLoading = false
    })
  }

  setSpecifications(item) {
    this.AML = this.fb.group({
      specification: this.fb.array([], [Validators.required]),
    })
    for(var i=0;i<item.length;i++){
      this.addNewSpecification()
    }
    this.AML.patchValue({specification: item})
  }
 
  onDocumentSelect(e,i) {
    var files = e.target.files;
    if (files[0].size <= 10000000) {
      this.userDoc = files[0];
      this.uploadMedia(i);
    } else {
      this.userDoc = null;
    }
  }
  
  uploadMedia(i)
  {
    let formData=new FormData();
    formData.append("media",this.userDoc);  
    this.service.post(urls.addMedia,formData).subscribe((res)=>{
    if(res.message=="OK")
    {
      console.log(this.specification(),i);
      this.specification().controls[i]['controls'].image.setValue(res.data[0].media_file);
      this.toastr.success(res.message,"Success",{timeOut:1050});
    }
    });
  }

}
