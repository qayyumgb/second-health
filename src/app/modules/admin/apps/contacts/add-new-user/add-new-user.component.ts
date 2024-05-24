import { TextFieldModule } from '@angular/cdk/text-field';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-add-new-user',
  standalone: true,
  imports: [MatAutocompleteModule, NgIf, MatButtonModule, MatTooltipModule, RouterLink, MatIconModule, NgFor, FormsModule, ReactiveFormsModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, NgClass, MatSelectModule, MatOptionModule, MatDatepickerModule, TextFieldModule, DatePipe, MatDialogModule],
  templateUrl: './add-new-user.component.html',
  styleUrl: './add-new-user.component.scss'
})
export class AddNewUserComponent implements OnInit {
  contact:Contact2 
  contactForm: FormGroup;
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
    });

  }

  onSubmit() {
    this.contact  ={
    id:'',
    nameArabic : this.contactForm?.controls['arabicName']?.value,
    name : this.contactForm.controls['name'].value,
    group : this.contactForm.controls['group'].value,
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
