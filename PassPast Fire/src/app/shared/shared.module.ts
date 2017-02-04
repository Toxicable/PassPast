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
