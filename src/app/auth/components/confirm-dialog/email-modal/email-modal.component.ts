import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.component.html',
  styleUrls: ['./email-modal.component.scss']
})
export class EmailModalComponent implements OnInit {
  title: string;
	message: string;
  descripition:any;
	status : boolean = false;
  emailForm:FormGroup;
	public onClose: Subject<boolean>;
	constructor(public bsModalRef: BsModalRef,private fb:FormBuilder) { 
    this.emailForm=this.fb.group({
      email_title:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      email_body:['',[Validators.required,Validators.minLength(3)]]
    });
	}
	ngOnInit() {
		this.bsModalRef.content
	}
  submit()
  {
    if(this.emailForm.valid) {
      this.descripition=this.emailForm.value;
      this.bsModalRef.hide();
    } else {
      this.emailForm.markAllAsTouched();
    }
  }
}
