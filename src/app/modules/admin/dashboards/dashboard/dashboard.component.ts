import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

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
  {transactionId: '528651571NT', date: 'Oct 08, 2019', name: 'Morgan Page', amount: 1358.75, status: 'violated'},
  {transactionId: '528651571NT', date: 'Oct 08, 2019', name: 'Morgan Page', amount: 1358.75, status: 'pass'},
  {transactionId: '528651571NT', date: 'Oct 08, 2019', name: 'Morgan Page', amount: 1358.75, status: 'partially violated'},
  {transactionId: '528651571NT', date: 'Oct 08, 2019', name: 'Morgan Page', amount: 1358.75, status: 'pending'},
  {transactionId: '528651571NT', date: 'Oct 08, 2019', name: 'Morgan Page', amount: 1358.75, status: 'partially violated'},
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
}
