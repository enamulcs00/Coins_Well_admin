import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/_services/common.service';
import {urls} from '../../_services/urls';
@Component({
  selector: 'app-refer-amount',
  templateUrl: './refer-amount.component.html',
  styleUrls: ['./refer-amount.component.scss']
})
export class ReferAmountComponent implements OnInit {
  amount: any;
  itemAmount: any;
  page=1;
  page1=0;
  pageSize=10;
  pageSize1=10;
  items: any;
  length=0;
  pageEvent: PageEvent;
  urhItems: any;
  length1: any=0;

  constructor(private commn_:CommonService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getReferalAmount();
    this.getReferalHistory();
    this.getUserReferalHistory();
  }
  
   getReferalAmount()
   {
   this.commn_.get(urls.getReferalAmount).subscribe(res=>{
     this.itemAmount=res.data.amount;
   });
   }
   
   NumOnly(event) {
    let Numpattern = /^([0-9])*$/;
    let resultNum =    Numpattern.test(event.key);
    return  resultNum;
   }

   updateReferalAmount()
   {
     let body={
       "amount":this.amount?this.amount:0,
     }
     this.commn_.post(urls.updateReferalAmount,body).subscribe(res=>{
     if(res.code==200)
     {
       this.toastr.success(res.message,"Success",{timeOut:1050});
      this.getReferalAmount();
     }
     else
     {
      this.toastr.error(res.message,"Error",{timeOut:1050});
     }
     });
   }
   
   getReferalHistory()
   {
     let body={
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
          }
      ],
      "order": [
          {
              "column": 0,
              "dir": "undefined"
          }
      ],
      "start": this.page,
      "length": this.pageSize,
      "search": {
          "value": "",
          "regex": false
      }
  }
     this.commn_.post(urls.getReferalHistory,body).subscribe(res=>{
       this.items=res.data;
       this.length=res.recordsTotal;
     });
   }
   
   pageSizeChanged(e): PageEvent {
      if (e.pageIndex == 0) {
        this.page = e.pageIndex;
      } else {
        if (e.previousPageIndex < e.pageIndex) {
          this.page =this.page+ e.pageSize;
        } else {
          this.page =this.page-e.pageSize;
        }
      }
      this.pageSize = e.pageSize
      console.log(this.page , this.pageSize,"asdfasdf");
      
      this.getReferalHistory();
      return e;
  }
  
  pageSizeChanged1(e): PageEvent {
    if (e.pageIndex == 0) {
      this.page1 = e.pageIndex;
    } else {
      if (e.previousPageIndex < e.pageIndex) {
        this.page1 =this.page1+ e.pageSize;
      } else {
        this.page1 =this.page1- e.pageSize;
      }
    }
    this.pageSize1 = e.pageSize
    this.getUserReferalHistory();
    return e;
}

   deleteHistoryUser(id)
   {
     this.commn_.confirm("Delete Amount History","Are you sure you want to delete this amount history ?").subscribe(x=>{
     console.log(x);
     if(x)
     {
      this.commn_.delete(urls.deleteAmountHistory+id+"/").subscribe(res=>{
        if(res.code==200)
        {
          this.toastr.success(res.message,"Success",{timeOut:1050});
          this.getReferalHistory();
        }
        else
        {
          this.toastr.error(res.message,"Error",{timeOut:1050});
        }
      })
     }
     });
   }
   
   getUserReferalHistory()
   {
     let body={
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
              "data": "reffered_by_name",
              "name": "",
              "searchable": true,
              "orderable": true,
              "search": {
                  "value": "",
                  "regex": false
              }
          },
          {
              "data": "used_by_name",
              "name": "",
              "searchable": true,
              "orderable": true,
              "search": {
                  "value": "",
                  "regex": false
              }
          },
          {
              "data": "invite_code",
              "name": "",
              "searchable": true,
              "orderable": true,
              "search": {
                  "value": "",
                  "regex": false
              }
          },
          {
              "data": "amount",
              "name": "",
              "searchable": true,
              "orderable": true,
              "search": {
                  "value": "",
                  "regex": false
              }
          }
      ],
      "order": [
          {
              "column": 4,
              "dir": "undefined"
          }
      ],
      "start": 0,
      "length": 10,
      "search": {
          "value": "",
          "regex": false
      }
  }
     this.commn_.post(urls.getUserReferHistory,body).subscribe(res=>{
     console.log(res);
     this.urhItems=res.data;
     this.length1=res.recordsTotal;
     });
   }

}
