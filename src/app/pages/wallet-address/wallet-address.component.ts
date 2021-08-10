import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';
import { NotificationsService } from 'src/app/_services/notifications.service';

@Component({
  selector: 'app-wallet-address',
  templateUrl: './wallet-address.component.html',
  styleUrls: ['./wallet-address.component.scss']
})
export class WalletAddressComponent implements OnInit {

  constructor(private service: CommonService, private router: Router, private _noti: NotificationsService,private fb:FormBuilder) { }


  ngOnInit(): void {
  }

}
