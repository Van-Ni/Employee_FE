import { Injectable } from '@angular/core';
import { REMOTE_API } from 'src/app/model/common';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Department } from 'src/app/model/department';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private departmentsUrl = `${REMOTE_API}/Department`;

  constructor(
    private http: HttpClient
  ) { }


  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.departmentsUrl}/GetAllDepartments`);
  }
  getDepartment(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.departmentsUrl}/GetDepartment/${id}`);
  }
  createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.departmentsUrl}/CreateDepartment`, department);
  }
  updateDepartment(id: number, department: Department): Observable<Department> {
    const url = `${this.departmentsUrl}/UpdateDepartment/${id}`;
    delete department.Id;
    return this.http.put<Department>(url, department);
  }
  delete(id: number): Observable<any> {
    const url = `${this.departmentsUrl}/DeleteDepartment/${id}`;
    return this.http.delete(url);
  }
}
