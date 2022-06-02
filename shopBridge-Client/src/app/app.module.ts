import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
// Shared module
import { SharedModule } from 'src/app/_shared/shared.module';
// http modules
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Forms modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Interceptors
import { AuthInterceptor } from './_shared/_interceptors/auth.interceptor';
import { ErrorInterceptor } from './_shared/_interceptors/error.interceptor';
// packages
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FilterPipeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
