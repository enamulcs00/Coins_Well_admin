import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/_services/common.service';
import { validString } from 'src/app/_validators/string';
import { validEmail } from 'src/app/_validators/validEmail';
import { urls } from 'src/app/_services/urls';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/_services/notifications.service';
import { removeSpaces } from 'src/app/_validators/remove-spaces';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
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
	fileData;
	constructor(private _fb: FormBuilder, private service: CommonService, private router: Router, private _noti: NotificationsService, private _auth: AuthService) { }

	ngOnInit(): void {
		this.getProfile()

		this.updateProfile = this._fb.group({
			first_name: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(4), validString]],
			last_name: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(4), validString, removeSpaces]],
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

	getProfile() {
		this.service.get('admin/get-profile/').subscribe((res: any) => {
			let userInfo = res.data;
			this.updateProfile.patchValue({
				first_name: userInfo?.first_name,
				last_name: userInfo?.last_name,
				phone: userInfo?.phone_number,
				email: userInfo?.email,
				address: userInfo?.address
			});
			this.files = userInfo?.image?.id
			this.imgurl = environment.homeURL + userInfo?.image?.path
		})
	}
	Update() {
		if (this.updateProfile.valid) {
			this.isLoading = true;
			if (this.fileData) {
				this.sendFile();
			} else {
				this.updateProfileFn();
			}
		} else {
			this.updateProfile.markAllAsTouched();
		}
	}

	updateProfileFn() {
		let obj = {
			"first_name": this.updateProfile.controls.first_name.value,
			"last_name": this.updateProfile.controls.last_name.value,
			"phone_number": this.updateProfile.controls.phone.value,
			"image": this.files,
			"address": this.updateProfile.controls.address.value
		}
		this.service.put(urls.updateProfile, obj).subscribe(res => {
			this.service.get('admin/get-profile/').subscribe((res: any) => {
				var tempData = JSON.parse(localStorage.getItem(environment.storageKey));
				tempData = { ...tempData, ...res.data };
				localStorage.setItem(environment.storageKey, JSON.stringify(tempData));
				this._noti.show("success", "Profile updated successfully.", "Success!");
				this._auth.onProfileUpdate.next();
				this.router.navigate(['/dashboard']);
				this.isLoading = false;
			})
		}, _ => {
			this.isLoading = false
		})
	}

	sendFile() {
		let formdata = new FormData()
		formdata.append('media', this.fileData);
		this.service.uploadMedia(formdata).subscribe((res: any) => {
			if (res.code == 200) {
				this.files = res.data[0].id
				this.updateProfileFn();
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
				reader.onload = (event) => { // called once readAsDataURL is completed
					this.imgurl = event.target.result;
				}
			}
		}
	}
}
