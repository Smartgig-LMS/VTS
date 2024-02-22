import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlaggedComponent } from './flagged.component';

const routes: Routes = [{ path: '', component: FlaggedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlaggedRoutingModule { }
