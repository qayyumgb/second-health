import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { Iinventory } from '../inventory.types';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { PeriodicElement, ViolationComponent } from '../violation/violation.component';
import { MatTableModule } from '@angular/material/table';
import { AttachmentComponent } from '../attachment/attachment.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
const ELEMENT_DATA: { id: number, passengerNameEn: string, passengerNameAr: string, country: string, status: string }[]  = [
  {id: 1, passengerNameEn: 'Hydrogen', passengerNameAr: 'Hydrogen',  country: 'Hydrogen',  status: 'Hydrogen',},
  {id: 2, passengerNameEn: 'Helium',   passengerNameAr: 'Helium',  country: 'Helium',  status: 'Helium',},
  {id: 3, passengerNameEn: 'Lithium',  passengerNameAr: 'Lithium',  country: 'Lithium',  status: 'Lithium',},
  {id: 4, passengerNameEn: 'Beryllium', passengerNameAr: 'Beryllium',  country: 'Beryllium',  status: 'Beryllium',},
  {id: 5, passengerNameEn: 'Boron',    passengerNameAr: 'Boron',  country: 'Boron',  status: 'Boron',},
  {id: 6, passengerNameEn: 'Carbon', passengerNameAr: 'Carbon',  country: 'Carbon',  status: 'Carbon',},
];
@Component({
  selector: 'app-add-inventory',
  standalone: true,
  imports: [MatButtonModule,AttachmentComponent, ViolationComponent,MatTableModule, MatTabsModule, MatDialogModule, MatAutocompleteModule, RouterLink, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule, NgFor, MatOptionModule, MatDatepickerModule, MatAutocompleteModule, AsyncPipe,NgxMatSelectSearchModule],
  templateUrl: './add-inventory.component.html',
  styleUrl: './add-inventory.component.scss'
})
export class AddInventoryComponent implements OnInit {
  selectedProductForm: UntypedFormGroup;
  DashboardDataSource: number = 1
  updateData: Iinventory;
  lodgeControl = new FormControl('');
  periodControl = new FormControl('');
  fromControl = new FormControl('');
  TypeControl = new FormControl('');
  AirlineControl = new FormControl('');
  NationalityControl = new FormControl('');
  NationalityControl1 = new FormControl('');
  generalData = ELEMENT_DATA;
  displayedColumns: string[] = [
    "id",
    "passengerNameEn",
    "passengerNameAr",
    "country",
    "status",
  ];
  optionsLodge: string[] = ['lounge 1', 'lounge 2', 'lounge 3', 'lounge 4', 'lounge 5'];
  optionPeriod: string[] = ['period 1', 'period 2', 'period 3', 'period 4', 'period 5'];
  optionFrom: string[] = ['from 1', 'from 2', 'from 3', 'from 4', 'from 5'];
  optionAirline: string[] = ['Airline 1', 'Airline 2', 'Airline 3', 'Airline 4', 'Airline 5'];
  optionNationality: string[] = ['Nationality 1', 'Nationality 2', 'Nationality 3', 'Nationality 4', 'Nationality 5'];

  
  optionType: string[] = ['Trip Type 1', 'Trip Type 2', 'Trip Type 3', 'Trip Type 4', 'Trip Type 5'];
  lodngeFilteredOptions: string[];
  periodFilteredOptions: string[];
  fromFilteredOptions: string[];
  TypeFilteredOptions: string[];
  AirlineFilteredOptions: string[];
  NationalityFilteredOptions: Observable<string[]>;
  searchCtrl = new FormControl();
  filteredOptions: Observable<string[]>;
  selectedItems:any =[]
 
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: UntypedFormBuilder,
    private _inventoryService: InventoryService,
  ) { }
  isEdit: boolean = false;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionNationality.filter(option => option.toLowerCase().includes(filterValue));
  }
  ngOnInit(): void {
    this.filteredOptions = this.searchCtrl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.selectedProductForm = this._formBuilder.group({
      id: [''],
      lodge: [''],
      period: [''],
      tripType: [""],
      dateTime: [''],
      from: [''],
      flightNo: [''],
      airline: [''],
      nationality: [''],
      pVBeforeArrival: [''],
      portPolioVaccination: [''],
      yellowFeverCertification: [''],
      noOfPassenger: [''],
      yellowFeverCerNonComplaint: [''],
      yellowFeverRecord: [''],
      MeningitisVaccinaiton: [''],
      portPreventionTreatment: [''],
      expireMeningitisCertifate: [''],
      MeningitisCertificationNotExist: [[]],

    });

    this._inventoryService.products$.subscribe(
      (data: Iinventory[]) => {
        this.DashboardDataSource = data.length;
      },
      (error: any) => {
        console.error('Error fetching product data: ', error);
      }
    );

    this._inventoryService.product$.subscribe(x => {
      this.isEdit = false
      this.updateData = x

      if (x) {
        this.selectedProductForm.patchValue(x);
        this.lodgeControl.setValue(x.lodge)
        this.periodControl.setValue(x.period)
        this.fromControl.setValue(x.from)
        this.TypeControl.setValue(x.tripType)
        this.AirlineControl.setValue(x.airline)
        this.NationalityControl.setValue(x.nationality)
        this.isEdit = true
      }

    })
    this.searchnationality("", "all")

    // this.NationalityFilteredOptions = this.NationalityControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filterNationality(value || '')),
    // );

  }
  private _filterLodnge(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsLodge.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filterFrom(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionFrom.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filterPeriod(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionPeriod.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterType(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionType.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filterAirline(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionAirline.filter(option => option.toLowerCase().includes(filterValue));
  }
  // private _filterNationality(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.optionNationality.filter(option => option.toLowerCase().includes(filterValue));
  // }

  tempInventary: Iinventory
  saveInventary() {
    
    this.tempInventary = this.selectedProductForm.value
    this.tempInventary.nationality = this.NationalityControl.value
    console.log(this.tempInventary);
    if (this.tempInventary.lodge && this.tempInventary.period) {
      if (!this.tempInventary.id) {
        this.tempInventary.id = (this.DashboardDataSource + 1).toString();
        this._inventoryService.createProduct(this.tempInventary).subscribe({
          next: x => console.log(x),
          error: y => console.log(y)
        })

      } else {
        this._inventoryService.updateProduct(this.tempInventary.id, this.tempInventary).subscribe({
          next: x => console.log(x)
        })
      }
    }
  }

  searchnationality(e: any, field: string) {
    
    switch (field) {
      case "lodge":
        this.lodngeFilteredOptions = this._filterLodnge(this.lodgeControl.value || '');
        break;
      case "period":
        this.periodFilteredOptions = this._filterPeriod(this.periodControl.value || '');
        break;
      case "type":
        this.TypeFilteredOptions = this._filterType(this.TypeControl.value || '');
        break;
      case "from":
        this.fromFilteredOptions = this._filterType(this.fromControl.value || '');
        break;
      case "airline":
        this.AirlineFilteredOptions = this._filterAirline(this.AirlineControl.value || '');
        break;
      case "all":
        this.lodngeFilteredOptions = this._filterLodnge(this.lodgeControl.value || '');
        this.periodFilteredOptions = this._filterPeriod(this.periodControl.value || '');
        this.TypeFilteredOptions = this._filterType(this.TypeControl.value || '');
        this.fromFilteredOptions = this._filterType(this.fromControl.value || '');
        this.AirlineFilteredOptions = this._filterAirline(this.AirlineControl.value || '');
        break;
    }
  }
}
