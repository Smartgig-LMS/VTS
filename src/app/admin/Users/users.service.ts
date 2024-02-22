import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = environment.apiUrl;
  constructor(private http:HttpClient) { }

  // users apis
  getUsers(){
    return this.http.get(this.url+'users')
  }
  updateUser(data:any){
    return this.http.put(`${this.url}users/${data._id}`,data)
  }

  deleteuser(data:any){
    return this.http.delete(`${this.url}users/${data}`,)
  }

  // holidays apis
  addholiday(data:any){
    return this.http.post(`${this.url}addholidays`,data)
  }

  getholidays(){
    return this.http.get(this.url+'getholidays')
  }
  deleteHolidays(data: any) {
    return this.http.delete(`${this.url}delete_holiday/${data}`);
  }

  // events api
  getevents(){
    return this.http.get(`${this.url}getevents`)
  }

  addevent(data:any){
    return this.http.post(`${this.url}addevent`,data)
  }

  deleteEvent(data:any){
    return this.http.delete(`${this.url}delete_event/${data}`)
  }

  updateevent(data:any){
    return this.http.put(`${this.url}event/${data._id}`,data)
  }

}
