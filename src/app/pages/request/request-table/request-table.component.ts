import { Component, Input, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { Page } from '../../modal/page';
import { Block } from 'notiflix';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { ExportToCsv } from 'export-to-csv';
import { NumberFormatStyle } from '@angular/common';
import * as moment from 'moment';
@Component({
	selector: 'app-request-table',
	templateUrl: './request-table.component.html',
	styleUrls: ['./request-table.component.scss']
})
export class RequestTableComponent implements OnInit {
	@Input('status') status: string | null;
	@Input('items') currencies: any = [];
	@Input('flag') flag: boolean | null;
	@Input('searchData') searchData = {
		event: new Subject(),
		value: ''
	}
	page = new Page();
	rows = new Array<any>();
	ColumnMode = ColumnMode;
	start_date: any = "";
	end_date: any = "";
	todayDate = new Date();
	baseUrl = environment.homeURL;
	filterStatus = 'All';
	constructor(private _common: CommonService, private toastr: ToastrService) { }

	ngOnInit(): void {
		this.setPage({ offset: 0 });
	}

	changeDateRange() {
		this.setPage({ offset: 0 });
	}

	checkBankColumns() {
		return (['2/5/'].indexOf(this.status) != -1);
	}

	checkNira() {
		return (['2/5/', '1/5/', '3/1/', '3/2/', '3/3/', '3/4/', '4/1/', '4/2/', '4/3/', '4/4/'].indexOf(this.status) != -1);
	}

	checkProof() {
		return (['1/5/', '4/3/', '4/4/'].indexOf(this.status) != -1);
	}

	checkUSD() {
		return (['2/1/', '2/2/', '2/3/', '2/4/', '2/6/', '2/7/', '2/8/', '2/9/', '3/1/', '3/2/', '3/3/', '3/4/', '4/1/', '4/2/', '4/3/', '4/4/'].indexOf(this.status) != -1);
	}

	checkBit() {
		return (['2/1/', '2/2/', '2/6/', '2/7/', '2/8/', '2/9/', '3/1/', '4/1/'].indexOf(this.status) != -1);
	}

	checkWallet() {
		return (['2/1/', '2/2/', '2/3/', '2/4/', '2/6/', '2/7/', '2/8/', '2/9/', '3/3/', '3/4/'].indexOf(this.status) != -1);
	}

	checkReceivingWallet() {
		return (['2/1/', '2/2/', '2/3/', '2/4/', '2/6/', '2/7/', '2/8/', '2/9/'].indexOf(this.status) != -1);
	}

	checkBalanceColumn() {
		return (['2/1/', '2/2/', '2/3/', '2/4/', '2/5/', '2/6/', '2/7/', '2/8/', '2/9/'].indexOf(this.status) != -1);
	}

	getBitGoName() {
		let currency = this.status.split('/');
		if (this.currencies.length > 0) {
			let item = this.currencies.find(x => x.id == currency[1]);
			return item['name'];
		}
		return 'N/A';
	}

	formData: any = {
		"draw": 2,
		"start_date": this.start_date,
		"end_date": this.end_date,
		"columns": [
			{
				"data": "id",
				"name": "",
				"searchable": true,
				"orderable": true,
				"search": {
					"value": "",
					"regex": false
				}
			}
		],
		"order": [
			{
				"column": 0,
				"dir": "undefined"
			}
		],
		"start": 0,
		"length": 10,
		"search": {
			"value": "",
			"regex": false
		},
		"status": 'All'
	}

	setPage(pageInfo) {
		Block.circle('#users-list-page');
		this.formData.search.value = this.searchData.value;
		this.formData.start = pageInfo.offset * this.formData.length;
		this.formData.start_date = this.start_date;
		this.formData.end_date = this.end_date;
		this.formData.status = this.filterStatus;
		this._common.post(urls.getAllPayment + this.status, this.formData).subscribe(_pagedData => {
			console.log(_pagedData);
			this.page = {
				totalElements: _pagedData.recordsTotal,
				pageNumber: pageInfo.offset,
				totalPages: Math.ceil(_pagedData.recordsTotal / this.formData.length),
				size: this.formData.length
			}
			this.rows = _pagedData.data;
			setTimeout((x => {
				Block.remove('#users-list-page');
			}), 700);
		});
	}

	userModal(ig) {
		this._common.userConfirm("PAYMENT PROOF", environment.imgBaseUrl + ig).subscribe(x => {

		})
	}

	accept(id) {
		let body = { "status": 2 }
		this._common.put(urls.requestAccept + id + '/', body).subscribe(res => {
			console.log(res);
			if (res.code == 200) {
				this.toastr.success(res.message, "Success", { timeOut: 2000 });
				this.setPage({ offset: 0 });
			}
			else {
				this.toastr.error(res.message, "Error", { timeOut: 2000 });
			}
		})
	}

	reject(id) {
		this._common.reasonConfirm("Reject Reason", "").subscribe(x => {
			let body = { "status": 3, "reject_reason": x }
			if (x) {
				this._common.put(urls.requestReject + id + '/', body).subscribe(res => {
					console.log(res);
					if (res.code == 200) {
						this.toastr.success(res.message, "Success", { timeOut: 2000 });
						this.setPage({ offset: this.page.pageNumber });
					}
					else {
						this.toastr.error(res.message, "Error", { timeOut: 2000 });
					}
				});
			}
		});
	}

	clearFilters() {
		this.start_date = '';
		this.end_date = '';
		this.filterStatus = 'All';
		this.changeDateRange()
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
		};
		const csvExporter = new ExportToCsv(options);
		this._common.post(urls.getAllPayment + this.status, this.formData).subscribe(res => {
			let exportableData: any = [];
			res.data.forEach((item, index) => {
				exportableData.push(this.getColumns(item, index + 1));
			})
			csvExporter.generateCsv(exportableData);
		});
	}

	getColumns(row : any, index : number) {
		let exportRow : any =  {
			'#' : index,
			'ORDER ID' : row?.order_id,
			'NAME' : row?.name,
			'ASSET' : row?.asset
		};
		if(this.status == '2/5/') {
			exportRow = {
				...exportRow,
				'BANK' : row?.bank?.bank_name?.name,
				'ACCOUNT NUMBER' : row?.bank?.account_number,
				'BALANCE' : '0.00',
				'AMOUNT(NGN)' : ((row?.ngnamount)?row?.ngnamount:0),
				'DATE & TIME' : moment(row?.created_at).format('LLL'),
				'STATUS' : 'Pending'
			}
		} else if(this.checkReceivingWallet()) {
			exportRow = {
				...exportRow,
				'BALANCE' : '0.00',
				'AMOUNT ($)':  ((row?.amount)?row?.amount:0)
			};
			exportRow['Amount '+this.getBitGoName()] = ((row?.bitamount)?row?.bitamount:0);
			exportRow = {
				...exportRow,
				'Sending Wallet' : row?.to_wallet,
				'Receiving Wallet' : row?.from_wallet,
				'Fee' : 0,
				'Confirmation' : '5 Confirmations',
				'Transaction ID' : 'BTC56456456456GJH',
				'DATE & TIME' : moment(row?.created_at).format('LLL'),
				'STATUS' : 'Pending'
			}
		}
		if(this.status == '1/5') {
			exportRow = {
				...exportRow,
				'AMOUNT(NGN)' : ((row?.ngnamount)?row?.ngnamount:0),
				'DATE & TIME' : moment(row?.created_at).format('LLL'),
				'STATUS' : 'Pending'
			}
		}

		if(this.status == '4/3' || this.status == '4/4') {
			exportRow = {
				...exportRow,
				'AMOUNT ($)':  ((row?.amount)?row?.amount:0),
				'AMOUNT(NGN)' : ((row?.ngnamount)?row?.ngnamount:0),
				'DATE & TIME' : moment(row?.created_at).format('LLL'),
				'STATUS' : 'Pending'
			}
		}
		if(this.status == '3/3' || this.status == '3/4') {
			exportRow = {
				...exportRow,
				'AMOUNT ($)':  ((row?.amount)?row?.amount:0),
				'AMOUNT(NGN)' : ((row?.ngnamount)?row?.ngnamount:0),
				'Wallet' : row?.to_wallet,
				'DATE & TIME' : moment(row?.created_at).format('LLL'),
				'STATUS' : 'Pending'
			}
		}
		return exportRow;
	}
}
