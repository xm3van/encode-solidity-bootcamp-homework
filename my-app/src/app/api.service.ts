import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getContractAddress(): Observable<any> {
    return this.http.get("http://localhost:3000/token-address");
  }

  getBallotContractAddress(): Observable<any> {
    return this.http.get("http://localhost:3000/ballot-address");
  }

  getWalletAddress(): Observable<any> {
    return this.http.get("http://localhost:3000/wallet-address");
  }

  getTotalSupply(): Observable<any> {
    return this.http.get("http://localhost:3000/total-supply")
  }

  getWinningProposal(): Observable<any> {
    return this.http.get("http://localhost:3000/winning-proposal")
  }

  checkVotingPower(address: any): Observable<any> {
    return this.http.get(`http://localhost:3000/check-voting-power?address=${address}`);
  }

  delegate(body: any): Observable<any> {
    return this.http.post(`http://localhost:3000/delegate`, body);
  }

  vote(body: any): Observable<any> {
    return this.http.post(`http://localhost:3000/vote`, body);
  }

  requestTokens(body: any): Observable<any> {
    return this.http.post("http://localhost:3000/request-voting-tokens", body);
  }

  claimPayment(body: any): Observable<any> {
    return this.http.post("http://localhost:3000/claim-payment", body);
  }
}
