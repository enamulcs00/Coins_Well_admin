import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TooltipPosition } from '@ng-matero/extensions';
import { CommonService } from 'src/app/_services/common.service';
import { NotificationsService } from 'src/app/_services/notifications.service';

import { environment } from 'src/environments/environment';
declare var $:any
@Component({
  selector: 'app-walkthrogh',
  templateUrl: './walkthrogh.component.html',
  styleUrls: ['./walkthrogh.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WalkthroghComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);
  imgurl: string;
  userInfo: any;
imgUrl=environment.homeURL
  splash: any;
  SplashUpdateForm:FormGroup
  ImageUrl: any;
  fileData: any;
  files: any;
  isLoading: boolean;
  IsAdd:boolean = false
  Id: any;
  constructor(private service: CommonService, private _noti: NotificationsService,private fb:FormBuilder) { }
ngOnInit(): void {
  this.GetWalthroughData()
  this.SplashUpdateForm = this.fb.group({
    title:['',[Validators.required,Validators.maxLength(50)]],
    description:['',[Validators.required,Validators.maxLength(50)]],
 })
}
Openmodal(){
  this.files = undefined
  this.IsAdd = true
  this.ImageUrl = undefined
  this.isLoading = false
  this.SplashUpdateForm.reset()
$('#editsplashscreen').modal('show')
}
GetWalthroughData(){
  	this.service.get('splash-screen/get-all-sreens/').subscribe((res: any) => {
      console.log('Get',res);
       this.userInfo = res.data;
			 this.splash = res.data
  	})
}
UpdateSplash(data){
  this.IsAdd = false
  this.isLoading = false
  this.Id = data?.id 
$('#editsplashscreen').modal('show')
this.ImageUrl = this.imgUrl+data?.image
this.files = data?.image
this.SplashUpdateForm.patchValue({
  title: data?.title,
  description:data?.description,
})
}
sendFile(fileData) {
  let formdata = new FormData()
  formdata.append('media', fileData);
  this.service.uploadMedia(formdata).subscribe((res: any) => {
    if (res.code == 200) {
      
      this.files = res.data[0].id
    }
  });
}
uploadFile(event) {
  if (event.target.files && event.target.files[0]) {
    var type = event.target.files[0].type;
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
      let fileData = event.target.files[0];
      this.fileData = fileData;
      this.sendFile(fileData)
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.ImageUrl = event.target.result;
      }
    }
  }
}
Update(){
  console.log('Upadte called');
 if(this.SplashUpdateForm.valid){
  this.isLoading = true
  this.updateFn()
  }else{
    this.SplashUpdateForm.markAllAsTouched()
  }
}
updateFn() {
  let obj = {
    "title":this.SplashUpdateForm.controls.title.value,
    "description":this.SplashUpdateForm.controls.description.value,
    "image":this.files?this.files:this.Id
  }
  this.service.put(`splash-screen/${this.Id}/`, obj).subscribe((res:any) => {
    if(res.code==200){
      this._noti.show("success", "Spalsh updated successfully.", "Success!");
      $('#editsplashscreen').modal('hide')
      this.GetWalthroughData()
       this.isLoading = false;
      
    }
  }, _ => {
    this.isLoading = false
  })
}
AddSplash(){
  if(this.files){
    console.log("Files",this.files);
   if(this.SplashUpdateForm.valid){
      console.log('Not undefined && Valid');
      this.isLoading = true
      this.AddFn()
      }else{
        this.SplashUpdateForm.markAllAsTouched()
      }
  }else{
    this._noti.show("error", "Please upload image.", "Failed");
console.log('Not file');

  }
   
}
AddFn() {
  let obj = {
    "title":this.SplashUpdateForm.controls.title.value.trim(),
    "description":this.SplashUpdateForm.controls.description.value.trim(),
    "image":this.files
  }
  this.service.post(`splash-screen/create/`, obj).subscribe((res:any) => {
    if(res.code==200){
      this._noti.show("success", "Spalsh screen added successfully.", "Success!");
      $('#editsplashscreen').modal('hide')
      this.GetWalthroughData()
       this.isLoading = false;
      
    }
  }, _ => {
    this.isLoading = false
  })
}

}
