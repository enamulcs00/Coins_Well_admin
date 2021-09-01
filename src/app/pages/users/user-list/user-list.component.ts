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
		this.timeOut=setTimeout(()=>{this.searchData.event.next()},1050);
	}

	exportCsv()
	{
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
		  let item=[];
		  const csvExporter = new ExportToCsv(options);
		   this._common.get(urls.userExportCsv).subscribe(res=>{
			   res?.data.forEach((elements:csvItem)=>{
			   item.push({
				   Name:elements.first_name+" "+elements.last_name,
				   Email:elements.email,
				   id:elements.id,
				  Address: elements.building_no+" "+elements.street+" "+elements.zone,
				  PhoneNumber:elements.phone_number
				});
			});
			csvExporter.generateCsv(item);
		   });
	}

}
