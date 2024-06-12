import { TextFieldModule } from '@angular/cdk/text-field';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Contact2 } from '../contacts.types';
import { Observable, map, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new-user',
  standalone: true,
  imports: [MatAutocompleteModule, CommonModule, NgIf, MatButtonModule, MatTooltipModule, RouterLink, MatIconModule, NgFor, FormsModule, ReactiveFormsModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, NgClass, MatSelectModule, MatOptionModule, MatDatepickerModule, TextFieldModule, DatePipe, MatDialogModule],
  templateUrl: './add-new-user.component.html',
  styleUrl: './add-new-user.component.scss'
})
export class AddNewUserComponent implements OnInit {
  contact:Contact2 
  contactForm: FormGroup;
  groupControl = new FormControl('');
  groupFilteredOptions: Observable<string[]>;

  providers = new FormControl();
  allProviders: any[] = [{ PROV: "Group1" }, { PROV: "Group2" }, { PROV: "Group3" }, { PROV: "Group4" }, { PROV: "Group5" } ];
  filteredProviders: any[] = this.allProviders;

groupName:string[] = ["Group 1", "Group 2", "Group 3", "Group 4", "Group 5"]
  constructor(private _formBuilder: UntypedFormBuilder, 
              private _changeDetectorRef: ChangeDetectorRef,
              public dialog: MatDialog,
    private _contactsService: ContactsService,
  ) {

  }
  /**
     * On init
     */
  ngOnInit(): void {
    // Create the contact form
    this.contactForm = this._formBuilder.group({
      id: [''],
      avatar: [null],
      name: [''],
      arabicName: [''],
      group: [''],
      phone: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
    this.groupFilteredOptions = this.groupControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value || '')),
    );

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



  private _filterGroup(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.groupName.filter(option => option.toLowerCase().includes(filterValue));
  }
  onSubmit() {
    this.contact  ={
    id:Math.floor(Math.random() * (5405454546)).toString(),
    nameArabic : this.contactForm?.controls['arabicName']?.value,
    name : this.contactForm.controls['name'].value,
    group : this.groupControl.value,
    phoneNumbers : this.contactForm.controls['phone'].value,
    emails : this.contactForm.controls['email'].value,
    password : this.contactForm.controls['password'].value,
  }
    console.log(this.contact);
    
    this._contactsService.createNewContact(this.contact).subscribe((newContact) =>
      {
          this._changeDetectorRef.markForCheck();
          this.dialog.closeAll();
      });
  }

  /**
     * Upload avatar
     *
     * @param fileList
     */
  uploadAvatar(fileList: FileList): void {
    // Return if canceled
    if (!fileList.length) {
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = fileList[0];

    // Return if the file is not allowed
    if (!allowedTypes.includes(file.type)) {
      return;
    }

  }
  
}
