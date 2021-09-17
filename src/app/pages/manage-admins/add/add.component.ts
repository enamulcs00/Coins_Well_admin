import { ToastrService } from 'ngx-toastr';
import { urls } from 'src/app/_services/urls';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Loading } from 'notiflix';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
	userForm: FormGroup;
	userPic: any;
	text: any;
	imageUrl: any;
	imageFlag: boolean = false;
	userId: any;
	permissionItems: any;
	adminId : any = null;
	constructor(private fb: FormBuilder, private commn_: CommonService, private toaster: ToastrService, private router: Router, private route: ActivatedRoute) {
		this.userForm = this.fb.group({
			phone_number: [null, [Validators.required, Validators.pattern(/^([0-9])*$/), Validators.maxLength(15), Validators.minLength(7)]],
			first_name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(new RegExp("\\S"))]],
			last_name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(new RegExp("\\S"))]],
			image: [null],
			email: [null, [Validators.required, Validators.email]],
			password: [null, [Validators.required, Validators.pattern(new RegExp("\\S")), Validators.minLength(8)]],
			country_code : ['+91'],
			permissions: this.fb.array([
			])
		});

		// For edit sub admin
		this.route.queryParams.subscribe(params => {
			this.adminId = params.id;
			if(this.adminId) {
				this.getAdminInfo();
			}
		})
	}

	getAdminInfo() {
		Loading.circle();
		this.commn_.get(urls.getSubAdminById+this.adminId).subscribe((data : any)=>{
			this.fillAdminInfo(data.data);
			Loading.remove();
		},() => {
			Loading.remove();
		});
	}

	fillAdminInfo(userInfo : any) {
		userInfo.permissions = userInfo.permissions.map(x=>{
			x.module = x.module.id
			return x;
		})
		this.userForm.patchValue(
			userInfo
		);
		this.imageUrl = environment.homeURL + userInfo.image.media_file;
	}


	ngOnInit(): void {
		this.getSubAdmin();
	}


	getSubAdmin() {
		this.commn_.get(urls.getSubAdminList).subscribe(res => {
			console.log(res);
			this.permissionItems = res.data;
			res?.data.forEach(element => {
				this.getForms().push(this.createForms(element));
			});;
		})
	}
	createForms(item: any) : FormGroup {
		return this.fb.group({
			"module": item.id,
			"is_add_edit": false,
			"is_view": false
		});
	}

	getForms() : FormArray {
		return this.userForm.get('permissions') as FormArray;
	}

	// User Image Select
	onImageSelect(e) {
		var files = e.target.files;
		if (files[0].size <= 10000000) {
			this.imageFlag = false;
			this.userPic = files[0];
			this.uploadMedia();
		} else {
			this.userPic = null;
		}
	}

	uploadMedia() {
		let formData = new FormData();
		if (this.userPic) {
			formData.append("media", this.userPic);
		}
		this.commn_.post(urls.addMedia, formData).subscribe((res) => {
			if (res.message == "OK") {
				if (this.userPic) {
					this.imageUrl = environment.imgBaseUrl + res.data[0].media_file;
					this.userForm.controls.image.setValue(res.data[0].id);
					this.toaster.success(res.message, "Success", { timeOut: 1050 });
				}
			}
		});
	}

	addUser() {
		if (this.userForm.valid) {	
			Loading.circle();
			let url = urls.addSubAdmin;
			if(this.adminId != null) {
				url = urls.editSubAdminStatus + this.adminId+'/';
				this.commn_.put(url, this.userForm.value).subscribe(res => {
					if (res.code == 200) {
						this.toaster.success(res.message, "Success", { timeOut: 1050 });
						this.router.navigate(['/manage-admins']);
					}
					else {
						this.toaster.error(res.message, "Error", { timeOut: 1050 });
					}
					Loading.remove();
				});
			} else {
				this.commn_.post(url, this.userForm.value).subscribe(res => {
					if (res.code == 200) {
						this.toaster.success(res.message, "Success", { timeOut: 1050 });
						this.router.navigate(['/manage-admins']);
					}
					else {
						this.toaster.error(res.message, "Error", { timeOut: 1050 });
					}
					Loading.remove();
				});
			}
			
		} else {
			this.userForm.markAllAsTouched();
			Loading.remove();
		}
	}

	checkPermission(index : any) {
		let fb = this.getForms().at(index) as FormGroup;
		if(fb.get('is_add_edit').value) {
			fb.get('is_view').setValue(true);
		}
	}

}
