import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import * as CanvasJS from 'canvasjs/dist/canvasjs.js';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  
  revenueItems: any=[];
  orderItems: any=[];
  newOrderItems: any=[];
  rStartDate:any;
  oStartDate:any;
  neStartDate:any;
  rEndDate:any;
  oEndDate:any;
  neEndDate:any;
  todayDate=new Date();
  constructor(private comn_:CommonService,private toaster:ToastrService) { }
  
  ngOnInit(): void {
    this.getAnayticsGraph();
  }

  getAnayticsGraph()
  {
    this.getNewOrderGraph(2);
    this.getRevenueGraph(2);
    this.getOrderGraph(2);
  }
  
  getChangeDateRevenue()
  {
    let body={
      "start_date":this.rStartDate,
      "end_date":this.rEndDate,
  }
  console.log(body);
  if(this.rStartDate)
  {
    this.comn_.post(urls.getRevenueGraph,body).subscribe(res=>{
      this.revenueItems=res.data.map((row)=>{
        return { label : row.date ,y : row.count }
      });
      this.getRevenueChart();
    });
  }
  else{
  this.toaster.error("Invalid Date Range","Error",{timeOut:2000});
  }
  }

  getChangeDateOrder()
  {
    let body={
      "start_date":this.oStartDate,
      "end_date":this.oEndDate,
  }
  console.log(body);
  if(this.oStartDate)
  {
    this.comn_.post(urls.getOrderGraph,body).subscribe(res=>{
      console.log(res);
      this.orderItems=res.data.map((row)=>{
        return { label : row.date ,y : row.count }
      });
      this.getOrderChart();
    });
  }
  else
   {
   this.toaster.error("Invalid Date Range","Error",{timeOut:2000});
   }
  }


  getChangeDateNewOrder()
  {
    let body={
      "start_date":this.neStartDate,
      "end_date":this.neEndDate,
  }
  console.log(body);
  if(this.neStartDate)
  {
    this.comn_.post(urls.getNewOrderGraph,body).subscribe(res=>{
      console.log(res);
      this.newOrderItems=res.data.map((row)=>{
        return { label : row.date ,y : row.count }
      });
      this.getNewOrderChart();
    });
  }
  else
  {
    this.toaster.error("Invalid Date Range","Error",{timeOut:2000});
  }
  }

  getNewOrderGraph(key)
  {
    let body={"filter_type":key}
    this.comn_.post(urls.getNewOrderGraph,body).subscribe(res=>{
      console.log(res);
      this.newOrderItems=res.data.map((row)=>{
        return { label : row.date ,y : row.count }
      });
      this.getNewOrderChart();
    });
  }

  getOrderGraph(key)
  {
    let body={"filter_type":key}
    this.comn_.post(urls.getOrderGraph,body).subscribe(res=>{
      console.log(res);
      this.orderItems=res.data.map((row)=>{
        return { label : row.date ,y : row.count }
      });
      this.getOrderChart();
    });
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
        text: "Order Chart"
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
        text: "New Order Chart"
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
