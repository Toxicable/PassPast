import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { PaperService } from '../papers/paper.service';
import { PaperActions } from '../papers/paper.actions';
import { Store, Action } from '@ngrx/store';
import { AppState } from '../../app-store';
import { ExamActionTypes, ExamActions } from './exam.actions';
import { Observable } from 'rxjs/Observable';
import { Exam } from '../models/exam';
import { ExamService } from './exam.service';
import { QuestionActions } from '../questions/question.actions';
import { Paper } from '../models/paper';
import { Question } from '../models/question';
import { QuestionService } from '../questions/question.service';
import { LoadingBarService } from '../../core';

@Injectable()
export class ExamEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private examService: ExamService,
    private examActions: ExamActions,
    private questionActions: QuestionActions,
    private questionService: QuestionService,
    private loadingBar: LoadingBarService,
  ) { }

  @Effect()
  select: Observable<Action> = this.actions$
    .ofType(ExamActionTypes.SELECT)
    .map(action => +action.payload)
    .switchMap((examId: number) =>
      this.store.select(state => state.courses.exam.entities)
        .first()
        .flatMap((cachedExams: Exam[]) => {
          //TODO: add in selected cache
          const localExam = cachedExams.find(c => c.id === examId);
          if (localExam) {
            return Observable.of(this.examActions.selectSuccess(localExam));
          }
          return this.examService.getExam(examId)
            .map((exam: Exam) => {
              if (exam != null) {
                return this.examActions.selectSuccess(exam);
              }
              return this.examActions.selectFailed();
            });
        })
    );

  @Effect()
  selectSuccess: Observable<Action> = this.actions$
    .ofType(ExamActionTypes.SELECT_SUCCESS)
    .map(action => action.payload)
    .map((question: Question) => this.questionActions.load(question.id));


  @Effect()
  load: Observable<Action> = this.actions$
    .ofType(ExamActionTypes.LOAD)
    .map(action => action.payload)
    .switchMap((paperId: number) =>
      this.store.select(state => state.courses.exam.entities)
        .first()
        .flatMap(exams => {
          const localExams = exams.filter(exam => exam.paperId === paperId);
          if (localExams.length > 0) {
            return Observable.empty();
          }
          return this.loadingBar.doWithLoader(
            this.examService.getRelatedExams(paperId)
              .map(fetchedExams => {
                this.store.dispatch(this.examActions.cache(fetchedExams));
                return this.examActions.loadSuccess(fetchedExams);
              })
          );
        })
    );

@Effect()
add: Observable < Action > = this.actions$
  .ofType(ExamActionTypes.ADD)
  .map(action => action.payload)
  .flatMap((formData: any) =>
    this.store.select(state => state.courses.paper.selected)
      .flatMap(selectedPaper => {
        //make this a better method
        let newExam = Object.assign({}, { paperId: selectedPaper.id }, formData)
        delete newExam['sections'];

        return this.examService.create(newExam)
          .flatMap(createdExam => {
            let newPaperData = Object.assign({}, { examId: createdExam.id }, formData);
            delete newPaperData['semester'];
            delete newPaperData['year'];
            return this.questionService.create(newPaperData);
          })
      })
  )

}
