import { NgModule } from '@angular/core';
import { EnquiryFormComponent } from './enquiry-form.component';
import { CommonModule } from '@angular/common';
import { LoadEnquiryFormComponent } from './load-enquiry-form/load-enquiry-form.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AnimationDirective } from './directive/animation-directive';
import { BackgroundDirective } from './directive/background-directive';
import { BorderDirective } from './directive/border-directive';
import { ContentFitDirective } from './directive/content-fit-directive';
import { OverlayDirective } from './directive/overlay-directive';
import { PositionLayoutDirectiveDirective } from './directive/position-layout-directive.directive';
import { ButtonDirectiveDirective } from './directive/button-directive.directive';
import { SanitizeHtmlPipe } from './services/sanitizeHtml';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoadEnquiryFormComponent
  ],
  imports: [
    FormsModule,
    ButtonDirectiveDirective,
    BackgroundDirective,
    OverlayDirective,
    BorderDirective,
    PositionLayoutDirectiveDirective,
    ContentFitDirective,
    AnimationDirective,
    SanitizeHtmlPipe,
    CommonModule,
    HttpClientModule,
    BrowserModule
  ],
  exports: [
    LoadEnquiryFormComponent
  ]
})
export class EnquiryFormModule { }
