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

  calculateSalary(emps: EmpSalary[]): Observable<EmpSalary[]> {
    return this.http.post<EmpSalary[]>(`${REMOTE_API}/Payroll/Calculate`, emps);
  }
}
