import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import {urls} from '../../_services/urls';

@Component({
  selector: 'app-wallet-address',
  templateUrl: './wallet-address.component.html',
  styleUrls: ['./wallet-address.component.scss']
})
export class WalletAddressComponent implements OnInit {

  constructor(private commn_:CommonService) { }

  ngOnInit(): void {
    this.getWalletAddress()
  }
  
  getWalletAddress()
  {
    this.commn_.get(urls.getWalletAddress).subscribe(res=>{
      console.log(res);
    })
  }

}
