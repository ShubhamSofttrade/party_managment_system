import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { partyData } from '../data/partydata';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'https://ap.greatfuturetechno.com';
  private crsftoken = "Token 8843a727e6c7e61b1ae72476816561725f725f63";
  private token: string = '';

  constructor(private http: HttpClient) {
    // this.getToken();
  }

  getToken() {
    this.token = sessionStorage.getItem('Token') || '';
  }

  login(username: string, password: string) {
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    const url = `${this.baseUrl}/login/`;
    return this.http.post(url, formData).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  PostPartyData(partydata: partyData) {
    this.getToken();
    const formData: partyData = new partyData(partydata);
    const headers = new HttpHeaders({
      Authorization: `Token ${this.token}`,
    });
    const url = `${this.baseUrl}/party/`;
    return this.http.post(url, formData, { headers }).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  PutPartyData(id: number, partydata: partyData) {
    this.getToken();
    const formData: partyData = new partyData(partydata);
    const headers = new HttpHeaders({
      Authorization: `Token ${this.token}`,
    });
    const url = `${this.baseUrl}/party/?id=${id}`;
    return this.http.put(url, formData, { headers }).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  editParty(id: number) {
    this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Token ${this.token}`,
    });
    const params = new HttpParams().set('id', id.toString());
    const url = `${this.baseUrl}/party/`;
    return this.http.get(url, { params, headers })
  }

  getallParty() {
    this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Token ${this.token}`,
    });
    const url = `${this.baseUrl}/party/`;
    return this.http.get(url, { headers });
  }

  DeleteParty(id:number){
    this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Token ${this.token}`,
    });
    const url = `${this.baseUrl}/party/?id=${id}`;
    return this.http.delete(url, {  headers });
  }

  Logout(){
    this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Token ${this.token}`,
      'X-CSRFToken': this.crsftoken
    });
    return this.http.post(this.baseUrl, {}, { headers: headers }).pipe(
      catchError((err) => {
        return throwError(err);
      }
    )
  );
  }
}
