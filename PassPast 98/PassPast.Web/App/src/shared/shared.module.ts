import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { ValidationSummaryComponent } from './form-validation/validation-summary.component';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesComponent } from './form-validation/control-messages.component';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { DefaultValuePipe } from './pipes/default-value/default-value.pipe';
import { MaterialModule } from '@angular/material';
import { MarkdownComponent } from './markdown/markdown.component';
import { OrderByDatePipe } from './pipes/order-by-date/order-by-date.pipe';


@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpModule,
    MaterialModule.forRoot(),
  ],
  declarations: [
    DefaultValuePipe,
    OrderByDatePipe,
    LoadingBarComponent,
    AlertComponent,
    ControlMessagesComponent,
    ValidationSummaryComponent,
    MarkdownComponent,
  ],
  exports: [
    OrderByDatePipe,
    MaterialModule,
    DefaultValuePipe,
    ReactiveFormsModule,
    HttpModule,
    LoadingBarComponent,
    AlertComponent,
    ControlMessagesComponent,
    CommonModule,
    ValidationSummaryComponent,
    MarkdownComponent,
  ]
})
export class SharedModule { }
