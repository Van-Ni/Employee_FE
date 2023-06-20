import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { StatisticService } from 'src/app/services/Statistic/statistic.service';
import { of } from 'rxjs';
var colors = {
  gray: {
    100: '#f6f9fc',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#8898aa',
    700: '#525f7f',
    800: '#32325d',
    900: '#212529'
  },
  theme: {
    'default': '#172b4d',
    'primary': '#5e72e4',
    'secondary': '#f4f5f7',
    'info': '#11cdef',
    'success': '#2dce89',
    'danger': '#f5365c',
    'warning': '#fb6340'
  },
  black: '#12263F',
  white: '#FFFFFF',
  transparent: 'transparent',
};

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
  chartData: any;
  statisticVal: any;
  year = new Date().getFullYear();
  constructor(private statistic: StatisticService) { }
  getEmployeeCountsByMonth() {
    this.statistic.getEmployeeCountsByMonth(this.year)
      .subscribe((data) => {
        this.chartData = {
          options: {
            scales: {
              yAxes: [{
                gridLines: {
                  color: colors.gray[900],
                  zeroLineColor: colors.gray[900],
                  drawOnChartArea: false
                },
                ticks: {
                  callback: function (value) {
                    return value;
                  }
                }
              }]
            }
          },
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Nhân viên:',
              data: data
            }]
          }
        }
        var chartSales = document.getElementById('chart-sales');
        if (this.chartData) {
          this.salesChart = new Chart(chartSales, {
            type: 'line',
            options: this.chartData?.options,
            data: this.chartData?.data
          });
        }
      });
  }
  statisticCount(){
    this.statistic.Count()
    .subscribe((data) => {
      this.statisticVal = data;
    });
  }
  ngOnInit() {
    this.getEmployeeCountsByMonth();
    this.statisticCount();
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');


  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }



}
