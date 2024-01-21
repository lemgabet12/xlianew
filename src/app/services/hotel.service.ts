import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private adrese:string ="http://192.168.3.8"
  private port:string = "3013"
  private maapping:string ="hotel"
  constructor(private http:HttpClient) { }


 

  getDetailsOccupation(): Observable<any> {
    console.log("entred service getDetailsOccupation");
    
    return this.http.get(`${this.adrese}:${this.port}/${this.maapping}/getOccupationDetails`);

    
  }

  
  getOccupationDetailsPrev(): Observable<any> {
    console.log("entred service getOccupationDetailsPrev ");
    
    return this.http.get(`${this.adrese}:${this.port}/${this.maapping}/getOccupationDetailsPrev`);

    
  }
}
