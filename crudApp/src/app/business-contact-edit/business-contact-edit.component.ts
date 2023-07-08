import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessContactService } from '../app-services/business-contact.service';
import { BusinessContact } from '../interfaces/business-contact.interface';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-business-contact-edit',
  templateUrl: './business-contact-edit.component.html',
  styleUrls: ['./business-contact-edit.component.scss']
})
export class BusinessContactEditComponent {
  public BusinessContactForm: any;
  public BusinessContactID: string = '';

  constructor(private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _confirmationService: ConfirmationService,
    private _businessContactService: BusinessContactService,
    private _messageService: MessageService) { }

  ngOnInit() {
    this.initializeForm();
    this.readRouteParameters();
  }

  public OnClickSubmitForm() {
    if (this.BusinessContactForm.valid) {
      if (this.BusinessContactID) {
        this.updateBusinessContact();
        return;
      }

      this.createBusinessContact();
    } else {
      // Form is invalid, display error messages
      this.markFormGroupTouched(this.BusinessContactForm);
    }
  }

  public OnClickCancelButton() {
    this.navigateToBusinessContactPage();
  }

  public OnClickDeleteButton(event: Event) {
    this._confirmationService.confirm({
      key: 'delete',
      target: event.target || new EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteBusinessContact(this.BusinessContactID);
      }
    });
  }
  
  public IsInvalid(controlName: string) {
    return (
      this.BusinessContactForm.get(controlName).invalid &&
      (this.BusinessContactForm.get(controlName).dirty ||
        this.BusinessContactForm.get(controlName).touched)
    );
  }

  private deleteBusinessContact(businessContactID: string) {
    this._businessContactService.Delete(businessContactID)
      .subscribe({
        next: () => {
          this.showInfoViaToast("Business Contact deleted.");
          this.navigateToBusinessContactPage();
        },
        error: (err) => {
          console.error(err);
          this.showErrorViaToast();
        }
      });
  }


  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private initializeForm() {
    this.BusinessContactForm = this._formBuilder.group({
      contactName: ['', Validators.required],
      contactNumber: ['', Validators.pattern(/^\(\d{3}\)-\d{3}-\d{4}$/)],
      emailAddress: ['', [Validators.required, Validators.email]]
    });
  }

  private readRouteParameters() {
    this._activatedRoute.params.subscribe(params => {
      this.BusinessContactID = params["businessContactID"];

      if (this.BusinessContactID === "create") return;
      this.getBusinessContact(this.BusinessContactID);
    });
  }

  private getBusinessContact(businessContactID: string | undefined) {
    if (!businessContactID) {
      return;
    }

    this._businessContactService.GetByID(businessContactID)
      .subscribe({
        next: (businessContact: BusinessContact) => {
          this.BusinessContactForm.patchValue(businessContact);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  private createBusinessContact() {
    this._businessContactService.Create(this.BusinessContactForm.value)
      .subscribe({
        next: () => {
          this._router.navigate(['./businessContact']);
          this.showInfoViaToast("Business Contact Created Successfully.");
        },
        error: (err) => {
          console.error(err);
          this.showErrorViaToast();
        }
      });
  }

  private updateBusinessContact() {
    this._businessContactService.Update(this.BusinessContactID, this.BusinessContactForm.value)
      .subscribe({
        next: () => {
          this._router.navigate(['./businessContact']);
          this.showInfoViaToast("Updated Successfully.");
        },
        error: (err) => {
          console.error(err);
          this.showErrorViaToast();
        }
      });
  }

  private navigateToBusinessContactPage() {
    this._router.navigate(['./businessContact']);
  }
  
  private showInfoViaToast(message: string) {
    this._messageService.add({ key: 'tst', severity: 'info', summary: 'Info Message', detail: message });
  }

  private showErrorViaToast() {
    this._messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Something went wrong.' });
  }
}
