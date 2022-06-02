import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view/view.component';
// Shared module
import { SharedModule } from 'src/app/_shared/shared.module';


@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    SharedModule
  ]
})
export class ViewModule { }
