import { VoteService } from './votes/vote.service';
import { CommentService } from './comments/comment.service';
import { AnswerService } from './answers/answer.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NewCommentComponent } from './comments/new-comment/new-comment.component';
import { CommentComponent } from './comments/comment/comment.component';
import { SharedModule } from './../shared/shared.module';
import { VoteComponent } from './votes/vote.component';
import { QuestionsComponent } from './question-list/questions.component';
import { QuestionComponent } from './question/question.component';
import { QuestionService } from './question.service';
import { NewAnswerComponent } from './answers/new-answer/new-answer.component';
import { AnswerMcqComponent } from './answers/answer/answer-mcq.component';
import { AnswerShortComponent } from './answers/answer/answer-short.component';

@NgModule({
  declarations: [
    AnswerShortComponent,
    AnswerMcqComponent,
    NewAnswerComponent,
    QuestionComponent,
    QuestionsComponent,
    VoteComponent,
    CommentComponent,
    NewCommentComponent,
  ],
  providers: [
    QuestionService,
    AnswerService,
    CommentService,
    VoteService,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([]),
  ]
})
export class QuestionModule { }
