import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FuseDrawerComponent } from "../../../../../../@fuse/components/drawer/drawer.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddSettingComponent } from '../add-setting/add-setting.component';
import { InventoryService } from 'app/modules/admin/apps/ecommerce/inventory/inventory.service';
import { Iinventory } from 'app/modules/admin/apps/ecommerce/inventory/inventory.types';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'flight-settings',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    templateUrl: './flight-settings.component.html',
    styleUrl: './flight-settings.component.scss',
    imports: [NgClass, MatIcon, FuseDrawerComponent, MatFormFieldModule, MatButtonModule, MatTableModule, MatPaginatorModule, ReactiveFormsModule, FormsModule, MatInputModule]
})
export class FlightSettingsComponent implements OnInit {

  @Input() itemSelectedPanel:any;
  modalSizing:any;
  displayedColumns: string[] = ['flightImage', 'flightName', 'flightCode'];
  FlightDataSource = [
    {flightImage: 'https://1000logos.net/wp-content/uploads/2020/04/Turkish-Airlines-symbol.png', flightName: 'Turkish airline', flightCode: 'TK 201'},
    {flightImage: 'https://1000logos.net/wp-content/uploads/2020/04/Turkish-Airlines-symbol.png', flightName: 'Turkish airline', flightCode: 'TK 201'},
    {flightImage: 'https://1000logos.net/wp-content/uploads/2020/04/Turkish-Airlines-symbol.png', flightName: 'Turkish airline', flightCode: 'TK 201'},
  ];
  flightFilter: FormGroup;
  formFieldHelpers: any;
  code: string = '';

  constructor(
    public dialog: MatDialog,
    private inventaryService:InventoryService,
    private fb: FormBuilder
  ){

  }

  ngOnInit(): void {
    this.flightFilter = this.fb.group({
      flightName : [''],
      flightCode : [''],
  });
    this.fetchData();
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

  private fetchData(){
  }

  generateCode(): void {
    this.code = Math.floor(100 + Math.random() * 900).toString();
  }

  printCode(): void {
    if (this.code) {
      const printSection = document.getElementById('print-section');
      if (printSection) {
        const printWindow = window.open('', '', 'height=400,width=600');
        if (printWindow) {
          printWindow.document.write('<html><head><title>Print Code</title>');
          printWindow.document.write('<style>body{ font-family: Arial, sans-serif; text-align: center; padding-top: 50px; }</style>');
          printWindow.document.write('</head><body>');
          printWindow.document.write(printSection.innerHTML);
          printWindow.document.write('</body></html>');
          printWindow.document.close();
          printWindow.print();
        }
      }
    } else {
      alert('Please generate a code first.');
    }
  }

  openDialog() {    
    const dialogRef = this.dialog.open(AddSettingComponent,this.modalSizing);
  }
}
