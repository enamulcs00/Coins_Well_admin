import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationsService } from 'src/app/_services/notifications.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  otpvalue: any;
  OtpForm: FormGroup;
	isLoading: boolean = false;
  constructor(private fb:FormBuilder,private service:AuthService,private _noti: NotificationsService,private router:Router) { }

  ngOnInit(): void {
this.OtpForm = this.fb.group({
  otp:['']
})
  }
  onOtpChange(event)
  {
    this.otpvalue = event
    console.log(this.otpvalue);
}
VerifyOtp(){
  let url = `admin/verify-otp/`
  let obj = {
    "email":this.service.otpEmail,
    "otp":this.otpvalue}
    this.service.postApi(url,obj).subscribe((res:any)=>{
      console.log('Verify otp',res);
      if(res.code==200){
        this._noti.show('success', res.message,"Verification");
				this.router.navigate(['/auth/setpassword']);
      }else{
        this._noti.show('Failed', res.message,"Verification");
      }
    }) 
}
}
