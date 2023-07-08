import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusinessContact } from '../interfaces/business-contact.interface';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class BusinessContactService {

	constructor(private http: HttpClient) { }
	
	public Create(businessContact: BusinessContact) {
		return this.http.post<BusinessContact[]>(`${environment.apiURL}/businessContact`, businessContact);
	}

	public Update(businessContactID: string, businessContact: BusinessContact) {
		return this.http.put<BusinessContact[]>(`${environment.apiURL}/businessContact/${businessContactID}`, businessContact);
	}

	public Get() {
		return this.http.get<BusinessContact[]>(`${environment.apiURL}/businessContact`);
	}

	public GetByID(businessContactID: string) {
		return this.http.get<BusinessContact>(`${environment.apiURL}/businessContact/${businessContactID}`);
	}

	public Delete(businessContactID: string) {
		return this.http.delete<BusinessContact[]>(`${environment.apiURL}/businessContact/${businessContactID}`);
	}


}