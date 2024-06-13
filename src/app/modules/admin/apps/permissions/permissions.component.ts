import { DatePipe, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { Iinventory } from '../ecommerce/inventory/inventory.types';
import { InventoryService } from '../ecommerce/inventory/inventory.service';
import { AddEditPermissionsComponent } from './add-edit-permissions/add-edit-permissions.component';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [NgClass,DatePipe, NgIf, ReactiveFormsModule, MatProgressBarModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MatDialogModule, MatPaginatorModule, FuseDrawerComponent, MatDatepickerModule],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss'
})
export class PermissionsComponent {
  
  modalSizing:any;
  formFieldHelpers: any;
  displayedColumns: string[] = ['grouptName', 'groupDescription', 'permissions', 'action'];
  GroupDataSource = [
    {grouptName: 'Group name 1', groupDescription: 'some dummy text', permissions:'admin'},
    {grouptName: 'Group name 2', groupDescription: 'some dummy text', permissions:'admin'},
    {grouptName: 'Group name 3', groupDescription: 'some dummy text', permissions:'admin'},
  ];
  flightFilter: FormGroup;

constructor(
  public dialog: MatDialog,
  private inventaryService:InventoryService,
  private fb: FormBuilder
) {}

ngOnInit(): void {
 
 if (window.innerWidth > 1024) {
  this.modalSizing = {
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',      
    panelClass: 'full-screen-dialog' ,
    enterAnimationDuration: '0', // Specify enter animation duration
    exitAnimationDuration: '0'
  }
 } else {
  this.modalSizing = {
    width: '100%',
    maxWidth: '500px',
    panelClass: 'full-screen-dialog' ,
    enterAnimationDuration: '300ms', // Specify enter animation duration
    exitAnimationDuration: '150ms'
  }
 }
}

openDialog(id:string = null) {
  const dialogRef = this.dialog.open(AddEditPermissionsComponent,this.modalSizing);
}

}
