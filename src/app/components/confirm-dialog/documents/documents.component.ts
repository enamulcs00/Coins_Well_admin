import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
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
