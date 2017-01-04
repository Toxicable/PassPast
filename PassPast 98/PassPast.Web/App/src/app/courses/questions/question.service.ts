import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app-store';
import { Question } from '../models/question';
import { AuthHttp } from '../../core';
import { QuestionActions } from './question.actions';

@Injectable()
export class QuestionService {
    constructor(private authHttp: AuthHttp,
                private store: Store<AppState>,
                private questionActions: QuestionActions

    ) { }

    getRelatedQuestions(examId: number): Observable<Question[]> {
        return this.authHttp.get(`/exams/${examId}/questions`)
    }

    // todo: make this a proper model
    create(course: any): Observable<Question>{
        return this.authHttp.post('/questions', course)
            .do((newCourse: Question) => {
                // let action = new courseActions.AddAction(newCourse);
                // this.store.dispatch(action);
            });
    }
}
