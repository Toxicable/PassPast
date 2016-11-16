import { Component, OnInit } from '@angular/core';
import { PaperService } from './paper.service';
import { AlertService } from '../../core/services/alert.service';
import { Observable } from 'rxjs';
import { Paper } from '../models/paper';
import { AppState } from '../../app/app-store';
import { Store } from '@ngrx/store';
import { Course } from '../models/course';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'papers',
    templateUrl: 'papers.component.html'
})
export class PapersComponent implements OnInit {
    constructor(private papers: PaperService,
                private alert: AlertService,
                private store: Store<AppState>,
                private route: ActivatedRoute
    ) { }

    papers$: Observable<Paper[]>

    ngOnInit() {
        this.store.map( state=> state.courses.course.selected.id)
        .subscribe( (courseId: number) => {
            this.papers$ = this.store.map( state => state.courses.paper.entities)
                .map((courses: Paper[]) => {
                    return courses.filter((paper: Paper) => paper.courseId == courseId)
                })
            })  

        this.papers.getPapers()
            .subscribe();
     }
}