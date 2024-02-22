import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlaggedRoutingModule } from './flagged-routing.module';
import { FlaggedComponent } from './flagged.component';


@NgModule({
  declarations: [
    FlaggedComponent
  ],
  imports: [
    CommonModule,
    FlaggedRoutingModule
  ]
})
export class FlaggedModule { }
