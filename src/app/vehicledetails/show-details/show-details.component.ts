import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrl: './show-details.component.css'
})
export class ShowDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){
  }

  showdata:any
  ngOnInit(): void {
    this.showdata = this.data
  }

}
