import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app-store';
import { QuestionService } from './question.service';
import { Observable } from 'rxjs/Observable';
import { Question } from '../models/question';
import { CommentsHubService } from '../comments/comments-hub.service';

@Component({
    selector: 'app-questions',
    templateUrl: 'questions.component.html'
})
export class QuestionsComponent implements OnInit {
    questions$: Observable<Question[]>;

    constructor(private store: Store<AppState>,
                private questions: QuestionService,
                private commentsHub: CommentsHubService

        ) { }

    ngOnInit() {
        this.questions$ = this.store.map(state => state.courses.question.display);

        this.commentsHub.init();

    }
}
