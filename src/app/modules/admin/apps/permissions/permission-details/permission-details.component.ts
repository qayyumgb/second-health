import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  number: number;
  page: string;
  permissions: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { number: 1, page: 'Report', permissions: "C.R.U.D" },

];

@Component({
  selector: 'app-permission-details',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatInputModule,MatFormFieldModule, MatIconModule],
  templateUrl: './permission-details.component.html',
  styleUrl: './permission-details.component.scss'
})
export class PermissionDetailsComponent {

  displayedColumns: string[] = [
    "number",
    "page",
    "permissions",
    "action",
  ];
  addNew:boolean = false
  dataSource  = ELEMENT_DATA;
  currentActiveRow:number = -1;
  currentActiveRowHandling = (a:number) =>  {
    this.currentActiveRow = a
    this.addNew = false;
  }
  @ViewChild(MatTable) table: MatTable<PeriodicElement>;
  addNewData = () => {
    const lastPosition = this.dataSource.length+1

    if (this.currentActiveRow != 0  && !this.addNew) {
      let a: PeriodicElement = { number: lastPosition, page: '', permissions: "" };
      this.dataSource.splice(0, 0, a)
      this.table.renderRows();
      this.currentActiveRow = lastPosition;
      this.addNew = true
    }
  }
}
