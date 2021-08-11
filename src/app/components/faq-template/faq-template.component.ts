import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/_services/common.service';
import { NotificationsService } from 'src/app/_services/notifications.service';

@Component({
  selector: 'app-faq-template',
  templateUrl: './faq-template.component.html',
  styleUrls: ['./faq-template.component.scss']
})
export class FaqTemplateComponent implements OnInit {
  Faqcheck:FormGroup;
  termscond: any;
  submitted:boolean;
  constructor(private Srvc:CommonService,private formBuilder:FormBuilder,private noti:NotificationsService) 
  {

  this.Faqcheck = this.formBuilder.group({
    specification: this.formBuilder.array([], Validators.required),
  })

  }

  ngOnInit(): void {
    this.GetFaq()
  }
  GetFaq(){ 
      this.Srvc.get(`cms/get-all-faq/`).subscribe((res:any)=>
      {
        console.log(" Get Faq",res);
       
        this.setSpecifications(res.data)
      })
  } 

  addNewSpecification() {
    this.submitted = false
    this.specification().push(this.newSpecifiaction())
  }
  removeSpecification(i: number) {
    this.specification().removeAt(i);
  }
newSpecifiaction(): FormGroup {
    return this.formBuilder.group({
      question: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required),
      id: new FormControl('')
    })
  }
 specification(): FormArray {
    return this.Faqcheck.get('specification') as FormArray;
  }

  public errorHandling = (control: string, error: string) => {
    return this.Faqcheck.controls[control].hasError(error);
  }

  saveFaq()
  {
    this.Faqcheck.controls['specification'].value.forEach(v => (v.id=="")?delete v.id:'')
    this.submitted = true;
    if(!this.Faqcheck.invalid)
    {
      this.Srvc.post(`cms/add-update-delete-faq/`,this.Faqcheck.get('specification').value).subscribe((res:any)=>
      {
        if(res.code == 200)
        {
         this.noti.show('success',res.message,'Success')
         this.submitted = false
        }
      })
    }
 
  }

  setSpecifications(item) {
    const formArray = new FormArray([]);
    for (let x of item) {
      console.log(x)
      formArray.push(this.formBuilder.group({
        question: x.question,
        answer: x.answer,
        id:x.id
      }));
    }
    this.Faqcheck.setControl('specification',formArray)
  }
}
