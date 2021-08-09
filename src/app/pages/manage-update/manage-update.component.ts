import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-update',
  templateUrl: './manage-update.component.html',
  styleUrls: ['./manage-update.component.scss']
})
export class ManageUpdateComponent implements OnInit {
  terms:string
  privacy:string
  aboutUs:string
  address:string
  precedure:string
  constructor() { }

  ngOnInit(): void {
  }

}
