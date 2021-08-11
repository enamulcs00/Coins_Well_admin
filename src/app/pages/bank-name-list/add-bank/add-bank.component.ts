import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';
import { NotificationsService } from 'src/app/_services/notifications.service';
import { urls } from 'src/app/_services/urls';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.scss']
})
export class AddBankComponent implements OnInit {
	imgurl: string | ArrayBuffer;
	fileData;
  submitted:boolean = false
	isLoading: boolean = false;

  AddBankForm:FormGroup
  files: any;
  constructor(private fb:FormBuilder,private service: CommonService, private router: Router, private _noti: NotificationsService) { }
 ngOnInit(): void {
this.AddBankForm = this.fb.group({
  name:['',Validators.required],
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
		this.service.post(urls.createBank, obj).subscribe((res:any) => {
			if(res.code==200){
				this._noti.show("success", "Bank added successfully.", "Success!");
        this.router.navigate(['/banknamelist'])
        this.isLoading = false;
		this.submitted = false
      }
		}, _ => {
			this.isLoading = false
		})
	}
}
