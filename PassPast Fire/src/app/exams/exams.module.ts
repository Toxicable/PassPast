import { RouterModule } from '@angular/router';
import { QuestionSectionComponent } from './add-exam/question-section.component';
import { SharedModule } from './../shared/shared.module';
import { ExamService } from './exam.service';
import { ExamsComponent } from './exam-list/exams.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { NgModule } from '@angular/core';
@NgModule({
  declarations: [
    AddExamComponent,
    ExamsComponent,
    QuestionSectionComponent,
  ],
  entryComponents: [
    AddExamComponent,
  ],
  providers: [
    ExamService,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([]),
  ]
})
export class ExamModule {}
