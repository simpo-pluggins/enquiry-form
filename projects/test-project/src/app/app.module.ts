import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnquiryFormModule } from '../../../enquiry-form/src/lib/enquiry-form.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    EnquiryFormModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
