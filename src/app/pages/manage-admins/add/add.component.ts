import { ToastrService } from 'ngx-toastr';
import { urls } from 'src/app/_services/urls';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
	userForm: FormGroup;
	userPic: any;
	text: any;
	userDoc: any;
	imageUrl: any;
	imageFlag: boolean = false;
	userId: any;
	permissionItems: any;
	constructor(private fb: FormBuilder, private commn_: CommonService, private toaster: ToastrService, private router: Router, private route: ActivatedRoute) {
		this.userForm = this.fb.group({
			phone_number: [null, [Validators.required, Validators.pattern(/^([0-9])*$/), Validators.maxLength(15), Validators.minLength(7)]],
			first_name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(new RegExp("\\S"))]],
			last_name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(new RegExp("\\S"))]],
			image: [null],
			email: [null, [Validators.required, Validators.email]],
			password: [null, [Validators.required, Validators.pattern(new RegExp("\\S")), Validators.minLength(8)]],
			permissions: this.fb.array([

			])
		});
	}

	

	ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			this.userId = params.id;
			console.log(this.userId);
		});
		this.getSubAdmin();
	}


	getSubAdmin() {
		this.commn_.get(urls.getSubAdminList).subscribe(res => {
			console.log(res);
			this.permissionItems = res.data;
			res?.data.forEach(element => {
				this.getForms().push(this.fb.group(this.createForms(element)))
			});;
		})
	}   
	createForms(item:any) {
		return this.fb.group({
		  "module":item?.id,
		  "is_add_edit": false,
		  "is_view": false
		});
  }

	getForms() {
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

	onDocumentSelect(e) {
		var files = e.target.files;
		if (files[0].size <= 10000000) {
			this.userDoc = files[0];
			this.uploadMedia();
		} else {
			this.userDoc = null;
		}
	}

	uploadMedia() {
		let formData = new FormData();
		if (this.userPic) {
			formData.append("media", this.userPic);
		}
		else if (this.userDoc) {
			formData.append("media", this.userDoc);
		}
		this.commn_.post(urls.addMedia, formData).subscribe((res) => {
			if (res.message == "OK") {
				if (this.userPic) {
					this.imageUrl = environment.imgBaseUrl + res.data[0].media_file;
					this.userForm.controls.image.setValue(res.data[0].id);
					this.toaster.success(res.message, "Success", { timeOut: 1050 });
				}
				if (this.userDoc) {
					this.userForm.controls.document.setValue(res.data[0].id);
				}
			}
		});
	}

	addUser() {
		if (this.userForm.valid) {
			if (this.userDoc) {
				let body = {
					first_name: this.userForm.value.first_name,
					last_name: this.userForm.value.last_name,
					phone_number: this.userForm.value.phone_number,
					image: this.userForm.value.image,
					email: this.userForm.value.email,
					password: this.userForm.value.password
				};
				this.commn_.post(urls.addUser, body).subscribe(res => {
					if (res.message == "User Added Successfully.") {
						this.toaster.success(res.message, "Success", { timeOut: 1050 });
						this.router.navigate(['/manage-admins']);
					}
					else {
						this.toaster.error(res.message, "Error", { timeOut: 1050 });
					}
				});
			}
			else {
				this.toaster.error("Select Document", "Error", { timeOut: 2000 });
			}
		} else {
			this.userForm.markAllAsTouched();
		}
	}

}
