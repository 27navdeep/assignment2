import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { BusinessContactService } from '../app-services/business-contact.service';
import { BusinessContact } from '../interfaces/business-contact.interface';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-business-contact',
  templateUrl: './business-contact.component.html',
  styleUrls: ['./business-contact.component.scss']
})
export class BusinessContactComponent implements OnInit {

  public Loading = false;

  public BusinessContactList: BusinessContact[] = [];

  constructor(private _businessContactService: BusinessContactService, private confirmationService: ConfirmationService, private service: MessageService, private _router: Router) {

  }

  ngOnInit(): void {
    this.getBusinessContactList();
  }

  public OnClickEditButton(businessContactID: string) {
    this._router.navigate([`./businessContact/${businessContactID}`]);
  }

  public OnClickCreateButton() {
    this._router.navigate([`./businessContact/create`]);
  }

  public OnClickDeleteButton(event: Event, businessContactID: string) {
    this.confirmationService.confirm({
      key: 'delete',
      target: event.target || new EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteBusinessContact(businessContactID);
      }
    });
  }

  private deleteBusinessContact(businessContactID: string) {
    this._businessContactService.Delete(businessContactID)
      .subscribe({
        next: () => {
          this.showInfoViaToast("Business Contact deleted.");
          this.getBusinessContactList();
        },
        error: (err) => {
          console.error(err);
          this.showErrorViaToast();
        }
      });
  }

  private showInfoViaToast(message: string) {
    this.service.add({ key: 'tst', severity: 'info', summary: 'Info Message', detail: message });
  }


  private showErrorViaToast() {
    this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Something went wrong.' });
  }

  private getBusinessContactList() {
    this.Loading = true;
    this._businessContactService.Get()
      .subscribe({
        next: (businessContact: BusinessContact[]) => {
          this.BusinessContactList = businessContact.sort(this.dynamicSort("contactName"));
          this.Loading = false;

        },
        error: (err) => {
          console.error(err);
          this.Loading = false;
        }
      });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  private dynamicSort(property: string) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a: any, b: any) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

}