import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  items: any;

  constructor(private commn_:CommonService) { }

  ngOnInit(): void {
    this.getAllCurrency();
  }
 
  getAllCurrency()
  {
    this.commn_.get(urls.getAllCurrency).subscribe(res=>
      {
      console.log(res);
      this.items=res.data;
      });
  }

}
