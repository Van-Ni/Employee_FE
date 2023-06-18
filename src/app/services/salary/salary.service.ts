import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { REMOTE_API } from 'src/app/model/common';
import { Salary } from 'src/app/model/salary';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  private salarysUrl = `${REMOTE_API}/Salary`;
  constructor(
    private http: HttpClient
  ) { }

  getSalarys(): Observable<Salary[]> {
    return this.http.get<Salary[]>(`${this.salarysUrl}/GetSalaries`);
  }
  getSalary(id: number): Observable<Salary> {
    return this.http.get<Salary>(`${this.salarysUrl}/GetSalary/${id}`);
  }
  createSalary(salary: Salary): Observable<Salary> {
    return this.http.post<Salary>(`${this.salarysUrl}/CreateSalary`, salary);
  }
  updateSalary(id: number, salary: Salary): Observable<Salary> {
    const url = `${this.salarysUrl}/UpdateSalary/${id}`;
    delete salary.Id;
    return this.http.put<Salary>(url, salary);
  }
}
