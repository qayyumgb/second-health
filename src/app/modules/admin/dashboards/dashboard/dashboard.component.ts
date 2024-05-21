import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { ViewDashboardGridComponent } from './view-dashboard-grid/view-dashboard-grid.component';
import { MatDialog } from '@angular/material/dialog';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

export interface DashboardSummaryGridElement {
  image?: string;
  transactionId: string;
  date: string;
  name: string;
  amount: number;
  status: string;
  action?: string;
}

const DashboardSummary: DashboardSummaryGridElement[] = [
  {transactionId: '528651571NT', date: 'Oct 08, 2019', name: 'Morgan Page', amount: 1358.75, status: 'pass'},
  {transactionId: '528651571NT', date: 'Oct 08, 2019', name: 'Gary Peters', amount: 1358.75, status: 'violated'},
  {transactionId: '528651571NT', date: 'Oct 08, 2019', name: 'Leo Gill', amount: 1358.75, status: 'pass'},
  {transactionId: '528651571NT', date: 'Oct 08, 2019', name: 'Sarah', amount: 1358.75, status: 'partially violated'},
  {transactionId: '528651571NT', date: 'Oct 08, 2019', name: 'Nancy Salazar', amount: 1358.75, status: 'pending'},
  {transactionId: '528651571NT', date: 'Oct 08, 2019', name: 'Matthew Wood', amount: 1358.75, status: 'partially violated'},
];


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule,RouterLink, MatMenuModule, MatDividerModule, MatButtonModule, MatButtonToggleModule, NgApexchartsModule, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  chartGithubIssues: ApexOptions = {};
  // recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
  // recentTransactionsTableColumns: string[] = ['transactionId', 'date', 'name', 'amount', 'status'];
  detailLink:'/dashboards/view-detail'
  displayedColumns: string[] = ['image', 'transactionId', 'date', 'name', 'amount', 'status', 'action'];
  DashboardDataSource = DashboardSummary;
  @ViewChild("barChart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor(public dialog: MatDialog){
    this.loadBarChart()
  }

  /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
  trackByFn(index: number, item: any): any
  {
      return item.id || index;
  }

  viewItemDetail(item: any){
    this.dialog.open(ViewDashboardGridComponent, {
      width: '800px',
      data: item,
  });
  }

  loadBarChart(){
    this.chartOptions = {
      series: [
        {
          name: "Inflation",
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#A09EA9"]
        }
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        
        crosshairs: {
         
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
     fill:{
      colors:['#A09EA9','#A09EA9']
     },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function(val) {
            return val + "%";
          }
        }
        
      },
      title: {
        text: "",
        floating: false,
        offsetY: 320,
        align: "center",
        style: {
          color: "#A09EA9"
        }
      }
    };
  }
}
