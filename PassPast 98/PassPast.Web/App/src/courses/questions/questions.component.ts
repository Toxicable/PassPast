import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app-store';
import { QuestionService } from './question.service';
import { Observable } from 'rxjs/Observable';
import { Question } from '../models/question';

@Component({
    selector: 'questions',
    templateUrl: 'questions.component.html'
})
export class QuestionsComponent implements OnInit {
    constructor(private store: Store<AppState>,
                private questions: QuestionService) { }

    questions$: Observable<Question[]>;

    ngOnInit() { 

        this.store.map( state=> state.courses.exam.selected.id)
            .subscribe( (examId: number)=>{
                this.questions$ = this.store.map(state => state.courses.question.entities)
            })

        this.store.map( state=> state.courses.exam.selected.id)
            .first()
            .subscribe((examId: number) =>{                
                this.questions.getQuestions(examId)
                    .subscribe()
            })
    }
}