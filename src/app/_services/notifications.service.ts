import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../auth/components/confirm-dialog/confirm-dialog.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Injectable({
	providedIn: 'root'
})
export class NotificationsService {

	constructor(private _toast: ToastrService, private modalService: BsModalService) { }
	bsModalRef: BsModalRef;
	show(type: any, message: string, title) {
		message = message.charAt(0).toUpperCase() + message.slice(1).toLowerCase();
		// this._toast.clear();
		if (type == 'success') {
			this._toast.success(message);
		} else if (type == 'error' || type == 'danger') {
			this._toast.error(message, title, {
				timeOut : 5000
			});
		} else if (type == 'warning') {
			this._toast.warning(message, title);
		}
	}

	confirm(title, text): Observable<boolean> {
		return new Observable((resolve) => {
			this.bsModalRef = this.modalService.show(ConfirmDialogComponent, {
				initialState: {
					title: title,
					message: text
				}
			});
			this.bsModalRef.onHidden.subscribe(x => {
				resolve.next(this.bsModalRef.content.status);
			});
		});
	}
}
