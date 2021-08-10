import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators ,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { CommonService } from 'src/app/_services/common.service';
import { NotificationsService } from 'src/app/_services/notifications.service';
import { urls } from 'src/app/_services/urls';
import { validEmail } from 'src/app/_validators/validEmail';
import { environment } from 'src/environments/environment';
declare var google;
@Component({
  selector: 'app-manage-update',
  templateUrl: './manage-update.component.html',
  styleUrls: ['./manage-update.component.scss']
})
export class ManageUpdateComponent implements OnInit,AfterViewInit {
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
  selectedCountry: any;
  contactUs:FormGroup
  bankDetailForm:FormGroup
  FaqForm:FormGroup
  faqArray: FormArray;
  bankList: any = [];
  baseUrl:string = environment.homeURL
	public bankListEvent = new Subject<string>();
	bankListLoading: boolean = false;
  BankId: any;
  constructor(private service: CommonService, private router: Router, private _noti: NotificationsService,private fb:FormBuilder,private _common:CommonService) { }
 ngOnInit(): void {
this.contactUs = this.fb.group({
  email:['',[Validators.required,validEmail,Validators.email]],
  phone:['',[Validators.required]]
})
this.bankDetailForm = this.fb.group({
  bank_name:['',[Validators.required]],
  accountHolder:['',[Validators.required]],
  accNumber:['',[Validators.required]]
})
   this.GetCms()
   this.searchBanks();
   this.bankListEvent.next('');
  }
  countryChanged(event: any) {
		if (event) {
			this.selectedCountry = event;
		}
	}
ngAfterViewInit(){
  this.GetAdminBank()
  this.FaqForm = this.fb.group({
    faqArray: this.fb.array([this.createRow()])
  })
}
  GetCms(){
  	this.service.get('cms/get-details/').subscribe((res: any) => {
     
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
GetAdminBank(){
  this.service.get('admin/get-bank-details/').subscribe((res: any) => {
   
     let temVar = res?.data;
     this.BankId = res?.data?.bank_name?.id
     this.bankDetailForm.patchValue({
      bank_name: temVar?.bank_name?.id,
      accountHolder: temVar?.account_holder_name,
      accNumber: temVar?.account_number,
    });
  })
}
TabRef(ref){
this.isLoading = false
if(ref=='details'){
  this.searchBanks()
  this.bankDetailForm.controls['bank_name'].setValue(this.BankId)
}else if(ref=='faq'){
  this.FaqForm = this.fb.group({
    faqArray: this.fb.array([])
  })
}
}
UpdateTerms(){
 if(this.terms || this.privacy || this.precedure || this.lat || this.long){
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
      this.address = results[0].formatted_address
      localStorage.setItem('address',results[0].formatted_address)
    });
  }
  searchBanks() {
		this.bankListEvent
			.pipe(
				distinctUntilChanged(),
				debounceTime(200),
				switchMap((term) => {
					this.bankListLoading = true;
					if(term ) {
						return this._common.get(urls.searchBank + `${term}/`);
					} else {
						return new Observable((resolve => resolve.next(null)));
         }
				})
			)
			.subscribe(
				(items) => {
					this.bankListLoading = false;
					if(items) {
						this.bankList = items.data;
      		}
				},
				(err) => {
					this.bankList = [];
					this.bankListLoading = false;
				}
			);}
  AdminBankDetails(){
	  if(this.bankDetailForm.valid){
    this.isLoading = true
    this.AddFn()
    }else{
      this.bankDetailForm.markAllAsTouched()
    }
  }
  AddFn() {
		let obj = {
      "bank_name":this.bankDetailForm.controls.bank_name.value,
      "account_number":this.bankDetailForm.controls.accNumber.value,
      "account_holder_name":this.bankDetailForm.controls.accountHolder.value
		}
		this.service.post(urls.adminbakDetails, obj).subscribe((res:any) => {
			if(res.code==200){
				this._noti.show("success", "Bank details added succesfully.", "Success!");
        this.isLoading = false;
      }
		}, _ => {
			this.isLoading = false
		})
	}
  GetFaq(){
    this.service.get('cms/get-all-faq/').subscribe((res: any) => {
      console.log('Get FAQ',res);
      let temVar = res?.data;
      this.BankId = res?.data?.bank_name?.id
      this.FaqForm.patchValue({
     });
   })
  }
  createRow() {
    return this.fb.group({
      question: new FormControl('',[Validators.required]),
      answer:new FormControl('',[Validators.required]),
   })
  }
  addRow(){
    this.faqArray = this.FaqForm.get('faqArray') as FormArray;
    this.faqArray.push(this.createRow());
  }
  removeGroup(index){
     this.faqArray = this.FaqForm.get('faqArray') as FormArray;
      this.faqArray.removeAt(index);
  }
}


