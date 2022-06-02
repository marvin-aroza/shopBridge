import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoutingModule } from './add-routing.module';
import { AddComponent } from './add/add.component';

// Forms module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// shared module
import { SharedModule } from 'src/app/_shared/shared.module';

@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    AddRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AddModule { }
