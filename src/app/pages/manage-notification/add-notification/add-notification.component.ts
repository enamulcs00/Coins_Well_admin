import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss']
})
export class AddNotificationComponent implements OnInit {
  notiItems: any;
  notificationForm:FormGroup;
  constructor(private commn_:CommonService,private fb:FormBuilder) { 
    this.notificationForm=this.fb.group({
      notification_type:['',[Validators.required]],
      notification_mode:['',[Validators.required]],
      title:['',[Validators.required]],
      message:['',[Validators.required]],
      users:['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getNotificationUserList();
  }
  
  getNotificationUserList()
  {
   this.commn_.get(urls.getNotification).subscribe(res=>{
     console.log(res);
     this.notiItems=res.data;
   });
  }
  
  createNotification()
  {
   let body={
    notification_type:this.notificationForm.get('notification_type').value,
    notification_mode:this.notificationForm.get('notification_mode').value,
    title:this.notificationForm.get('title').value,
    message:this.notificationForm.get('message').value,
    users:this.notificationForm.get('users').value.map(x=>{
      return {user:x}
    })
   }
   console.log(body);
   return
   this.commn_.post(urls.createNotification,body).subscribe(res=>{
   console.log(res);
   });

  }

}
