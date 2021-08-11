import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Notify } from 'notiflix';
import { Subject } from 'rxjs';
import { NotificationsService } from 'src/app/_services/notifications.service';

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
	constructor(public bsModalRef: BsModalRef, private _noti: NotificationsService) { 
		this.onClose = new Subject();
	}
	ngOnInit() {
		this.bsModalRef.content
	}
  submit()
  {
    if(this.descripition != '' && this.descripition != null) {
      this.onClose.next(this.descripition);
      this.bsModalRef.hide();
    } else {
      this._noti.show('error', "Please fill the reason first.", "Reason!");
    }
  }
}
