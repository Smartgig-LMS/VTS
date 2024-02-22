import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  Token: any;
  data: any;
  private url = environment.apiUrl;

  register(data: any) {
    return this.http.post(this.url + 'register', data);
  }

  login(data: any) {
    return this.http.post(this.url + 'login', data).pipe(
      map((res: any) => {
        console.log(res);
        this.data = res;
        const token1 = res.response.token;
        if (token1) {
          this.Token = token1;
          const { token, password, lastLogin, ...restcolumns } = res.response;
          this.data = restcolumns;
          localStorage.setItem('currentUser', JSON.stringify({ restcolumns }));
          return true;
        } else {
          return false;
        }
      })
    );
  }

  islogout(id: any) {
    return this.http.post(`${this.url}logout/${id}`, { id });
  }

  changepassword(data:any){
    return this.http.post(`${this.url}change-password`,data)
  }
  
  userdata() {
    this.data;
  }

  clearstorage() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }
  
}
