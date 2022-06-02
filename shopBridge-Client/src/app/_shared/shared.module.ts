import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
// components
import { FooterComponent } from './_components/footer/footer.component';
import { HeaderComponent } from './_components/header/header.component';
import { ErrorComponent } from './_components/error/error.component';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
// packages
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FormsModule } from '@angular/forms';
import { NumberCheckDirective } from './_directive/number-check.directive';
import { FloatPricePipe } from './_pipes/float-price.pipe';
// forms


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ErrorComponent,
    SidebarComponent,
    NumberCheckDirective,
    FloatPricePipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FilterPipeModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    NumberCheckDirective,
    FloatPricePipe
  ]
})
export class SharedModule { }
