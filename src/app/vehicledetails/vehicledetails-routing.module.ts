import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicledetailsComponent } from './vehicledetails.component';

const routes: Routes = [
  { path: '', component: VehicledetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicledetailsRoutingModule { }
