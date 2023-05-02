import { Injectable } from '@angular/core';
import { REMOTE_API } from 'src/app/model/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from 'src/app/model/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private departmentsUrl =`${REMOTE_API}/Department`; 

  constructor(
    private http: HttpClient
  ) { }
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.departmentsUrl}/GetDepartments`);
  }
}
