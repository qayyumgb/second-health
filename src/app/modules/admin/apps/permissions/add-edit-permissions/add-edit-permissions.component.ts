import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
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

@Component({
    selector: 'app-add-edit-permissions',
    standalone: true,
    templateUrl: './add-edit-permissions.component.html',
    styleUrl: './add-edit-permissions.component.scss',
    imports: [MatButtonModule, AttachmentComponent, ViolationComponent, MatTableModule, MatTabsModule, MatDialogModule, MatAutocompleteModule, RouterLink, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule, NgFor, MatOptionModule, MatDatepickerModule, MatAutocompleteModule, AsyncPipe, ScriptDetailsComponent, PermissionDetailsComponent]
})
export class AddEditPermissionsComponent {
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
  filterTextBox:any = '';
  selectedYears: any[];
  equals(objOne, objTwo) {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.id === objTwo.id;
    }
  }

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
}
