import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { ModalComponent } from '@fuse/components/modal/modal.component';

export interface Iinventory {
  lodge?: string;
  period: string;
  date: string;
  kind: string;
  fNo: string;
  from: string;
  fName: string;
  pNumber: string;
  nat: string;
}

const DashboardSummary: Iinventory[] = [
  {lodge: 'al-makki', period: 'period one', date: 'Oct 08, 2019', kind: 'technolgy', fName: 'mitchel stark', from: 'Kwait',fNo:'12TH1233',pNumber:'IOU909090',nat:'THE768'},
  {lodge: 'loong lodge', period: 'period two', date: 'Oct 08, 2019', kind: 'technolgy', fName: 'mitchel stark', from: 'Kwait',fNo:'12TH1233',pNumber:'IOU909090',nat:'THE768'},
  {lodge: 'sindhi raks', period: 'period three', date: 'Oct 08, 2019', kind: 'technolgy', fName: 'mitchel stark', from: 'Dubai',fNo:'12TH1233',pNumber:'IOU909090',nat:'THE768'},
  {lodge: 'al-shams', period: 'period four', date: 'Oct 08, 2019', kind: 'technolgy', fName: 'mitchel stark', from: 'Dublin',fNo:'12TH1233',pNumber:'IOU909090',nat:'THE768'},
  {lodge: 'the door', period: 'period five', date: 'Oct 08, 2019', kind: 'technolgy', fName: 'muhammad bin ahmed', from: 'Kwait',fNo:'12TH1233',pNumber:'IOU909090',nat:'THE768'},
  {lodge: 'al-makki', period: 'period six', date: 'Oct 08, 2019', kind: 'technolgy', fName: 'abdul rehman', from: 'Pakistan',fNo:'12TH1233',pNumber:'IOU909090',nat:'THE768'},
  {lodge: 'system limited', period: 'period seven', date: 'Oct 08, 2019', kind: 'technolgy', fName: 'mitchel stark', from: 'Kwait',fNo:'12TH1233',pNumber:'IOU909090',nat:'THE768'},
  {lodge: 'bait-ul-arab', period: 'period eight', date: 'Oct 08, 2019', kind: 'technolgy', fName: 'ben stoke', from: 'Saudi Arabia',fNo:'12TH1233',pNumber:'IOU909090',nat:'THE768'},
 
];

@Component({
  selector: 'app-view-detail',
  standalone: true,
  imports: [NgIf, MatProgressBarModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule,MatTableModule, MatDialogModule,MatPaginatorModule],
  templateUrl    : './inventory.component.html',
})
export class InventoryListComponent {

  displayedColumns: string[] = ['lodge', 'period', 'date', 'kind', 'fNo', 'from','fName','pNumber','nat', 'action'];
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
