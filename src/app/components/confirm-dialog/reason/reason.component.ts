import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.scss']
})
export class ReasonComponent implements OnInit {
  title: string;
	message: string;
  descripition:any;
	status : boolean = false;
	public onClose: Subject<boolean>;
	constructor(public bsModalRef: BsModalRef) { 
		this.onClose = new Subject();
	}
	ngOnInit() {
		this.bsModalRef.content
	}
  submit()
  {
    this.onClose.next(this.descripition);
    this.bsModalRef.hide();
  }
}
