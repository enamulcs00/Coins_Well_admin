import { ConfirmDialogComponent } from '../auth/components/confirm-dialog/confirm-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { urls } from './urls';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DocumentsComponent } from '../auth/components/confirm-dialog/documents/documents.component';
import { FvComponent } from '../auth/components/confirm-dialog/fv/fv.component';
import { ReasonComponent } from '../auth/components/confirm-dialog/reason/reason.component';
import { UserComponent } from '../auth/components/confirm-dialog/user/user.component';
import { EmailModalComponent } from '../auth/components/confirm-dialog/email-modal/email-modal.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CommonService {
	constructor(private _http: HttpClient,private modalService: BsModalService) { }
    bsModalRef: BsModalRef;
	imageFlag=new BehaviorSubject('');
	permissions = {
		dashboard : 1,
		users : 2,
		walkthrough : 3,
		banks: 4,
		manage_update : 5,
		notification : 6,
		customer_support : 7,
		wallet_address : 8,
		request : 9,
		analytics : 10,
		rate_change : 11,
		refer_and_earn : 12,
		manage_sub_admin : 13
	}
	latestUserInfo;
	onReadNotification : BehaviorSubject<any> =  new BehaviorSubject('');
	
	post(url: string, postData: any = {}) {
		return this._http.post<any>(`${environment.baseUrl}${url}`, postData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	postWithHeaders(url: string, postData: any = {}, headers = {}) {
		return this._http.post<any>(`${environment.baseUrl}${url}`, postData, {
			headers :  headers
		})
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
	NumOnly(event) {
		let Numpattern = /^([0-9])*$/;
		let resultNum =    Numpattern.test(event.key);
		return  resultNum;
	   }
	   AlphabetOnly(event){
		let pattAlpha = /^([a-zA-Z ])*$/;
		let resultAlpha = pattAlpha.test(event.key);
		return resultAlpha;
	}

	checkPermission(name : string, type) {
		let userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
		let permissions = userInfo.permissions;
		if(permissions.length > 0) {
			let check = permissions.find(x=> x.module.id == this.permissions[name]);
			if(check != undefined && check[(type == 'view')?'is_view':'is_add_edit']){
				return true;
			} else {
				return false;
			}
		}
		return true;
 	}

	checkPermissionRealData(name : string, type) {
		let userInfo = this.latestUserInfo;
		let permissions = userInfo.permissions;
		let check = permissions.find(x=> x.module == this.permissions[name]);
		if(permissions.length > 0) {
			if(check != undefined && check[(type == 'view')?'is_view':'is_add_edit']){
				return true;
			} else {
				return false;
			}
		}
		return true;
 	}

	 updateProfileInfo() {
		if (localStorage.getItem(environment.storageKey) != null) {
			let userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
			this.get(urls.getProfile).subscribe(data => {
				userInfo = {
					...userInfo,
					...data.data
				};
				localStorage.setItem(environment.storageKey, JSON.stringify(userInfo));
			})
		}
	}
	
}
