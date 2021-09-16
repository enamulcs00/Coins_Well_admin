import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import * as CanvasJS from 'canvasjs/dist/canvasjs.js';
import { ToastrService } from 'ngx-toastr';
import { Block } from 'notiflix';
@Component({
	selector: 'app-analytics',
	templateUrl: './analytics.component.html',
	styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements AfterViewInit {

	buyOrdersGraph = {
		filterType: 1,
		data: []
	}

	sellOrdersGraph = {
		filterType: 1,
		data: []
	}

	depositOrdersGraph = {
		filterType: 1,
		data: []
	}

	withdrawOrdersGraph = {
		filterType: 1,
		data: []
	}

	feesOrders = {
		filterType: 1,
		data: []
	}


	constructor(private comn_: CommonService, private toaster: ToastrService) { }

	ngAfterViewInit(): void {
		this.getAnayticsGraph();
		this.getAnayticsGraph('sell');
		this.getAnayticsGraph('deposit');
		this.getAnayticsGraph('withdraw');
		this.getAnayticsGraph('fee');
	}

	getAnayticsGraph(type = 'buy') {
		
		if (type == 'buy') {
			Block.circle('#buyOrders');
			this.comn_.post(urls.buyOrders, {
				filter_type: this.buyOrdersGraph.filterType
			}).subscribe(data => {
				this.buyOrdersGraph.data = data;
				let chart = new CanvasJS.Chart("chartRevenue", {
					theme: "light1", // "light2", "dark1", "dark2"
					title: {
						text: "Buy Orders"
					},
					data: [
						{
							type: "line", 
							dataPoints: data.data.map((row) => {
								return { label: row.date, y: row.count }
							})
						}
					]
				});
				chart.render();
				Block.remove('#buyOrders');
			}, () => {
				Block.remove('#buyOrders');
			})
		}

		if (type == 'sell') {
			Block.circle('#sellOrders');
			this.comn_.post(urls.sellOrders, {
				filter_type: this.sellOrdersGraph.filterType
			}).subscribe(data => {
				this.sellOrdersGraph.data = data;
				let chart = new CanvasJS.Chart("chartOrders", {
					theme: "light1", // "light2", "dark1", "dark2"
					title: {
						text: "Sell Orders"
					},
					data: [
						{
							type: "line", 
							dataPoints: data.data.map((row) => {
								return { label: row.date, y: row.count }
							})
						}
					]
				});
				chart.render();
				Block.remove('#sellOrders');
			},() => {
				Block.remove('#sellOrders');
			})
		}


		if (type == 'deposit') {
			Block.circle('#depositOrders');
			this.comn_.post(urls.depositOrders, {
				filter_type: this.depositOrdersGraph.filterType
			}).subscribe(data => {
				this.depositOrdersGraph.data = data;
				let chart = new CanvasJS.Chart("DepositOrders", {
					theme: "light1", // "light2", "dark1", "dark2"
					title: {
						text: "Deposit Orders"
					},
					data: [
						{
							type: "line", 
							dataPoints: data.data.map((row) => {
								return { label: row.date, y: row.count }
							})
						}
					]
				});
				chart.render();
				Block.remove('#depositOrders');
			},() => {
				Block.remove('#depositOrders');
			})
		}

		if (type == 'withdraw') {
			Block.circle('#withdrawLoader');
			this.comn_.post(urls.withdrawOrders, {
				filter_type: this.withdrawOrdersGraph.filterType
			}).subscribe(data => {
				this.withdrawOrdersGraph.data = data;
				let chart = new CanvasJS.Chart("WithdrawOrders", {
					theme: "light1", // "light2", "dark1", "dark2"
					title: {
						text: "Withdraw Orders"
					},
					data: [
						{
							type: "line", 
							dataPoints: data.data.map((row) => {
								return { label: row.date, y: row.count }
							})
						}
					]
				});
				chart.render();
				Block.remove('#withdrawLoader');
			},() => {
				Block.remove('#withdrawLoader');
			})
		}

		if (type == 'fee') {
			Block.circle('#feeLoader');
			this.comn_.post(urls.getFees, {
				filter_type: this.feesOrders.filterType
			}).subscribe(data => {
				this.feesOrders.data = data;
				let chart = new CanvasJS.Chart("feeOrdersChart", {
					theme: "light1", // "light2", "dark1", "dark2"
					title: {
						text: "Total fees"
					},
					data: [
						{
							type: "line", 
							dataPoints: data.data.map((row) => {
								return { label: row.date, y: row.count }
							})
						}
					]
				});
				chart.render();
				Block.remove('#feeLoader');
			},() => {
				Block.remove('#feeLoader');
			})
		}
	}
}
