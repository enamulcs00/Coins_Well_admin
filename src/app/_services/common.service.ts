import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs'
@Injectable({
	providedIn: 'root'
})
export class CommonService {
	nationalities = [];
	languages = [];
	constructor(private _http: HttpClient) { }

	getProfileInfo(params: any) {
		return this._http.get<any>(`${environment.baseUrl}admin/customers${this.obj_to_query(params)}`)
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
}
