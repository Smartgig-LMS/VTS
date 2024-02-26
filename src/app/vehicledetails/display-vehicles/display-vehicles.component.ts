import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-display-vehicles',
  templateUrl: './display-vehicles.component.html',
  styleUrl: './display-vehicles.component.css'
})
export class DisplayVehiclesComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DisplayVehiclesComponent>){
    console.log(data);
  }

  closedialog(){
    this.dialogRef.close()
  }
}
