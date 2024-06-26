import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicledetailsRoutingModule } from './vehicledetails-routing.module';
import { VehicledetailsComponent } from './vehicledetails.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { DisplayVehiclesComponent } from './display-vehicles/display-vehicles.component';

@NgModule({
  declarations: [
    VehicledetailsComponent,
    ShowDetailsComponent,
    DisplayVehiclesComponent,
  ],
  imports: [
    CommonModule,
    VehicledetailsRoutingModule,
    HttpClientModule,
    AgGridModule,
    NgSelectModule,
    FormsModule
  ]
})
export class VehicledetailsModule { }
