import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Holiday } from 'src/app/model/holiday';
import { REMOTE_API } from 'src/app/model/common';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private holidayUrl = `${REMOTE_API}/Holiday`;

constructor(
  private http: HttpClient
) { }

  getHolidays(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(`${this.holidayUrl}/Gets`);
  }
  getHoliday(id: number): Observable<Holiday> {
    return this.http.get<Holiday>(`${this.holidayUrl}/GetHoliday/${id}`);
  }
  createHoliday(holiday: Holiday): Observable<Holiday> {
    return this.http.post<Holiday>(`${this.holidayUrl}/CreateHoliday`, holiday);
  }
  updateHoliday(id: number, holiday: Holiday): Observable<Holiday> {
    const url = `${this.holidayUrl}/UpdateHoliday/${id}`;
    delete holiday.Id;
    return this.http.put<Holiday>(url, Holiday);
  }
}
