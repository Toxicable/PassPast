import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app-store';
import { PaperService } from '../papers/paper.service';
import { Observable } from 'rxjs';
import { Exam } from '../models/exam';
import { ExamService } from './exam.service';

@Component({
    selector: 'exams',
    templateUrl: 'exams.component.html'
})
export class ExamsComponent implements OnInit {
    constructor(private store: Store<AppState>,
                private exams: ExamService,

                
    ) { }

    exams$: Observable<Exam[]>;

    ngOnInit() {
        this.store.map( state=> state.courses.paper.selected.id)
        .subscribe( (paperId: number) => {
            this.exams$ = this.store.map( state => state.courses.exam.entities)
                .map((exams: Exam[]) => {
                    return exams.filter((paper: Exam) => paper.paperId == paperId)
                })
            })  

        this.exams.getExams()
            .subscribe();
     }
}