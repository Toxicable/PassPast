import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses/courses.component';
import { coursesRouting } from './courses.routing';
import { PapersComponent } from './papers/papers.component';
import { ExamsComponent } from './exams/exams.component';
import { CourseService } from './courses/course.service';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { PaperService } from './papers/paper.service';
import { AddPaperComponent } from './papers/add-paper/add-paper.component';
import { AddExamComponent } from './exams/add-exam/add-exam.component';
import { ExamService } from './exams/exam.service';
import { QuestionService } from './questions/question.service';
import { CourseActions } from './courses/course.actions';
import { PaperActions } from './papers/paper.actions';
import { ExamActions } from './exams/exam.actions';
import { QuestionActions } from './questions/question.actions';
import { SharedModule } from '../../shared/shared.module';
import { QuestionSectionComponent } from './exams/add-exam/question-section.component';
import { ActivateCourseService } from './courses/activate-courses.service';
import { ActivatePaperService } from './papers/activate-papers.service';
import { ActivateExamService } from './exams/activate-exam.service';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './courses/course.effects';
import { PaperEffects } from './papers/paper.effects';
import { ExamEffects } from './exams/exam.effects';
import { ActivateQuestionsService } from './questions/activate-questions.service';
import { QuestionEffects } from './questions/question.effects';
import { QuestionsComponent } from './questions/question-list/questions.component';
import { QuestionComponent } from './questions/question/question.component';
import { SignalrExamHubService } from './signalr-exam-hub.service';
import { AnswerMcqComponent } from './answers/answer/answer-mcq.component';
import { AnswerShortComponent } from './answers/answer/answer-short.component';
import { NewAnswerComponent } from './answers/new-answer/new-answer.component';
import { NewCommentComponent } from './comments/new-comment/new-comment.component';
import { VoteComponent } from './votes/vote.component';
import { CommentComponent } from './comments/comment/comment.component';

@NgModule({
  imports: [
    SharedModule,
    coursesRouting,
    EffectsModule.run(CourseEffects),
    EffectsModule.run(PaperEffects),
    EffectsModule.run(ExamEffects),
    EffectsModule.run(QuestionEffects)
  ],
  declarations: [
    CoursesComponent,
    AddCourseComponent,
    PapersComponent,
    AddPaperComponent,
    ExamsComponent,
    AddExamComponent,
    QuestionsComponent,
    QuestionSectionComponent,
    QuestionComponent,
    AnswerShortComponent,
    AnswerMcqComponent,
    NewAnswerComponent,
    NewCommentComponent,
    CommentComponent,

    VoteComponent,
  ],
  providers: [
    CourseService,
    PaperService,
    ExamService,
    QuestionService,

    CourseActions,
    PaperActions,
    ExamActions,
    QuestionActions,
    SignalrExamHubService,

    ActivateCourseService,
    ActivatePaperService,
    ActivateExamService,
    ActivateQuestionsService
  ],
  entryComponents: [
    AddCourseComponent,
    AddExamComponent,
    AddPaperComponent
  ]
})
export class CourseModule {
}
