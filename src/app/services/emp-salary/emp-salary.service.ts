import { Injectable } from '@angular/core';
import { REMOTE_API } from 'src/app/model/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EmpSalaryComponent } from 'src/app/pages/emp-salary/emp-salary.component';
import { EmpSalary } from 'src/app/model/emp-salary';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmpSalaryService {
  

  constructor(
    private http: HttpClient,

  ) {
    
  }

  getAllEmployeeSalaries(): Observable<EmpSalary[]> {
    return this.http.get<EmpSalary[]>(`${REMOTE_API}/GetAllEmployeeSalaries`);
  }

  calculateSalary(params: any): Observable<any> {
    return this.http.post<any>(`${REMOTE_API}/Payroll/Calculate`, params);
  }
  getEmployeesByMonthYear(month: number, year: number, ): Observable<EmpSalary[]> {
    return this.http.get<EmpSalary[]>(`${REMOTE_API}/EmpSalary?month=${month}&year=${year}`);
  }

  getSalary(id: number): Observable<EmpSalary> {
    return this.http.get<EmpSalary>(`${REMOTE_API}/GetSalary/{id}`);
  }
}
