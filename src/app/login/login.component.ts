import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { AuthService } from '../service/auth.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  constructor(private http:AuthService,
      private _snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: boolean){}

  usertype:any
  isLoginMode = true;
  ngOnInit(): void {
    this.usertype = JSON.parse(localStorage.getItem('currentUser')||'null')
    this.isLoginMode = this.data
  }
 
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onRoleChange(role: string) {
  //  console.log(role);
  }
  Submit(form:NgForm){
    if(this.isLoginMode){
      this.http.login({ ...form.value, 'isLogin':'yes' }).subscribe({
        next:(res:any)=>{
          if(res){
            localStorage.setItem('token',res)
            location.reload()
          }
        },
        error: (error: any) => {
          // alert(error.error.message)
          this._snackBar.open(error?.error?.message, 'Splash', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
          });
        }
      })
    }else{
      this.http.register({ ...form.value, 'isLogin':'no' }).subscribe({
        next: (res: any) => {
          // alert(res.message);
          this._snackBar.open(res.message, 'Splash', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
          });
          form.reset();
          this.isLoginMode = true;
        },
        error: (err: any) => {
          // alert(err.error);
          this._snackBar.open(err?.error?.message, 'Splash', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
          });
          console.error('Register Error:', err.message);
        }
      });
      
    }
  }
}
