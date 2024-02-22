import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flagged',
  templateUrl: './flagged.component.html',
  styleUrl: './flagged.component.css'
})
export class FlaggedComponent implements OnInit {

  constructor() {
    
  }
  ngOnInit(): void {
    
  }
  carNumbers = [
    "ABC123", "XYZ456", "123ABC", "456XYZ", "DEF789",
    "GHI012", "JKL345", "MNO678", "PQR901", "STU234",
    "VWX567", "YZA890", "BCD123", "EFG456", "HIJ789",
    "KLM012", "NOP345", "QRS678", "TUV901", "WXY234"
  ];

  invalidNumbers = [
    "123ABC", "456XYZ", "JKL345", "MNO678", "PQR901",
    "STU234", "VWX567", "YZA890", "KLM012"
  ];

  reviewNumbers = [
    "GHI012", "JKL345", "MNO678", "PQR901", "STU234",
  ];

}
