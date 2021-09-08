import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { urls } from 'src/app/_services/urls';
import { CommonService } from 'src/app/_services/common.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-rate-change',
	templateUrl: './rate-change.component.html',
	styleUrls: ['./rate-change.component.scss']
})
export class RateChangeComponent implements OnInit {
	rateForm: FormGroup;
	currency: FormArray;
	name = [];
	id: any = [];
	constructor(private fb: FormBuilder, private comn_: CommonService, private toastr: ToastrService, private spinner: NgxSpinnerService) {
		this.rateForm = this.fb.group({
			currency: this.fb.array([]),
		});
	}

	ngOnInit(): void {
		this.getAllRateChange();
	}

	createItem(): FormGroup {
		return this.fb.group({
			buy_rate: ['', [Validators.required]],
			sell_rate: ['', [Validators.required]]
		});
	}

	add() {
		this.currency = this.rateForm.get('currency') as FormArray;
		this.currency.push(this.createItem());
	}


	getCurrency() {
		return <FormArray>this.rateForm.get('currency');
	}



	getAllRateChange() {
		this.name = [];
		this.id = [];
		this.comn_.get(urls.getAllCurrency).subscribe(res => {
			console.log(res.data);
			res["data"] = res["data"].filter(x=>[1,2,3,4].indexOf(x.id) != -1);
			for (let i = 0; i < res.data.length; i++) {
				this.add();
			}
			for (let i = 0; i < res["data"].length; i++) {
				this.name.push(res["data"][i]['name']);
				this.id.push(res["data"][i]['id']);
				this.getCurrency().controls[i]["controls"].buy_rate.setValue(res["data"][i].buy_rate);
				this.getCurrency().controls[i]["controls"].sell_rate.setValue(res["data"][i].sell_rate);
			}
		})
	}

	updateForm(id) {
		this.spinner.show();
		let body = {
			id: this.id[id],
			buy_rate: this.getCurrency().controls[id]["controls"].buy_rate.value,
			sell_rate: this.getCurrency().controls[id]["controls"].sell_rate.value,
		}
		console.log(body);
		this.comn_.put(urls.updateCurrency + this.id[id] + "/", body).subscribe(res => {
			if (res.code == 200) {
				this.toastr.success(res.message, "Success", { timeOut: 1050 });
				this.rateForm = this.fb.group({
					currency: this.fb.array([]),
				});
				this.getAllRateChange();
				this.spinner.hide();
			}
			else {
				this.toastr.error(res.message, "Error", { timeOut: 1050 });
			}
			console.log(res);
		});
	}

}
