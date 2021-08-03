import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/_services/common.service';
import { validString } from 'src/app/_validators/string';
import { validEmail } from 'src/app/_validators/validEmail';
import { urls } from 'src/app/_services/urls';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/_services/notifications.service';
@Component({
	selector: 'app-my-profile',
	templateUrl: './my-profile.component.html',
	styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
	selectedCountry: any;
	updateProfile: FormGroup;
	isLoading: boolean = false;
	files: any;
	imgurl: string | ArrayBuffer;
	constructor(private _fb: FormBuilder,private service:CommonService,private router:Router,private _noti: NotificationsService) { }

	ngOnInit(): void {
this.getProfile()

		this.updateProfile = this._fb.group({
			name: [null, [Validators.required, Validators.maxLength(30), Validators.minLength(4), validString]],
			email: [null, [validEmail, Validators.required, Validators.email]],
			phone: [null, Validators.required],
			address: [null, [Validators.required]],
			
		});
	}

	countryChanged(event: any) {
		if (event) {
			this.selectedCountry = event;
		}
	}

	signUpNow() {
		// if (this.signUpForm.get('full_phone').value) {
		// 	let phones = this.signUpForm.get('full_phone').value.split(this.selectedCountry.dialCode);
		// 	this.signUpForm.get('phone_number').setValue(phones[1]);
		// 	this.signUpForm.get('country_code').setValue('+' + this.selectedCountry.dialCode);
		// }
	}
	getProfile(){
this.service.get('admin/get-profile/').subscribe((res:any)=>{
	console.log('Get profile',res);
	
})
	}
	Update(){
		let name = this.updateProfile.controls.name.value?this.updateProfile.controls.name.value.split(' '):null
		if (this.updateProfile.valid) {
			this.isLoading = true;
			let obj = {
				"first_name":name[0],
				"last_name":name[1],
				"phone_number":this.updateProfile.controls.phone.value,
				"profile_image":this.files,
				"address":this.updateProfile.controls.address.value
			}
			this.service.put(urls.updateProfile, obj).subscribe(res => {
				this._noti.show("success", "Password changed successfully.", "Success!");
				this.router.navigate(['/dashbaord']);
				this.isLoading = false;
			}, _ => {
				this.isLoading = false
			})
		} else {
			this.updateProfile.markAllAsTouched();
		}
	}
	sendFile(fileData) {
		
	   let formdata = new FormData()
		formdata.append('media', fileData);
		this.service.uploadMedia(formdata).subscribe((res: any) => {
		 
		  if (res.code==200) {
			// this.service.subject.next(true)
		 this._noti.show('success','File updated successfully','File')
			console.log("upload data res=>>", res.data[0].id)
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
			this.sendFile(fileData)
			reader.onload = (event) => { // called once readAsDataURL is completed
				this.imgurl = event.target.result;
			  }
			 console.log('imgUrl',this.imgurl);
			 
		  }
		}
	  }
}
