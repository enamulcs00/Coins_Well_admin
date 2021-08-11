import { FormBuilder, FormGroup } from '@angular/forms';
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
      notification_type:[''],
      notification_mode:[''],
      title:['']
    });
  }

  ngOnInit(): void {
    this.getNotification();
  }
  
  getNotification()
  {
   this.commn_.get(urls.getNotification).subscribe(res=>{
     console.log(res);
     this.notiItems=res.data;
   });
  }
  
  selectUser(e)
  {
   console.log(e.value)
  }

}
