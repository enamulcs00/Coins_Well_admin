import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { urls } from './urls';
@Injectable({
	providedIn: 'root'
})
export class CommonService {
	constructor(private _http: HttpClient) { }

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
		return this._http.delete<any>(`${environment.baseUrl}${urls[url]}`)
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

}
