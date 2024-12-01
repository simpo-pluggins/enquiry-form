import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnquiryFormService {

  constructor(
    private http: HttpClient
  ) { }

  getWebsiteTemplate(url:any) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',  // This allows all domains to access the resource.
      'Access-Control-Allow-Credentials':'true'
    });
    return this.http.get(url);  
  }
}
