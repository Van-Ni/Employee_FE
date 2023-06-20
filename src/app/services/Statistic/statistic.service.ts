import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REMOTE_API } from 'src/app/model/common';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  constructor(private http: HttpClient) { }
  getEmployeeCountsByMonth(year: number): Observable<number[]> {
    const url = `${REMOTE_API}/EmployeeCountsByMonth/${year}`;
    return this.http.get<number[]>(url);
  }
  Count(): Observable<number[]> {
    const url = `${REMOTE_API}/Statistic/Count`;
    return this.http.get<any>(url);
  }
}
