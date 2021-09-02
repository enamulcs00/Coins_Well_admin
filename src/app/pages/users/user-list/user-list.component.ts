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
			for (const elements in res?.data) { 
				item.push({
					"#":(parseInt(elements)+1),
					Name: res?.data[elements].first_name + " " + res?.data[elements].last_name,
					Email: res?.data[elements].email,
					id: res?.data[elements].id,
					Address: res?.data[elements].building_no + " " + res?.data[elements].street + " " + res?.data[elements].zone,
					PhoneNumber: res?.data[elements].phone_number,
					account_number:res?.data[elements].account_number,
					Bank_Name:res?.data[elements].bank_name?.name,
					Flag:res?.data[elements].flag
				});
			};
			csvExporter.generateCsv(item);
		});
	}

}
