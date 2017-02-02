import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Question } from '../models/question';

@Injectable()
export class QuestionService {
    constructor(

    ) { }

    getRelatedQuestions(examId: number) {
       // return this.authHttp.get(`/exams/${examId}/questions`)
    }

    // todo: make this a proper model
    create(course: any){
        // return this.authHttp.post('/questions', course)
        //     .do((newCourse: Question) => {
        //         // let action = new courseActions.AddAction(newCourse);
        //         // this.store.dispatch(action);
        //     });
    }
}
