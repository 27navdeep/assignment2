import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project.interface';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ProjectService {

	constructor(private http: HttpClient) { }

	public Get() {
		return this.http.get<Project[]>(`${environment.apiURL}/project`);
	}

	public GetLocal() {
		return this.http.get<Project[]>('assets/data/projects.json');
	}
}