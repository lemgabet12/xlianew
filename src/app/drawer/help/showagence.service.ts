import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowagenceService {
  apiUrl = 'http://196.234.125.66:3084/hotel/countagence';
  constructor(private httpclient : HttpClient) {
  }
  showdata()
  {
    return this.httpclient.get(this.apiUrl);
  }
}
