import { Component, OnInit } from '@angular/core';
import Chart from "chart.js";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
  chartDoughnutData,
  chartDoughnutData1,
  chartDoughnutData2,
  chartDoughnutData3
} from "../../../../app/variables/charts";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  // Colors
 colors = {
  gray: {
    100: "#f6f9fc",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#8898aa",
    700: "#525f7f",
    800: "#32325d",
    900: "#212529"
  },
  theme: {
    default: "#172b4d",
    primary: "#5e72e4",
    secondary: "#f4f5f7",
    info: "#11cdef",
    success: "#2dce89",
    danger: "#f5365c",
    warning: "#fb6340"
  },
  black: "#12263F",
  white: "#FFFFFF",
  transparent: "transparent"
};
 chartDoughnutData2:any;
  constructor() {}

  ngOnInit() {
    this.chartDoughnutData2 = {
      data: {
        labels: ["Deals Closed"],
        datasets: [
          {
            data: [
              10          
            ],
            backgroundColor: [
              this.colors.theme["danger"]         
            ],
            label: "Dataset 1"
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          position: "top"
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    };
    var chartDoughnut1 = <HTMLCanvasElement> document.getElementById("chart-doughnut1");
    var chartDoughnut2 = <HTMLCanvasElement> document.getElementById("chart-doughnut2");
    var chartDoughnut3 = <HTMLCanvasElement> document.getElementById("chart-doughnut3");
    var chartDoughnut4 = <HTMLCanvasElement> document.getElementById("chart-doughnut4");
   
    // Init chart
    var doughnutChart4= new Chart(chartDoughnut4, {
      type: "doughnut",
      data: chartDoughnutData.data,
      options: chartDoughnutData.options,      
    });
    var doughnutChart = new Chart(chartDoughnut1, {
      type: "doughnut",
      data: chartDoughnutData1.data,
      options: chartDoughnutData1.options,      
    });
    var doughnutChart2 = new Chart(chartDoughnut2, {
      type: "doughnut",
      data: chartDoughnutData2.data,
      options: chartDoughnutData2.options
    });
    var doughnutChart3 = new Chart(chartDoughnut3, {
      type: "doughnut",
      data: chartDoughnutData3.data,
      options: chartDoughnutData3.options
    });
   

    var chartOrders = <HTMLCanvasElement> document.getElementById("chart-bars");

    parseOptions(Chart, chartOptions());

    var ordersChart = new Chart(chartOrders, {
      type: "bar",
      options: chartExample2.options,
      data: chartExample2.data
    });    
  }
}

