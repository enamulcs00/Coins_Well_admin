import { Component, OnInit, ViewChild } from '@angular/core';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Subject } from 'rxjs';
import { ExportToCsv } from 'export-to-csv';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { csvItem } from './csvItem';
@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
	@ViewChild(TabsetComponent) tabset: TabsetComponent;
	searchData = {
		event: new Subject(),
		value: ''
	}
	value = 'ALL';
	timeOut: number;
	constructor(private _common: CommonService) {
	}

	ngOnInit() {

	}

	onSelect(data: TabDirective): void {
		console.log("data", data);
		this.value = data.heading;
	}

	searchHere() {
		clearTimeout(this.timeOut);
		this.timeOut = setTimeout(() => { this.searchData.event.next() }, 1050);
	}
//1=not sent, 2=Pending, 3=Rejected, 4=Accepted
	exportCsv() {
		const options = {
			fieldSeparator: ',',
			quoteStrings: '"',
			decimalSeparator: '.',
			showLabels: true,
			showTitle: true,
			title: 'User List',
			useTextFile: false,
			useBom: true,
			useKeysAsHeaders: true,
			// headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
		};
		let item = [];
		const csvExporter = new ExportToCsv(options);
		this._common.get(urls.userExportCsv).subscribe(res => {
			console.log(res);
			for (const elements in res?.data) { 
				item.push({
					"#":(parseInt(elements)+1),
					Name: res?.data[elements].first_name + " " + res?.data[elements].last_name,
					Email: res?.data[elements].email,
					id: res?.data[elements].id,
					Address: res?.data[elements].building_no + " " + res?.data[elements].street + " " + res?.data[elements].zone,
					PhoneNumber: res?.data[elements].phone_number,
					account_number:res?.data[elements].bank_details[0]?.account_number,
					Bank_Name:res?.data[elements].bank_details[0]?.bank_name?.name,
					Flag:res?.data[elements].flag,
					Verification_Status:(res?.data[elements].document_verification==1)?"not sent":(res?.data[elements].document_verification==2)?"Pending":(res?.data[elements].document_verification==3)?"Rejected":"Accepted"
				});
			};
			 csvExporter.generateCsv(item);
		});
	}

}
