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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-add-inventory',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule,MatAutocompleteModule, RouterLink, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule, NgFor, MatOptionModule, MatDatepickerModule,MatAutocompleteModule,AsyncPipe],
  templateUrl: './add-inventory.component.html',
  styleUrl: './add-inventory.component.scss'
})
export class AddInventoryComponent implements OnInit {
  selectedProductForm: UntypedFormGroup;
  DashboardDataSource: number = 1
  updateData: Iinventory;
  lodgeControl = new FormControl('');
  periodControl = new FormControl('');

  optionsLodge: string[] = ['lounge 1', 'lounge 2', 'lounge 3','lounge 4','lounge 5'];
  optionPeriod: string[] = ['period 1', 'period 2', 'period 3','period 4','period 5'];
  lodngeFilteredOptions: Observable<string[]>;
  periodFilteredOptions: Observable<string[]>;
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: UntypedFormBuilder,
    private _inventoryService: InventoryService,
  ) {
    debugger
  }
  ngOnInit(): void {
    this.selectedProductForm = this._formBuilder.group({
      id: [''],
      lodge: [''],
      period: [''],
      tripType: [""],
      dateTime: [''],
      name:[''],
      pNumber: [''],
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
      this.updateData = x
      if (x) {
        debugger
        this.selectedProductForm.patchValue(x)
      }

    })

    this.lodngeFilteredOptions = this.lodgeControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterLodnge(value || '')),
    );
    this.periodFilteredOptions = this.periodControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPeriod(value || '')),
    );
  }
  private _filterLodnge(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsLodge.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filterPeriod(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionPeriod.filter(option => option.toLowerCase().includes(filterValue));
  }
  tempInventary: Iinventory
  saveInventary() {
    this.tempInventary = this.selectedProductForm.value
    console.log(this.tempInventary); 
   if (this.tempInventary.lodge && this.tempInventary.period && this.tempInventary.name) {
    if (!this.tempInventary.id) {
      this.tempInventary.id = (this.DashboardDataSource + 1).toString();
    this._inventoryService.createProduct(this.tempInventary).subscribe({
      next: x => console.log(x),
      error: y => console.log(y)
    })

    } else {
      this._inventoryService.updateProduct(this.tempInventary.id, this.tempInventary).subscribe({
        next:x => console.log(x)
      })
    }
   }
  }

}
