import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  localId: any;
  items: any;
  imageUrl: string;
  bItems:any;
  constructor(private route: ActivatedRoute,private commn_:CommonService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
    this.localId=params.id;
    });
    this.getUserById();
    this.imageUrl=environment.imgBaseUrl;
  }
  
  getUserById()
  {
    this.commn_.get(urls.getUserById+this.localId+"/").subscribe(res=>{
    console.log(res);
    this.items=res.data;
    });
    this.commn_.get(urls.getBalance+this.localId+"/").subscribe(res=>{
      console.log(res);
      this.bItems=res.data;
      });
  }
}
