import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  title: string;
	message: string;
	status : boolean = false;
	public onClose: Subject<boolean>;
	constructor(public bsModalRef: BsModalRef) { 
		this.onClose = new Subject();
	}
	ngOnInit() {
		this.bsModalRef.content
	}

	public onConfirm(): void {
        this.onClose.next(true);
        this.bsModalRef.hide();
    }

    public onCancel(): void {
        this.onClose.next(false);
        this.bsModalRef.hide();
    }
}
