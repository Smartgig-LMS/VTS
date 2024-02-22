import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'vehicle', pathMatch: 'full' },
  { path: 'login', component:LoginComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'vehicle', loadChildren: () => import('./vehicledetails/vehicledetails.module').then(m => m.VehicledetailsModule) },
  { path: 'flagged', loadChildren: () => import('./flagged/flagged.module').then(m => m.FlaggedModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
