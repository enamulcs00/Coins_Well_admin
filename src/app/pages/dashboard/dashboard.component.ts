import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import * as CanvasJS from 'canvasjs/dist/canvasjs.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: any;
  revenueItems: any=[];
  orderItems: any=[];
  newOrderItems: any=[];
  cards: any;

  constructor(private comn_:CommonService) { }

  ngOnInit(): void {
    this.getDashboard();
  }
  
  getDashboard()
  {
   this.comn_.get(urls.getDashboard).subscribe(res=>{
     this.items=res.data;
   });
   this.comn_.get(urls.getAllCurrency).subscribe(res=>{
     this.cards=res.data;
     console.log(res)
   })
  this.getNewOrderGraph(2);
  this.getRevenueGraph(2);
  this.getOrderGraph(2);
  
  }
  
  getRevenueGraph(key)
  {
    let body={"filter_type":key}
    this.comn_.post(urls.getRevenueGraph,body).subscribe(res=>{
      this.revenueItems=res.data.map((row)=>{
        return { label : row.date ,y : row.count }
      });
      this.getRevenueChart();
    });
  }

  getOrderGraph(key)
  {
    let body={"filter_type":key}
    this.comn_.post(urls.getOrderGraph,body).subscribe(res=>{
      // console.log(res);
      this.orderItems=res.data.map((row)=>{
        return { label : row.date ,y : row.count }
      });
      this.getOrderChart();
    });
  }
  
  getNewOrderGraph(key)
  {
    let body={"filter_type":key}
    this.comn_.post(urls.getNewOrderGraph,body).subscribe(res=>{
      // console.log(res);
      this.newOrderItems=res.data.map((row)=>{
        return { label : row.date ,y : row.count }
      });
      this.getNewOrderChart();
    });
  }

  getRevenueChart()
  {
    let chart = new CanvasJS.Chart("chartRevenue",{
			theme: "light1", // "light2", "dark1", "dark2"
      title: {
        text: "Revenue Chart"
      },
      data: [
        {
          type: "line", // Change type to "bar", "area", "spline", "pie",etc.
          dataPoints:this.revenueItems
        }
      ]
		});
    chart.render();
  }
  
  getOrderChart()
  {
    let chart = new CanvasJS.Chart("chartOrder",{
			theme: "light1", // "light2", "dark1", "dark2"
      title: {
        text: "Withdraw Request Chart"
      },
      data: [
        {
          type: "line", // Change type to "bar", "area", "spline", "pie",etc.
          dataPoints:this.orderItems
        }
      ]
		});
    chart.render();
  }
  
  getNewOrderChart()
  {
    let chart = new CanvasJS.Chart("chartNewOrder",{
			theme: "light1", // "light2", "dark1", "dark2"
      title: {
        text: "New Withdraw Request Chart"
      },
      data: [
        {
          type: "line", // Change type to "bar", "area", "spline", "pie",etc.
          dataPoints:this.newOrderItems
        }
      ]
		});
    chart.render();
  }

  }
