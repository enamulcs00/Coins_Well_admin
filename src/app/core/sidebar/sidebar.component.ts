import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sum : number = 0;
  constructor(private commn_ : CommonService) { }

  ngOnInit(): void {
    this.commn_.onReadNotification.subscribe(data=>{
      this.commn_.get(urls.getunReadRequest).subscribe(data=>{
        let sum  =0;
        Object.values(data.data).forEach(value => {
          sum += <any>value;
        })
        this.sum=sum;
      });
    })
  }

}
