import { Injectable } from "@angular/core";
import { REMOTE_API } from "src/app/model/common";
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Position } from "src/app/model/position";

@Injectable({
  providedIn: "root",
})
export class PositionService {

  private positionsUrl = `${REMOTE_API}/Position`;

  constructor(private http: HttpClient) {}

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.positionsUrl}/GetAllPositions`);
  }
  getPosition(id: number): Observable<Position> {
    return this.http.get<Position>(`${this.positionsUrl}/GetPosition/${id}`);
  }
  createPosition(position: Position): Observable<Position> {
    return this.http.post<Position>(`${this.positionsUrl}/CreatePosition/`, position);
  }
  updatePosition(id: number, position: Position): Observable<Position> {
    const url = `${this.positionsUrl}/UpdatePosition/${id}`;
    return this.http.put<Position>(url, position);
  }
}
