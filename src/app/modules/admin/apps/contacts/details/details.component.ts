import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ContactsService } from 'app/modules/admin/apps/contacts/contacts.service';
import { Contact, Country, Tag } from 'app/modules/admin/apps/contacts/contacts.types';
import { ContactsListComponent } from 'app/modules/admin/apps/contacts/list/list.component';
import { debounceTime, map, Observable, startWith, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'contacts-details',
  templateUrl: './details.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, MatButtonModule, CommonModule, MatAutocompleteModule, MatTooltipModule, RouterLink, MatIconModule, NgFor, FormsModule, ReactiveFormsModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, NgClass, MatSelectModule, MatOptionModule, MatDatepickerModule, TextFieldModule, FuseFindByKeyPipe, DatePipe, MatDialogModule],
})
export class ContactsDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
  @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
  @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;
  groupControl = new FormControl('');
  groupFilteredOptions: Observable<string[]>;
  groupName: string[] = ["Group 1", "Group 2", "Group 3", "Group 4", "Group 5"]
  countries: Country[];
  editMode: boolean = false;
  contactForm: UntypedFormGroup;

  /**
   * Constructor
   */
  constructor(
    private _contactsService: ContactsService,
    private _formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('data is ', data)
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the contact form

    this.contactForm = this._formBuilder.group({
      id: [''],
      avatar: [null],
      name: [''],
      nameArabic: [''],
      group: [''],
      phoneNumbers: [''],
      emails: [''],
      password: [''],
      confirmPassword: [''],
    });
    if (this.data) {
      console.log(this.data);

      this.contactForm.patchValue(this.data)
      this.groupControl.patchValue(this.data.group)
    }
    this.groupFilteredOptions = this.groupControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value || '')),
    );
  }
  private _filterGroup(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.groupName.filter(option => option.toLowerCase().includes(filterValue));
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {

  }


  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  /**
   * Get country info by iso code
   *
   * @param iso
   */
  getCountryByIso(iso: string): Country {
    return this.countries.find(country => country.iso === iso);
  }

  /**
  * Toggle edit mode
  *
  * @param editMode
  */
  toggleEditMode(editMode: boolean | null = null): void {
    if (editMode === null) {
      this.editMode = !this.editMode;
    }
    else {
      this.editMode = editMode;
    }

  }

  updateContact() {
    let newContact:any = {
        id:this.contactForm["id"].value,
        avatar:this.contactForm["avatar"].value,
        name:this.contactForm["name"].value,
        nameArabic:this.contactForm["nameArabic"].value,
        group:this.groupControl.value,
        phoneNumbers:this.contactForm["phoneNumbers"].value,
        emails:this.contactForm["emails"].value,
        password:this.contactForm["password"].value,
    }
    console.log(newContact);
    console.log(this.groupControl.value);
    
    
    this._contactsService.updateContact(this.contactForm.value.id, newContact).subscribe(x => console.log(x))
  }
  deleteContact() {

  }
}
