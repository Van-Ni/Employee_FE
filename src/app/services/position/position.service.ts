import { Injectable } from "@angular/core";
import { REMOTE_API } from "src/app/model/common";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Position } from "src/app/model/position";

@Injectable({
  providedIn: "root",
})
export class PositionService {
  private positionsUrl = `${REMOTE_API}/Position`;

  constructor(private http: HttpClient) {}
  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.positionsUrl}/GetPositions`);
  }
}
