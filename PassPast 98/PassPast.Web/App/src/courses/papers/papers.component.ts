import { Component, OnInit } from '@angular/core';
import { PaperService } from './paper.service';
import { AlertService } from '../../core/services/alert.service';
import { Observable } from 'rxjs';
import { Paper } from '../models/paper';
import { AppState } from '../../app/app-store';
import { Store } from '@ngrx/store';

@Component({
    selector: 'papers',
    templateUrl: 'papers.component.html'
})
export class PapersComponent implements OnInit {
    constructor(private papers: PaperService,
                private alert: AlertService,
                private store: Store<AppState>
    ) { }

    papers$: Observable<Paper[]>

    ngOnInit() {
        this.papers$ = this.store.map( state => state.courses.paper.entities) 
        this.papers.getCourses();
     }
}