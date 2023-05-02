import { Injectable } from "@angular/core";
import { REMOTE_API } from "src/app/model/common";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Contract } from "src/app/model/contract";

@Injectable({
  providedIn: "root",
})
export class ContractService {
  private contractsUrl = `${REMOTE_API}/Contract`;

  constructor(private http: HttpClient) {}
  getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.contractsUrl}/GetContracts`);
  }
}
