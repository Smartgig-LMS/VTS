import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AgGridModule } from 'ag-grid-angular';
import { ActionsComponent } from './actions/actions.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AgChartsAngularModule } from 'ag-charts-angular';

@NgModule({
  declarations: [
    AdminComponent,
    ActionsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AgChartsAngularModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    AgGridModule,
    MatDialogModule,
    MatTabsModule,FormsModule
  ],
  providers:[
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})
export class AdminModule { }
