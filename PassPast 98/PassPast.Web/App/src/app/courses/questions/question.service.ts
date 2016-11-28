import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app-store';
import { Question } from '../models/question';
import * as questionActions from './question.actions';
import { AuthHttp } from '../../../core/auth-http/auth-http.service';
import { QuestionActions } from './question.actions';

@Injectable()
export class QuestionService {
    constructor(private authHttp: AuthHttp,
                private store: Store<AppState>,
                private questionActions: QuestionActions

    ) { }

    getQuestions(examId: number): Observable<Question[]> {
        return this.authHttp.get('/questions/' + examId)
            .do((questions: Question[]) => {
                this.store.dispatch(this.questionActions.Load(questions));
            })
    }

    //todo: make this a proper model
    create(course: any): Observable<Question>{
        return this.authHttp.post('/questions', course)
            .do((newCourse: Question) => {
                //let action = new courseActions.AddAction(newCourse);
                //this.store.dispatch(action);
            })
    }
}