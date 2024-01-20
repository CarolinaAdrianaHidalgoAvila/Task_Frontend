import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusRoutingModule } from './status-routing.module';
import { StatusFormComponent } from './status-form/status-form.component';

import { StatusService } from './services/status.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StatusFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    StatusRoutingModule
  ],
  providers: [
    StatusService
  ],
  exports:[
    StatusFormComponent
  ]
})
export class StatusModule { }
