import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendance } from 'src/app/model/attendance';
import { REMOTE_API } from 'src/app/model/common';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private attendancesUrl = `${REMOTE_API}/Attendance`;
  constructor(
    private http: HttpClient
  ) { }
  checkIn(id: number): Observable<any> {
    const url = `${REMOTE_API}/Attendance/CheckIn?id=${id}`;
    return this.http.post(url, {});
  }

  checkOut(id: number): Observable<any> {
    const url = `${REMOTE_API}/Attendance/CheckOut?id=${id}`;
    return this.http.put(url, {});
  }
  getAttendances(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.attendancesUrl}/GetAttendances`);
  }
}
