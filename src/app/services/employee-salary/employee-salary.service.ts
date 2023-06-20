import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { REMOTE_API } from 'src/app/model/common';
import { EmployeeSalary } from 'src/app/model/employee-salary';


@Injectable({
  providedIn: 'root',
})
export class EmployeeSalaryService {

  private salaryUrl = `${REMOTE_API}`;

  constructor(
    private http: HttpClient
  ) {}

  // getSalary(): Observable<EmployeeSalary[]> {
  //   return this.http.get<EmployeeSalary[]>(`${this.salaryUrl}/GetSalary`);
  // }

}
