import {Component, OnInit} from '@angular/core';
import {AppState} from '../app-store';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountService } from '../../core/account/account.service';
import { ProfileService } from '../../core/profile/profile.service';
import { Course } from '../courses/models/course';
import { Paper } from '../courses/models/paper';
import { Exam } from '../courses/models/exam';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    username$: Observable<string>;
    loggedIn$: Observable<boolean>;

    currentCourse$: Observable<Course>;
    currentPaper$: Observable<Paper>;
    currentExam$: Observable<Exam>;

    constructor(private profile: ProfileService,
                private account: AccountService,
                private store: Store<AppState>
    ) { }

    ngOnInit(): void {
        this.username$ = this.store.select( state => state.auth.profile.unique_name);
        this.loggedIn$ = this.store.select( state => state.auth.loggedIn);
        this.currentExam$ = this.store.map( state => state.courses.exam.selected);
        this.currentPaper$ = this.store.map( state => state.courses.paper.selected);
        this.currentCourse$ = this.store.map( state => state.courses.course.selected);

    }
}
