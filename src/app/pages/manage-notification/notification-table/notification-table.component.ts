import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
@Component({
  selector: 'app-notification-table',
  templateUrl: './notification-table.component.html',
  styleUrls: ['./notification-table.component.scss']
})
export class NotificationTableComponent implements OnInit {
  items: any;
  pageEvent: PageEvent;
  page: any=0;
  pageSize: any=10;
  length: any;
  searchText:any = '';
  delayTimer: number;
  constructor(private commn_:CommonService) { }

  ngOnInit(): void {
    this.getNotificationList();
  }
  
  getNotificationList()
  {
    let body={
    
      "status":null,
      "draw": 2,
      "columns": [
          {
              "data": "id",
              "name": "",
              "searchable": true,
              "orderable": true,
              "search": {
                  "value": "",
                  "regex": false
              }
          },
          {
              "data": "message",
              "name": "",
              "searchable": true,
              "orderable": true,
              "search": {
                  "value": "",
                  "regex": false
              }
          },
          {
              "data": "title",
              "name": "",
              "searchable": true,
              "orderable": true,
              "search": {
                  "value":"",
                  "regex": false
              }
          }
      ],
      "order": [
          {
              "column": 2,
              "dir": "undefined"
          }
      ],
      "start": this.page,
      "length": this.pageSize,
      "search": {
          "value": this.searchText,
          "regex": false
      }
  }
    this.commn_.post(urls.getAllNotifiation,body).subscribe(res=>{
      console.log(res)
      this.items=res.data;
      this.length=res.recordsTotal;
    })
  }
  
  changeText()
  {
    clearTimeout(this.delayTimer);
    this.delayTimer=setTimeout(()=>{
      this.getNotificationList();
    },2000);
  }
  
  pageSizeChanged(e): PageEvent {
    if (e.pageIndex == 0) {
      this.page = e.pageIndex;
    } else {
      if (e.previousPageIndex < e.pageIndex) {
        this.page = e.pageSize + 1;
      } else {
        this.page = e.pageSize;
      }
    }
    this.pageSize = e.pageSize
    this.getNotificationList();
    return e;
}

}
