import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { ModalComponent } from '@fuse/components/modal/modal.component';

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
  selector: 'app-view-detail',
  standalone: true,
  imports: [NgIf, MatProgressBarModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule,MatTableModule, MatDialogModule],
  templateUrl: './view-detail.component.html',
  styleUrl: './view-detail.component.scss'
})
export class ViewDetailComponent {

  displayedColumns: string[] = ['image', 'transactionId', 'date', 'name', 'amount', 'status', 'action'];
  DashboardDataSource = DashboardSummary;
  isLoading: boolean = false;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
