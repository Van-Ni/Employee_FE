import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Leave } from 'src/app/model/leave';
import { REMOTE_API } from 'src/app/model/common';



@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private leaveUrl = `${REMOTE_API}/Leave`;

  constructor(
    private http: HttpClient
  ) { }


  getLeaves(): Observable<Leave[]> {
    return this.http.get<Leave[]>(`${this.leaveUrl}/Gets`);
  }
  getLeave(id: number): Observable<Leave> {
    return this.http.get<Leave>(`${this.leaveUrl}/GetLeave/${id}`);
  }
  createLeave(leave: Leave): Observable<Leave> {
    return this.http.post<Leave>(`${this.leaveUrl}/Create`, leave);
  }
  updateLeave(id: number, leave: Leave): Observable<Leave> {
    const url = `${this.leaveUrl}/UpdateLeave/${id}`;
    delete leave.Id;
    return this.http.put<Leave>(url, leave);
  }
}
