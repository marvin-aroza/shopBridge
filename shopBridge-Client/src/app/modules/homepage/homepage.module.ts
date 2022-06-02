import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage/homepage.component';

// packages
import { FilterPipeModule } from 'ngx-filter-pipe';
//shared
import { SharedModule } from 'src/app/_shared/shared.module';


@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    FilterPipeModule,
    SharedModule
  ]
})
export class HomepageModule { }
