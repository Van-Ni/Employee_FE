import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Employee } from '../../model/employee';
import { REMOTE_API } from '../../model/common';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesUrl = `${REMOTE_API}/Employee`;

  constructor(
    private http: HttpClient
  ) { }


  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.employeesUrl}/GetEmployees`);
  }
  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.employeesUrl}/GetEmployee/${id}`);
  }
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.employeesUrl}/CreateEmployee`, employee);
  }
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    const url = `${this.employeesUrl}/UpdateEmployee/${id}`;
    delete employee.Id;
    return this.http.put<Employee>(url, employee);
  }
}