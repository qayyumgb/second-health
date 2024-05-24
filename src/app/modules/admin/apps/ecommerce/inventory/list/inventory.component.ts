import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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





@Component({
  selector: 'app-view-detail',
  standalone: true,
  imports: [NgIf, MatProgressBarModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule,MatTableModule, MatDialogModule,MatPaginatorModule],
  templateUrl    : './inventory.component.html',
})
export class InventoryListComponent implements OnInit {

  displayedColumns: string[] = ['lodge', 'period', 'date', 'kind', 'fNo', 'from','fName','pNumber','nat', 'action'];
  DashboardDataSource:Iinventory[];
  isLoading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private inventaryService:InventoryService
  ) {}

 
  ngOnInit(): void {
   this.fetchData(); 
  }
  private fetchData(){
    this.inventaryService.products$.subscribe(
      (data: Iinventory[]) => {
        this.DashboardDataSource = data;
        console.log(this.DashboardDataSource);
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
    
    const dialogRef = this.dialog.open(AddInventoryComponent,{maxWidth:'900px', width:'100%'});
    a.unsubscribe();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteInventary(id:string){
    this.inventaryService.deleteProduct(id).subscribe(x =>{
      console.log(x)})
  }
}
