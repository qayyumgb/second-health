import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
  { violationID: 1, shortCut: 'Hydrogen', violationName: "1.0079",  city: 'Khaplu', type: 'sometype', qty: "0510", flight: "PIA 058", company: "some Comapany", note: "some text Here" },
  { violationID: 2, shortCut: 'Helium', violationName: "4.0026",  city: 'Khaplu', type: 'sometype', qty: "0510", flight: "PIA 058", company: "some Comapany", note: "some text Here" },
  { violationID: 3, shortCut: 'Lithium', violationName: "6.941",  city: 'Khaplu', type: 'sometype', qty: "0510", flight: "PIA 058", company: "some Comapany", note: "some text Here" },
  { violationID: 4, shortCut: 'Beryllium', violationName: "9.0122",  city: 'Khaplu', type: 'sometype', qty: "0510", flight: "PIA 058", company: "some Comapany", note: "some text Here" },
  { violationID: 5, shortCut: 'Boron', violationName: "10.811",  city: 'Khaplu', type: 'sometype', qty: "0510", flight: "PIA 058", company: "some Comapany", note: "some text Here" },
  { violationID: 6, shortCut: 'Carbon', violationName: "12.0107",  city: 'Khaplu', type: 'sometype', qty: "0510", flight: "PIA 058", company: "some Comapany", note: "some text Here" },
  { violationID: 7, shortCut: 'Nitrogen', violationName: "14.0067",  city: 'Khaplu', type: 'sometype', qty: "0510", flight: "PIA 058", company: "some Comapany", note: "some text Here" },
  
];
@Component({
  selector: 'app-violation',
  standalone: true,
  imports: [MatTableModule,MatInputModule,MatFormFieldModule,MatIconModule,MatButtonModule],
  templateUrl: './violation.component.html',
  styleUrl: './violation.component.scss'
})

export class ViolationComponent {
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
  dataSource  = new MatTableDataSource(ELEMENT_DATA);
  currentActiveRow:number = -1;
  
  currentActiveRowHandling = (a:number) => this.currentActiveRow = a;

  addNewRow() {
    const lastPosition = this.dataSource.data.length > 0 ? this.dataSource.data[this.dataSource.data.length - 1].violationID : 0;
    // Create a new empty data object
    const newData: PeriodicElement = {
      violationID : lastPosition+1,
      shortCut: '',
      violationName: '',
      qty: '',
      city: '',
      type: '',
      flight: '',
      company: '',
      note: '',
    };
    // Add the new data object to the data source
    this.dataSource.data.push(newData);
    // Refresh the table display
    this.dataSource.filter = this.dataSource.filter;
    this.currentActiveRowHandling(newData.violationID);
  }
}
