import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';
import { NotificationsService } from 'src/app/_services/notifications.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-bank',
  templateUrl: './edit-bank.component.html',
  styleUrls: ['./edit-bank.component.scss']
})
export class EditBankComponent implements OnInit {
  imgurl: string | ArrayBuffer;
	fileData;
  submitted:boolean = false
	isLoading: boolean = false;

  AddBankForm:FormGroup
  files: any;
  id: any;
  constructor(private fb:FormBuilder,private service: CommonService, private router: Router, private _noti: NotificationsService, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe((params)=>{
      this.id = params.id;
    })
  }
 ngOnInit(): void {
  this.getBankById()
this.AddBankForm = this.fb.group({
  name:['',[Validators.required,]],
  branch:['',Validators.required],
  ifsc_code:['',Validators.required],
})
  }
  sendFile(fileData) {
		let formdata = new FormData()
		formdata.append('media', fileData);
		this.service.uploadMedia(formdata).subscribe((res: any) => {
			if (res.code == 200) {
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
				this.fileData = fileData;
        this.sendFile(fileData)
				reader.onload = (event) => { // called once readAsDataURL is completed
					this.imgurl = event.target.result;
				}
			}
		}
	}
  AddBank(){
	  this.submitted = true
    if(this.AddBankForm.valid){
    this.isLoading = true
    this.AddFn()
    }else{
      this.AddBankForm.markAllAsTouched()
    }
  }
  AddFn() {
		let obj = {
      "name":this.AddBankForm.controls.name.value,
      "bank_image":this.files,
      "ifsc_code":this.AddBankForm.controls.ifsc_code.value,
      "branch":this.AddBankForm.controls.branch.value
		}
		this.service.put(`admin/update-bank-by-pk/${this.id}/`, obj).subscribe((res:any) => {
			if(res.code==200){
				this._noti.show("success", "Bank updated successfully.", "Success!");
        this.router.navigate(['/banknamelist'])
        this.isLoading = false;
		this.submitted = false
      }
		}, _ => {
			this.isLoading = false
		})
	}
  getBankById() {
		this.service.get(`admin/get-bank-by-pk/${this.id}/`).subscribe((res: any) => {
			let userInfo = res.data;
			this.AddBankForm.patchValue(userInfo);
			this.files = userInfo?.image?.id
			this.imgurl = environment.homeURL + userInfo?.bank_image?.media_file
			console.log('Img url',res.data);
			
		})
	}
}
