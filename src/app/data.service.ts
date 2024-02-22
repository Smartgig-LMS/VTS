import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class DataService {
  
  private url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getuser() {
    return this.http.get('https://dummyjson.com/users/1');
  }
  getcomments() {
    return this.http.get('https://dummyjson.com/comments');
  }

  getvehicleDetails(){
    return this.http.get(`${this.url}getvehicle_details`)
  }
}
