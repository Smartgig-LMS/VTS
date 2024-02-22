import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DataService } from './data.service';
import { AuthService } from './service/auth.service';
import { NgForm } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Hrms';
  Islogin: boolean = false;
  activityCollapsed = true;
  employeeCollapsed = true;
  HolidaysCollapsed = true;
  LeavesCollapsed = true;
  adminCollapsed = true;
  userdata: any;
  isAdmin: any;
  time:any
  date: string = '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  @ViewChild('drawer') drawer!: MatDrawer;
  constructor(private http: AuthService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.Islogin = JSON.parse(localStorage.getItem('token') || 'null');
    this.userdata = JSON.parse(localStorage.getItem('currentUser') || 'null');
    this.isAdmin = this.userdata?.restcolumns.role;
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  updateTime(): void {
    const now = new Date();
    this.time = now.toLocaleTimeString();
    this.date = now.toLocaleDateString();
  }

  logout() {
    this.userdata = JSON.parse(localStorage.getItem('currentUser') || 'null');
    let id = this.userdata?.restcolumns?.id;
    this.http.islogout(id).subscribe({
      next: (res: any) => {
        // console.log(res);
      },
    });
    this.http.clearstorage();
    window.location.reload();
  }

  changepassword(changepasswordform: NgForm) {
    // console.log(changepasswordform.value);
    this.userdata = JSON.parse(localStorage.getItem('currentUser') || 'null');
    let id = this.userdata?.restcolumns?.id;
    // console.log(id);
    this.http
      .changepassword({ ...changepasswordform.value, userId: id })
      .subscribe({
        next: (res: any) => {
          // console.log(res);
          this._snackBar.open(res.message, 'Splash', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
          });
        },
        error: (err: any) => {
          this._snackBar.open(err.error.error, 'Splash', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
          });
        },
      });
    changepasswordform.reset();
    this.http.clearstorage();
    window.location.reload();
  }

  close(changepasswordform: NgForm) {
    changepasswordform.reset();
  }
}
