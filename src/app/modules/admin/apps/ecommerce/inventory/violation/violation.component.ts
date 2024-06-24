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
  violationID: number;
  shortCut: string;
  violationName: string;
  qty: string;
  city: string
  type: string
  flight: string
  company: string
  note: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  { violationID: 1, shortCut: 'Hydrogen', violationName: "1.0079",  city: 'Khaplu', type: 'sometype', qty: "0510", flight: "PIA 058", company: "some Company", note: "some text Here" },
  { violationID: 2, shortCut: 'Helium', violationName: "4.0026",  city: 'Khaplu', type: 'sometype', qty: "0510", flight: "PIA 058", company: "some Company", note: "some text Here" },
  { violationID: 3, shortCut: 'Lithium', violationName: "6.941", city: 'Khaplu', type: 'sometype', qty: "0510", flight: "PIA 058", company: "some Company", note: "some text Here" },
  { violationID: 4, shortCut: 'Beryllium', violationName: "9.0122", city: 'Khaplu', type: 'sometype', qty: "0510", flight: "PIA 058", company: "some Company", note: "some text Here" },
  { violationID: 5, shortCut: 'Boron', violationName: "10.811", city: 'Khaplu', type: 'sometype', qty: "0510", flight: "PIA 058", company: "some Company", note: "some text Here" },
  { violationID: 6, shortCut: 'Carbon', violationName: "12.0107", city: 'Khaplu', type: 'sometype', qty: "0510", flight: "PIA 058", company: "some Company", note: "some text Here" },
  { violationID: 7, shortCut: 'Nitrogen', violationName: "14.0067", city: 'Khaplu', type: 'sometype', qty: "0510", flight: "PIA 058", company: "some Company", note: "some text Here" },
];

@Component({
  selector: 'app-violation',
  standalone: true,
  imports: [MatTableModule, NgFor, NgIf, ReactiveFormsModule, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule],
  templateUrl: './violation.component.html',
  styleUrls: ['./violation.component.scss']
})
export class ViolationComponent implements OnInit {
  displayedColumns: string[] = [
    "violationID",
    "shortCut",
    "violationName",
    "qty",
    "city",
    "type",
    "flight",
    "company",
    "note",
    "action"
  ];
  dataSource  = ELEMENT_DATA;
  currentActiveRow:number = -1;
  hajjForm: FormGroup;
  newAddition:boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.hajjForm = this.fb.group({
      rows: this.fb.array(this.dataSource.map(element => this.createFormGroup(element)))
    });
  }

  createFormGroup(element: PeriodicElement): FormGroup {
    return this.fb.group({
      violationID: [element.violationID],
      shortCut: [element.shortCut],
      violationName: [element.violationName],
      city: [element.city],
      type: [element.type],
      qty: [element.qty],
      flight: [element.flight],
      company: [element.company],
      note: [element.note]
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
    this.currentActiveRow = a;
    this.newAddition = false;
  }
  addNewData = () => {
    const lastPosition = this.dataSource.length+1
    

    if (this.currentActiveRow != 0 && !this.newAddition) {
      let a: PeriodicElement = { violationID: lastPosition, shortCut: '', violationName: "", city: '', type: '', qty: "", flight: "", company: "", note: "" };
      this.dataSource.splice(0, 0, a)
      this.table.renderRows();
      this.currentActiveRow = lastPosition;
      this.newAddition = true;
    }
  }
}
