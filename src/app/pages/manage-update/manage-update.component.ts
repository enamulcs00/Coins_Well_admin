import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';
import { NotificationsService } from 'src/app/_services/notifications.service';
declare var google;
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
  geoCoder: any;
  constructor(private service: CommonService, private router: Router, private _noti: NotificationsService,private fb:FormBuilder) { }
 ngOnInit(): void {
   this.GetCms()
  }
  GetCms(){
  	this.service.get('cms/get-details/').subscribe((res: any) => {
      console.log('Get cms',res);
       this.UpdatesInfo = res?.data;
       this.terms = res?.data?.terms_conditon
       this.lat = res?.data.latitude
       this.long = res.data.longitude
       this.privacy = res.data.privacy_policy
       this.precedure = res.data.payment_instructions
       this.aboutUs = res.data.about_us
       this.getAddressgeo(res?.data.latitude,res.data.longitude)
		})
}
TabRef(ref){
this.isLoading = false
}
UpdateTerms(){
 if(this.terms || this.privacy || this.precedure || this.lat || this.long){
  console.log('callled');
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
      this._noti.show("success", "Data updated succesfully.", "Success!");
      this.GetCms()
      this.isLoading = false;
    }
  }, _ => {
    this.isLoading = false
  })
}
public AddressChange(address: any) {
  this.address = address.formatted_address
  this.lat = address.geometry.location.lat()
  this.long = address.geometry.location.lng()
}
getAddressgeo(latitude, longitude) {
  this.geoCoder = new google.maps.Geocoder;
    this.geoCoder.geocode({location: {lat: latitude, lng: longitude}}, (results:any) => {
      console.log(results[0].formatted_address);
      this.address = results[0].formatted_address
      localStorage.setItem('address',results[0].formatted_address)
      console.log("Addrs called");
    });
  }
}

