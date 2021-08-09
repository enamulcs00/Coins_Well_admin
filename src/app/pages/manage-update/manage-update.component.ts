import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';
import { NotificationsService } from 'src/app/_services/notifications.service';

@Component({
  selector: 'app-manage-update',
  templateUrl: './manage-update.component.html',
  styleUrls: ['./manage-update.component.scss']
})
export class ManageUpdateComponent implements OnInit {
  terms:string
  privacy:string
  aboutUs:string
  address:string
  precedure:string
  UpdatesInfo: any;
  isLoading: boolean= false;
  lat: any;
  long: any;
  constructor(private service: CommonService, private router: Router, private _noti: NotificationsService,private fb:FormBuilder) { }
 ngOnInit(): void {
   this.GetCms()
  }
  GetCms(){
  	this.service.get('cms/get-details/').subscribe((res: any) => {
      console.log('Get cms',res);
       this.UpdatesInfo = res?.data;
       this.terms = res?.data?.terms_conditon
		})
}
TabRef(ref){
this.isLoading = false
}
UpdateTerms(){
 if(this.terms){
  this.isLoading = true
  this.updateFn()
  }else{
    this._noti.show("error", "Please enter the value.", "Failed!");
  }
}
updateFn() {
  let obj ={
    "terms_conditon":this.terms,
    "about_us":this.aboutUs,
    "payment_instructions":this.precedure,
    "privacy_policy":this.privacy,
    "latitude":this.lat,
    "longitude":this.long
}
  this.service.post(`cms/create-update/`,obj).subscribe((res:any) => {
    if(res.code==200){
      this._noti.show("success", "Spalsh updated succesfully.", "Success!");
      this.GetCms()
      this.isLoading = false;
    }
  }, _ => {
    this.isLoading = false
  })
}
}
