import { DatePipe, NgClass, NgIf } from '@angular/common';
import { Component, OnInit, Pipe } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { ModalComponent } from '@fuse/components/modal/modal.component';
import { AddInventoryComponent } from '../add-inventory/add-inventory.component';
import { Iinventory } from '../inventory.types';
import { InventoryService } from '../inventory.service';
import { FuseDrawerComponent } from "../../../../../../../@fuse/components/drawer/drawer.component";
import { MatDatepickerModule } from '@angular/material/datepicker';





@Component({
    selector: 'app-view-detail',
    standalone: true,
    templateUrl: './inventory.component.html',
    styleUrl: './inventory.component.scss',
    imports: [NgClass,DatePipe, NgIf, ReactiveFormsModule, MatProgressBarModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MatDialogModule, MatPaginatorModule, FuseDrawerComponent, MatDatepickerModule]
})
export class InventoryListComponent implements OnInit {

  displayedColumns: string[] = ['lodge', 'period', 'date', 'kind', 'fNo', 'from','fName','pNumber','nat', 'action'];
  DashboardDataSource:Iinventory[];
  DashboardDataSourceStore:Iinventory[];
  isLoading: boolean = false;
  modalSizing:any;
formFieldHelpers: any;
filterTableForm:UntypedFormGroup;
advanceFilter: FormGroup;

  constructor(
    public dialog: MatDialog,
    private inventaryService:InventoryService,
    private fb: FormBuilder
  ) {}

 
  ngOnInit(): void {

    this.advanceFilter = this.fb.group({
        lodge : [''],
        period : [''],
        dateTime : [''],
        tripType : [''],
        flightNo : [''],
        from : [''],
        airline : [''],
        noOfPassenger : [''],
        nationality : [''],
    });
   this.fetchData(); 
   if (window.innerWidth > 1024) {
    this.modalSizing = {
      width: '80%',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%',      
      panelClass: 'full-screen-dialog' ,
      enterAnimationDuration: '0', // Specify enter animation duration
      exitAnimationDuration: '0'
    }
   } else {
    this.modalSizing = {
      width: '80%',
      maxWidth: '500px',
      panelClass: 'full-screen-dialog' ,
      enterAnimationDuration: '300ms', // Specify enter animation duration
      exitAnimationDuration: '150ms'
    }
   }
  }
  private fetchData(){
    this.inventaryService.products$.subscribe(
      (data: Iinventory[]) => {
        this.DashboardDataSource = data;
        this.DashboardDataSourceStore= data;
      },
      (error: any) => {
        console.error('Error fetching product data: ', error);
      }
    );
  }
  openDialog(id:string = null) {
    let a
    a =  this.inventaryService.getProductById(id).subscribe(x =>{
      console.log(x);
      
    })
    
    const dialogRef = this.dialog.open(AddInventoryComponent,this.modalSizing);
    a.unsubscribe();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteInventary(id:string){
    this.inventaryService.deleteProduct(id).subscribe(x =>{
      console.log(x)})
  }

  onSearch(){
    console.log(this.advanceFilter);

    const filters = this.advanceFilter.value;
    console.log(filters);
    
    this.DashboardDataSource = this.DashboardDataSourceStore.filter(item => {
      return Object.keys(filters).every(key => {
        return filters[key] === '' || item[key].toString().toLowerCase().includes(filters[key].toString().toLowerCase());
      });
    });
    
  }
}
