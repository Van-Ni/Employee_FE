import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { REMOTE_API } from 'src/app/model/common';
import { Rewarddiscipline } from 'src/app/model/rewarddiscipline';

@Injectable({
  providedIn: 'root'
})
export class RewarddisciplineService {
  private rewarddisciplineUrl = `${REMOTE_API}/Rewarddiscipline`;
  constructor(
    private http: HttpClient
  ) { }

  getRewarddisciplines(): Observable<Rewarddiscipline[]> {
    return this.http.get<Rewarddiscipline[]>(`${this.rewarddisciplineUrl}/Gets`);
  }
  getRewarddiscipline(id: number): Observable<Rewarddiscipline> {
    return this.http.get<Rewarddiscipline>(`${this.rewarddisciplineUrl}/Get/${id}`);
  }
  createRewarddiscipline(rewarddiscipline: Rewarddiscipline): Observable<Rewarddiscipline> {
    return this.http.post<Rewarddiscipline>(`${this.rewarddisciplineUrl}/Create`, rewarddiscipline);
  }
  updateRewarddiscipline(id: number, rewarddiscipline: Rewarddiscipline): Observable<Rewarddiscipline> {
    const url = `${this.rewarddisciplineUrl}/UpdateRewardDiscipline/${id}`;
    delete rewarddiscipline.Id;
    return this.http.put<Rewarddiscipline>(url, rewarddiscipline);
  }
  deleteRewarddiscipline(id: number): Observable<any> {
    return this.http.delete<any>(`${this.rewarddisciplineUrl}/Delete/${id}`);
  }
}
