import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormArray, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

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
  imports: [MatTableModule, NgFor, NgIf, ReactiveFormsModule, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule],
 templateUrl: './permission-details.component.html',
  styleUrl: './permission-details.component.scss'
})
export class PermissionDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    "number",
    "page",
    "permissions",
    "action",
  ];
  dataSource  = ELEMENT_DATA;
  isEmpty:boolean =false
  currentActiveRow:number = -1;
  hajjForm: FormGroup;
  newAddition:boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
   this.formExw();
  }
formExw(){
  this.hajjForm = this.fb.group({
    rows: this.fb.array(this.dataSource.map(element => this.createFormGroup(element)))
  });
}
  createFormGroup(element: PeriodicElement): FormGroup {
    return this.fb.group({
      number: [element.number],
      permissions: [element.permissions],
      page: [element.page],
      
    });
  }

  get rows(): FormArray {
    return this.hajjForm.get('rows') as FormArray;
  }

  editRow(index: number) {
    this.currentActiveRow = index;
  }

  saveRow(index: number) {
    this.currentActiveRow = -1;
    this.newAddition = false;

    const row = this.rows.at(index);
    this.dataSource[index] = row.value;
    this.table.renderRows();
  }

  cancelEdit() {
    this.currentActiveRow = -1;
  }

  @ViewChild(MatTable) table: MatTable<PeriodicElement>;
  currentActiveRowHandling = (a:number) =>  {
    
    this.formExw();
    let index = this.addNewData ? 0 :this.currentActiveRow-1
    let x = this.hajjForm.value.rows[index].page
    if (x != "") {
      this.currentActiveRow = a;
    this.newAddition = false;
    this.isEmpty = false
    }
    else{
      this.isEmpty = true
    }
  }
  addNewData = () => {
    const lastPosition = this.dataSource.length+1
    

    if (this.currentActiveRow != 0 && !this.newAddition) {
      let a: PeriodicElement = { number: lastPosition, page: '', permissions: "" };
      
      this.dataSource.splice(0, 0, a)
      this.formExw();
      this.table.renderRows();
      this.currentActiveRow = lastPosition;
      this.newAddition = true;
    }
  }
}
