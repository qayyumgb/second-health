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
import * as Highcharts from "highcharts/highmaps";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";
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
import { HighchartsChartModule } from 'highcharts-angular';

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
  imports: [MatIconModule,RouterLink, MatMenuModule, MatDividerModule, MatButtonModule, MatButtonToggleModule, NgApexchartsModule, MatTableModule,HighchartsChartModule],
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
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";
  loadWorldMapChart(){
   

 
  }
  chartData = [{ code3: "ABW", z: 105 }, { code3: "AFG", z: 35530 }];
  worldChartOptions: Highcharts.Options = {
    chart: {
      map: worldMap
    },
    title: {
      text: ""
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: "spacingBox"
      }
    },
    legend: {
      enabled: true
    },
    colorAxis: {
      min: 0
    },
    tooltip: {
      formatter: function() {
          return `Poliomyelitis: <b>${this.point.value}</b> <br>
          Yellow fever certificate: <b>${this.point.value}</b> <br>
          Prophylaxis: <b>${this.point.value}</b> <br>
          Meningitis certificates not exist: <b>${this.point.value}</b> <br>
          Meningitis certificates Expired: <b>${this.point.value}</b> <br>
          <b>${this.point.name}</b>`;
      }
  },
    series: [
      {
        name: "Random data <br> random data 2",
        states: {
          
          hover: {
            color: "#BADA55"
          }
        },
        dataLabels: {
          enabled: true,
          format: ""
        },
        allAreas: false,
        data: [
          ['fo', 0],
          ['um', 1],
          ['us', 2],
          ['jp', 3],
          ['sc', 4],
          ['in', 5],
          ['fr', 6],
          ['fm', 7],
          ['cn', 8],
          ['pt', 9],
          ['sw', 10],
          ['sh', 11],
          ['br', 12],
          ['ki', 13],
          ['ph', 14],
          ['mx', 15],
          ['es', 16],
          ['bu', 17],
          ['mv', 18],
          ['sp', 19],
          ['gb', 20],
          ['gr', 21],
          ['as', 22],
          ['dk', 23],
          ['gl', 24],
          ['gu', 25],
          ['mp', 26],
          ['pr', 27],
          ['vi', 28],
          ['ca', 29],
          ['st', 30],
          ['cv', 31],
          ['dm', 32],
          ['nl', 33],
          ['jm', 34],
          ['ws', 35],
          ['om', 36],
          ['vc', 37],
          ['tr', 38],
          ['bd', 39],
          ['lc', 40],
          ['nr', 41],
          ['no', 42],
          ['kn', 43],
          ['bh', 44],
          ['to', 45],
          ['fi', 46],
          ['id', 47],
          ['mu', 48],
          ['se', 49],
          ['tt', 50],
          ['my', 51],
          ['pa', 52],
          ['pw', 53],
          ['tv', 54],
          ['mh', 55],
          ['cl', 56],
          ['th', 57],
          ['gd', 58],
          ['ee', 59],
          ['ag', 60],
          ['tw', 61],
          ['bb', 62],
          ['it', 63],
          ['mt', 64],
          ['vu', 65],
          ['sg', 66],
          ['cy', 67],
          ['lk', 68],
          ['km', 69],
          ['fj', 70],
          ['ru', 71],
          ['va', 72],
          ['sm', 73],
          ['kz', 74],
          ['az', 75],
          ['tj', 76],
          ['ls', 77],
          ['uz', 78],
          ['ma', 79],
          ['co', 80],
          ['tl', 81],
          ['tz', 82],
          ['ar', 83],
          ['sa', 84],
          ['pk', 85],
          ['ye', 86],
          ['ae', 87],
          ['ke', 88],
          ['pe', 89],
          ['do', 90],
          ['ht', 91],
          ['pg', 92],
          ['ao', 93],
          ['kh', 94],
          ['vn', 95],
          ['mz', 96],
          ['cr', 97],
          ['bj', 98],
          ['ng', 99],
          ['ir', 100],
          ['sv', 101],
          ['sl', 102],
          ['gw', 103],
          ['hr', 104],
          ['bz', 105],
          ['za', 106],
          ['cf', 107],
          ['sd', 108],
          ['cd', 109],
          ['kw', 110],
          ['de', 111],
          ['be', 112],
          ['ie', 113],
          ['kp', 114],
          ['kr', 115],
          ['gy', 116],
          ['hn', 117],
          ['mm', 118],
          ['ga', 119],
          ['gq', 120],
          ['ni', 121],
          ['lv', 122],
          ['ug', 123],
          ['mw', 124],
          ['am', 125],
          ['sx', 126],
          ['tm', 127],
          ['zm', 128],
          ['nc', 129],
          ['mr', 130],
          ['dz', 131],
          ['lt', 132],
          ['et', 133],
          ['er', 134],
          ['gh', 135],
          ['si', 136],
          ['gt', 137],
          ['ba', 138],
          ['jo', 139],
          ['sy', 140],
          ['mc', 141],
          ['al', 142],
          ['uy', 143],
          ['cnm', 144],
          ['mn', 145],
          ['rw', 146],
          ['so', 147],
          ['bo', 148],
          ['cm', 149],
          ['cg', 150],
          ['eh', 151],
          ['rs', 152],
          ['me', 153],
          ['tg', 154],
          ['la', 155],
          ['af', 156],
          ['ua', 157],
          ['sk', 158],
          ['jk', 159],
          ['bg', 160],
          ['qa', 161],
          ['li', 162],
          ['at', 163],
          ['sz', 164],
          ['hu', 165],
          ['ro', 166],
          ['ne', 167],
          ['lu', 168],
          ['ad', 169],
          ['ci', 170],
          ['lr', 171],
          ['bn', 172],
          ['iq', 173],
          ['ge', 174],
          ['gm', 175],
          ['ch', 176],
          ['td', 177],
          ['kv', 178],
          ['lb', 179],
          ['dj', 180],
          ['bi', 181],
          ['sr', 182],
          ['il', 183],
          ['ml', 184],
          ['sn', 185],
          ['gn', 186],
          ['zw', 187],
          ['pl', 188],
          ['mk', 189],
          ['py', 190],
          ['by', 191],
          ['cz', 192],
          ['bf', 193],
          ['na', 194],
          ['ly', 195],
          ['tn', 196],
          ['bt', 197],
          ['md', 198],
          ['ss', 199],
          ['bw', 200],
          ['bs', 201],
          ['nz', 202],
          ['cu', 203],
          ['ec', 204],
          ['au', 205],
          ['ve', 206],
          ['sb', 207],
          ['mg', 208],
          ['is', 209],
          ['eg', 210],
          ['kg', 211],
          ['np', 212],
        ],
      } as Highcharts.SeriesMapOptions,
      {
        // Specify points using lat/lon
        type: "mappoint",
        name: "Canada cities",
        marker: {
          radius: 5,
          fillColor: "tomato"
        },
        data: [
          {
            name: "Vancouver",
            lat: 49.246292,
            lon: -123.116226
          },
          {
            name: "Quebec City",
            lat: 46.829853,
            lon: -71.254028
          },
          {
            name: "Yellowknife",
            lat: 62.454,
            lon: -114.3718
          }
        ]
      }
    ]
  };
}
