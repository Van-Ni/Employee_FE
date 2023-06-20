import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REMOTE_API } from 'src/app/model/common';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
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
  getAttendances(): Observable<any[]> {
    return this.http.get<any[]>(`${REMOTE_API}/Attendance/GetAttendances`);
  }
}
