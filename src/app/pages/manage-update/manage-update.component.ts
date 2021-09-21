import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators ,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  htmlstring="Enam"
  aboutUs:string
  address:string
  precedure:string
  UpdatesInfo: any;
  isLoading: boolean= false;
  lat: any;
  long: any;
  geoCoder: any;
  selectedCountry: any;
  contactUs:FormGroup;
  Security:FormGroup;
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
  features:FormGroup;
  Fee:FormGroup;
  Cookies_Service:FormGroup;
  AML:FormGroup;
  rateInstruction:FormGroup;
  maintainance:boolean=false;
  constructor(public service: CommonService, private router: Router, private _noti: NotificationsService,private fb:FormBuilder,private _common:CommonService,private toastr:ToastrService) { 
    this.termsCondition = this.fb.group({
      terms:['',[Validators.required]]
    })
    this.About = this.fb.group({
      about:['',[Validators.required]]
    })
    this.Security = this.fb.group({
      security:['',[Validators.required]]
    })
    this.AML=this.fb.group({
      aml:['',[Validators.required]]
    });
    this.Cookies_Service = this.fb.group({
      cookies_service:['',[Validators.required]]
    })
    this.Fee=this.fb.group({
      fee:['',[Validators.required]]
    })
    this.privacyPolicy = this.fb.group({
      privacy:['',[Validators.required]]
    })
    this.Address = this.fb.group({
      address:['',[Validators.required]]
    })
    this.procedure = this.fb.group({
      paymentprocedure:['',[Validators.required]]
    })
    this.features = this.fb.group({
      features:['',[Validators.required]]
    })
    this.rateInstruction=this.fb.group({
      rateInstruction:['',[Validators.required]]
    });
    this.contactUs = this.fb.group({
      email:['',[Validators.required,validEmail,Validators.email]],
      phone:['',[Validators.required,Validators.minLength(7),Validators.maxLength(15)]],
      telegram_phone_number:['',[Validators.required,Validators.minLength(7),Validators.maxLength(15)]]
    });
    this.bankDetailForm = this.fb.group({
      bank_name:['',[Validators.required]],
      accountHolder:['',[Validators.required]],
      accNumber:['',[Validators.required]]
    });
  }

  public model = {
    name: 'Hardik',
    description: '<p>This is a sample form using CKEditor 4.</p>'
  };
 ngOnInit(): void {
   this.GetCms()
   this.searchBanks();
   this.bankListEvent.next('');
   this.getMaintenance();
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

  maintenanceStatus()
  {
    let body={maintenance_status:this.maintainance};
    console.log(body);
    this._common.post(urls.postMaintenance,body).subscribe(res=>{
    if(res.code==200)
    {
      this.toastr.success(res.message,"Success");
    }
    });
  }
  
  getMaintenance()
  {
    this._common.get(urls.getMaintenance).subscribe(res=>{
      
      this.maintainance=res?.data?.maintainance;
    });
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
      this.termsCondition.controls['terms'].patchValue(res?.data?.terms_conditon)
       this.lat = res?.data?.latitude
       this.long = res?.data?.longitude
       this.Address.controls['address'].patchValue(res?.data?.address)
       this.privacyPolicy.controls['privacy'].patchValue(res?.data?.privacy_policy)
       this.procedure.controls['paymentprocedure'].patchValue(res?.data?.payment_instructions)
       this.About.controls['about'].patchValue(res?.data?.about_us)
       this.contactUs.controls['email'].patchValue(res?.data?.email)
       this.contactUs.controls['phone'].patchValue(res?.data?.phone_no)
       this.contactUs.controls['telegram_phone_number'].patchValue(res?.data?.telegram_phone_number)
       this.features.controls['features'].patchValue(res?.data?.features)
       this.rateInstruction.controls['rateInstruction'].patchValue(res?.data?.rate_instructions);
       this.Security.controls['security'].patchValue(res?.data?.security);
       this.Fee.controls['fee'].patchValue(res?.data?.fee);
       this.Cookies_Service.controls['cookies_service'].patchValue(res?.data?.cookies_service);
       this.AML.controls['aml'].patchValue(res?.data?.aml);
		})
}
GetAdminBank(){
  this.service.get('admin/get-bank-details/').subscribe((res: any) => {
     let temVar = res?.data;
     this.BankId = res?.data?.bank_name?.id
     this.bankList =  [temVar?.bank_name]
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
      "email":this.contactUs.controls['email'].value,
      "telegram_phone_number":this.contactUs.controls['telegram_phone_number'].value,
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

SecuritySubmit(){
  this.isLoading=true;
  if(this.Security.valid){
    let obj ={"security":this.Security.controls['security'].value}
    this.updateFn(obj)
  }else{
    this.About.markAllAsTouched()
  }
}

AMLSubmit(){
  this.isLoading=true;
  if(this.AML.valid){
    let obj ={"aml":this.AML.controls['aml'].value}
    this.updateFn(obj)
  }else{
    this.About.markAllAsTouched()
  }
}

Cookies_ServiceSubmit(){
  this.isLoading=true;
  if(this.Cookies_Service.valid){
    let obj ={"cookies_service":this.Cookies_Service.controls['cookies_service'].value}
    console.log(obj);
    this.updateFn(obj)
  }else{
    this.About.markAllAsTouched()
  }
}

FeeSubmit(){
  this.isLoading=true;
  if(this.Fee.valid){
    let obj ={"fee":this.Fee.controls['fee'].value}
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
      "account_number":this.bankDetailForm.controls.accNumber.value.trim(),
      "account_holder_name":this.bankDetailForm.controls.accountHolder.value.trim()
		}
		this.service.post(urls.adminbakDetails, obj).subscribe((res:any) => {
			if(res.code==200){
				this._noti.show("success", "Bank details added successfully.", "Success!");
        this.isLoading = false;
        this.GetAdminBank();
      }
		}, _ => {
			this.isLoading = false
		})
	}

  Features(){
    if(this.features.valid){
      let obj ={
        "features":this.features.controls['features'].value}
      this.updateFn(obj)
    }else{ 
      this.features.markAllAsTouched() 
    }
  }

  RateInstruction(){
    this.isLoading=true;
    if(this.rateInstruction.valid){
      let obj ={
        "rate_instructions":this.rateInstruction.controls['rateInstruction'].value}
      this.updateFn(obj)
    }else{ 
      this.features.markAllAsTouched() 
    }
  }
}


