import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { DefaultValuePipe } from './pipes/default-value/default-value.pipe';
import { MaterialModule } from '@angular/material';
import { MarkdownComponent } from './markdown/markdown.component';
import { OrderByDatePipe } from './pipes/order-by-date/order-by-date.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ValidationMessagesModule } from 'angular-validators';
import { VoteComponent } from './votes/vote.component';

const DECLARATIONS = [
  DefaultValuePipe,
  OrderByDatePipe,
  LoadingBarComponent,
  MarkdownComponent,
  VoteComponent,
];
const IMPORTS = [
  ReactiveFormsModule,
  CommonModule,
  HttpModule,
  ValidationMessagesModule
]

@NgModule({
  imports: [
    ...IMPORTS,
    MaterialModule,
    FlexLayoutModule,
  ],
  declarations: [
    ...DECLARATIONS,
  ],
  exports: [
    ...DECLARATIONS,
    ...IMPORTS,
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class SharedModule { }
