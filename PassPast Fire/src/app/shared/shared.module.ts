import { FormInputComponent } from './form-input/form-input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { DefaultValuePipe } from './pipes/default-value/default-value.pipe';
import { MaterialModule } from '@angular/material';
import { MarkdownComponent } from './markdown/markdown.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ValidationMessagesModule } from 'angular-validators';

const DECLARATIONS = [
  DefaultValuePipe,
  LoadingBarComponent,
  MarkdownComponent,
  FormInputComponent,
];
const IMPORTS = [
  ReactiveFormsModule,
  CommonModule,
  HttpModule,
  MaterialModule,
  FlexLayoutModule
]

@NgModule({
  imports: [
    ...IMPORTS,
    ValidationMessagesModule
  ],
  declarations: [
    ...DECLARATIONS,
  ],
  exports: [
    ...DECLARATIONS,
    ...IMPORTS,
    ValidationMessagesModule,
  ]
})
export class SharedModule { }
