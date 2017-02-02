import { PaperService } from './paper.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { PapersComponent } from './paper-list/papers.component';
import { AddPaperComponent } from './add-paper/add-paper.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    PapersComponent,
    AddPaperComponent,
  ],
  entryComponents: [
    AddPaperComponent
  ],
  providers: [
    PaperService,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([]),
  ]
})
export class PaperModule { }
