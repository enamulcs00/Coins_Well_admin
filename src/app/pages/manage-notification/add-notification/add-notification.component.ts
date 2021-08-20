import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss']
})
export class AddNotificationComponent implements OnInit {
  notiItems: any;
  notificationForm: FormGroup;
  allToggleSelected: boolean = false;
  @ViewChild('mySel') skillSel: MatSelect;
  @Output() selectionChange: EventEmitter<any> = new EventEmitter();

  constructor(private commn_: CommonService, private fb: FormBuilder,private spinner: NgxSpinnerService , private toastr:ToastrService,private route:Router) {
    this.notificationForm = this.fb.group({
      notification_type: ['', [Validators.required]],
      notification_mode: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      message: ['', [Validators.required, Validators.minLength(4)]],
      users: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getNotificationUserList();
  }

  getNotificationUserList() {
    this.commn_.get(urls.getNotification).subscribe(res => {
      console.log(res);
      this.notiItems = res.data;
    });
  }

  createNotification() {
    if (this.notificationForm.valid) {
      let items=[];
      this.spinner.show();
      items=this.notificationForm.get('users').value.map((x) => {
        return { user: x }
      });
      items.splice(0,1);
      let body = {
        notification_type: this.notificationForm.get('notification_type').value,
        notification_mode: this.notificationForm.get('notification_mode').value,
        title: this.notificationForm.get('title').value,
        message: this.notificationForm.get('message').value,
        users: items
      }
      console.log(body);
      this.commn_.post(urls.createNotification, body).subscribe(res => {
        if(res.code==200)
        {
          setTimeout(() => {this.spinner.hide();
          },2000);
          this.toastr.success(res.message,"Success",{timeOut:2000});
          this.route.navigate(["/manage-notification"]);
        }
        else
        {
          this.toastr.error(res.message,"Error",{timeOut:2000});
        }
      });
    }
    else {
      this.notificationForm.markAllAsTouched();
    }
  }

  async onSelection(event: any) {
  
  }
  singleSelection()
  {
    if(this.allToggleSelected == true && this.notificationForm.value.users.length > 0)
    {
      this.skillSel.options.forEach((item: MatOption,i) => {
        if(i == 0)
        {
        item.deselect();
        }
      })
    }
  }
  toggleAllSelection() {
    this.allToggleSelected = !this.allToggleSelected;
    if (this.allToggleSelected) {
      this.skillSel.options.forEach((item: MatOption) => item.select());
    } else {
      this.skillSel.options.forEach((item: MatOption) => {
        item.deselect();
      });
    }
    this.skillSel.close();
  }

}
