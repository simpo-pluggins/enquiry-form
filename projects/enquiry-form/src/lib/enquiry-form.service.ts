import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnquiryFormService {

  constructor(
    private http: HttpClient
  ) { 
    this.fetchCurrentId();
  }

  getWebsiteTemplate(url:any) {
    return this.http.get(url);  
  }
  
  fetchCurrentId(){
    console.log('testing')
  }
}
