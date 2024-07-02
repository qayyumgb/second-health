import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { ViolationComponent } from '../../ecommerce/inventory/violation/violation.component';
import { AttachmentComponent } from '../../ecommerce/inventory/attachment/attachment.component';
import { ScriptDetailsComponent } from "../script-details/script-details.component";
import { PermissionDetailsComponent } from "../permission-details/permission-details.component";
import { Observable, map, startWith } from 'rxjs';

@Component({
    selector: 'app-add-edit-permissions',
    standalone: true,
    templateUrl: './add-edit-permissions.component.html',
    styleUrl: './add-edit-permissions.component.scss',
    imports: [MatButtonModule, NgIf, AttachmentComponent, ViolationComponent, MatTableModule, MatTabsModule, MatDialogModule, MatAutocompleteModule, RouterLink, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule, NgFor, MatOptionModule, MatDatepickerModule, MatAutocompleteModule, AsyncPipe, ScriptDetailsComponent, PermissionDetailsComponent]
})
export class AddEditPermissionsComponent implements OnInit {
  ngOnInit(): void {
    this.filteredOptions = this.searchTextboxControl.valueChanges
    .pipe(
      startWith<string>(''),
      map(name => this._filter(name))
    );
      }
  displayedColumns: string[] = ['userName', 'id', 'title', 'action'];
  GroupUserDataSource = [
    {userName: 'User name 1', id: '123', title:'Software engineer'},
    {userName: 'User name 2', id: '564', title:'Software engineer'},
    {userName: 'User name 3', id: '567', title:'Software engineer'},
  ];
  flightFilter: FormGroup;

  providers = new FormControl();
  allProviders: any[] = [{ PROV: "Username1" }, { PROV: "Username2" }, { PROV: "Username3" }, { PROV: "Username4" }, { PROV: "Username5" } ];
  filteredProviders: any[] = this.allProviders;


  onInputChange(event: any) {
    const searchInput = event.target.value.toLowerCase();

    this.filteredProviders = this.allProviders.filter(({ PROV }) => {
      const prov = PROV.toLowerCase();
      return prov.includes(searchInput);
    });
  }

  onOpenChange(searchInput: any) {
    searchInput.value = "";
    this.filteredProviders = this.allProviders;
  }
  @ViewChild('search') searchTextBox: ElementRef;
  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  selectedValues = [];
  data: string[] = ['A1','A2','A3','B1','B2','B3','C1','C2','C3']
  filteredOptions: Observable<any[]>;
  private _filter(name: string): String[] {
    const filterValue = name.toLowerCase();
    this.setSelectedValues();
    this.selectFormControl.patchValue(this.selectedValues);
    let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }
  selectionChange(event) {
    if (event.isUserInput && event.source.selected == false) {
      let index = this.selectedValues.indexOf(event.source.value);
      this.selectedValues.splice(index, 1)
    }
  }
  openedChange(e) {
    this.searchTextboxControl.patchValue('');
    if (e == true) {
      this.searchTextBox.nativeElement.focus();
    }
  }
  clearSearch(event) {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
  }
  setSelectedValues() {
    console.log('selectFormControl', this.selectFormControl.value);
    if (this.selectFormControl.value && this.selectFormControl.value.length > 0) {
      this.selectFormControl.value.forEach((e) => {
        if (this.selectedValues.indexOf(e) == -1) {
          this.selectedValues.push(e);
        }
      });
    }
  }
  
}
