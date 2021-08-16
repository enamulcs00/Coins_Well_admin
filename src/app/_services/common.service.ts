import { ConfirmDialogComponent } from './../components/confirm-dialog/confirm-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { urls } from './urls';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DocumentsComponent } from '../components/confirm-dialog/documents/documents.component';
import { FvComponent } from '../components/confirm-dialog/fv/fv.component';
import { ReasonComponent } from '../components/confirm-dialog/reason/reason.component';
import { UserComponent } from '../components/confirm-dialog/user/user.component';
import { EmailModalComponent } from '../components/confirm-dialog/email-modal/email-modal.component';

@Injectable({
	providedIn: 'root'
})
export class CommonService {
	constructor(private _http: HttpClient,private modalService: BsModalService) { }
    bsModalRef: BsModalRef;
	post(url: string, postData: any = {}) {
		return this._http.post<any>(`${environment.baseUrl}${url}`, postData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	get(url: string) {
		return this._http.get<any>(`${environment.baseUrl}${url}`)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	put(url: string, putData: any = {}) {
		return this._http.put<any>(`${environment.baseUrl}${url}`, putData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	delete(url: string) {
		return this._http.delete<any>(`${environment.baseUrl}${url}`)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	deleteById(url: string, id: string) {
		return this._http.delete<any>(`${environment.baseUrl}${urls[url]}/${id}`)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	getWithQuery(url: string, queryData: any = {}) {
		return this._http.get<any>(`${environment.baseUrl}${urls[url]}${this.obj_to_query(queryData)}`)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	obj_to_query(obj) {
		var parts = [];
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
			}
		}
		return "?" + parts.join('&');
	}


	getById(url: string, id: string) {
		return this._http.get<any>(`${environment.baseUrl}${urls[url]}/${id}`)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	putById(url: string, id: string, formData: any = {}) {
		return this._http.put<any>(`${environment.baseUrl}${urls[url]}/${id}`, formData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	uploadMedia(formData) {
		return this._http.post<any>(`${environment.baseUrl}upload/media/`, formData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	getColumns(definedColumns) {
		return definedColumns.map(x=>{
			return {
				"data": x.data,
				"name": x.name || '',
				"searchable": (x.searchable != undefined) ? x.searchable : true,
				"orderable": (x.orderable != undefined) ? x.orderable : true,
				"search": {
					"value": "",
					"regex": false
				}
			}
		})
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
    
    dconfirm(title, text): Observable<boolean> {
		return new Observable((resolve) => {
			this.bsModalRef = this.modalService.show(DocumentsComponent, {
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

    fvConfirm(title, text): Observable<boolean> {
		return new Observable((resolve) => {
			this.bsModalRef = this.modalService.show(FvComponent, {
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

	reasonConfirm(title, text): Observable<boolean> {
		return new Observable((resolve) => {
			this.bsModalRef = this.modalService.show(ReasonComponent, {
				initialState: {
					title: title,
					message: text
				}
			});
			this.bsModalRef.onHidden.subscribe(x => {
				resolve.next(this.bsModalRef.content.descripition);
			});
		});
	}
    
    userConfirm(title, text): Observable<boolean> {
		return new Observable((resolve) => {
			this.bsModalRef = this.modalService.show(UserComponent, {
				initialState: {
					title: title,
					message: text
				}
			});
			this.bsModalRef.onHidden.subscribe(x => {
				resolve.next(this.bsModalRef.content.descripition);
			});
		});
	}
   
    emailConfirm(title, text): Observable<boolean> {
		return new Observable((resolve) => {
			this.bsModalRef = this.modalService.show(EmailModalComponent, {
				initialState: {
					title: title,
					message: text
				}
			});
			this.bsModalRef.onHidden.subscribe(x => {
				resolve.next(this.bsModalRef.content.descripition);
			});
		});
	}

}
