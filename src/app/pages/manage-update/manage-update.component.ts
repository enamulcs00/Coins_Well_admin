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
  bankList: any = [];
  baseUrl:string = environment.homeURL
	public bankListEvent = new Subject<string>();
	bankListLoading: boolean = false;
  BankId: any;
  termsCondition:FormGroup
  About:FormGroup
  privacyPolicy:FormGroup
  Address:FormGroup
  procedure:FormGroup
  REF: any;
  constructor(private service: CommonService, private router: Router, private _noti: NotificationsService,private fb:FormBuilder,private _common:CommonService) { 
    this.termsCondition = this.fb.group({
      terms:['',[Validators.required,Validators.maxLength(250)]]
    })
    this.About = this.fb.group({
      about:['',[Validators.required,Validators.maxLength(250)]]
    })
    this.privacyPolicy = this.fb.group({
      privacy:['',[Validators.required,Validators.maxLength(250)]]
    })
    this.Address = this.fb.group({
      address:['',[Validators.required,Validators.maxLength(250)]]
    })
    this.procedure = this.fb.group({
      paymentprocedure:['',[Validators.required,Validators.maxLength(250)]]
    })
  }
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
  Payment(){
    if(this.procedure.valid){
      let obj ={
        "payment_instructions":this.procedure.controls['paymentprocedure'].value}
      this.updateFn(obj)
    }else{ 
      this.procedure.markAllAsTouched() 
    }
  }
  CompanyAddress(){
    if(this.Address.valid){
      let obj ={
      "latitude":this.lat,
      "longitude":this.long,
      "address":this.Address.controls['address'].value}
      this.updateFn(obj)
    }else{ 
      this.Address.markAllAsTouched() 
    }
  }
  countryChanged(event: any) {
		if (event) {
			this.selectedCountry = event;
		}
	}
  Privacy(){
    if(this.privacyPolicy.valid){
      let obj ={"privacy_policy":this.privacyPolicy.controls['privacy'].value}
      this.updateFn(obj)
    }else{ 
      this.About.markAllAsTouched() 
    }
  }
ngAfterViewInit(){
  this.GetAdminBank()
}
  GetCms(){
  	this.service.get('cms/get-details/').subscribe((res: any) => {
      console.log('CMS',res);
      this.UpdatesInfo = res?.data;
      this.termsCondition.controls['terms'].setValue(res?.data?.terms_conditon)
       this.lat = res?.data?.latitude
       this.long = res?.data?.longitude
       this.Address.controls['address'].setValue(res?.data?.address)
       this.privacyPolicy.controls['privacy'].setValue(res?.data?.privacy_policy)
       this.procedure.controls['paymentprocedure'].setValue(res?.data?.payment_instructions)
       this.About.controls['about'].setValue(res?.data?.about_us)
       this.contactUs.controls['email'].setValue(res.data.email)
       this.contactUs.controls['phone'].setValue(res.data.phone_no)
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
this.REF = ref
if(ref=='details'){
  this.searchBanks()
  this.bankDetailForm.controls['bank_name'].setValue(this.BankId)
}

}
SubmitContactUs(){
  if(this.contactUs.valid){
    let obj ={
      "phone_no":this.contactUs.controls['phone'].value,
      "email":this.contactUs.controls['email'].value
    }
  this.updateFn(obj)
  }else {
    this.contactUs.markAllAsTouched()
  }
}
AboutUs(){
  if(this.About.valid){
    let obj ={"about_us":this.About.controls['about'].value}
    this.updateFn(obj)
  }else{
    this.About.markAllAsTouched()
  }
}
Terms(){
  if(this.termsCondition.valid){
    let obj ={"terms_conditon":this.termsCondition.controls['terms'].value}
    this.updateFn(obj)
  }else{
    this.termsCondition.markAllAsTouched()
  }
}

updateFn(obj) {
  this.service.post(`cms/create-update/`,obj).subscribe((res:any) => {
    if(res.code==200){
      this._noti.show("success", "Data updated successfully.", "Success!");
      this.GetCms()
      this.isLoading = false;
    }
  }, _ => {
    this.isLoading = false
  })
}
public AddressChange(address: any) {
  this.Address.controls['address'].setValue(address.formatted_address)
  this.address = address.formatted_address
  this.lat = address.geometry.location.lat()
  this.long = address.geometry.location.lng()
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
				this._noti.show("success", "Bank details added successfully.", "Success!");
        this.isLoading = false;
      }
		}, _ => {
			this.isLoading = false
		})
	}
  
}


