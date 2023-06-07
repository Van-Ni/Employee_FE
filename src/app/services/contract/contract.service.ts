import { Injectable } from "@angular/core";
import { REMOTE_API } from "src/app/model/common";
import { catchError, map, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Contract } from "src/app/model/contract";

@Injectable({
  providedIn: "root",
})
export class ContractService {
  private contractsUrl = `${REMOTE_API}/Contract`;

  constructor(private http: HttpClient) {}
  getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.contractsUrl}/GetAllContracts`);
  }
  getContract(id: number): Observable<Contract> {
    return this.http.get<Contract>(`${this.contractsUrl}/GetContract/${id}`);
  }
  createContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(`${this.contractsUrl}/CreateContract/`, contract);
  }
  updateContract(id: number, contract: Contract): Observable<Contract> {
    const url = `${this.contractsUrl}/UpdateContract/${id}`;
    return this.http.put<Contract>(url, contract);
  }
}
