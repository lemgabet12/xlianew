import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://192.168.3.8:3013/hotel/lists';
  private etatUrl = 'http://192.168.3.8:3013/hotel/getOccupationDetails';


 // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getResidents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getetat(): Observable<any[]> {
    return this.http.get<any[]>(this.etatUrl);
  }
}
