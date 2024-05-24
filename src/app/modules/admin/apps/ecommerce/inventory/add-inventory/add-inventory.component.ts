import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-add-inventory',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, RouterLink, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule, NgFor, MatOptionModule, MatDatepickerModule],
  templateUrl: './add-inventory.component.html',
  styleUrl: './add-inventory.component.scss'
})
export class AddInventoryComponent {
  selectedProductForm: UntypedFormGroup;
  DashboardDataSource: number = 1
  updateData: Iinventory
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: UntypedFormBuilder,
    private _inventoryService: InventoryService,
  ) {
  }
  ngOnInit(): void {
    this.selectedProductForm = this._formBuilder.group({
      id: [''],
      lodge: [''],
      period: [''],
      date: [''],
      kind: [[]],
      fNo: [''],
      from: [''],
      fName: [''],
      pNumber: [''],
      nat: [''],
      kpi1: [''],
      kpi2: [''],
      kpi3: [''],
      kpi4: [''],
      kpi6: [''],
      kpi5: [''],
      kpi7: [''],
      kpi8: [''],
      kpi9: [[]],

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
  }

  tempInventary: Iinventory
  saveInventary() {
    debugger
    this.tempInventary = this.selectedProductForm.value
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
