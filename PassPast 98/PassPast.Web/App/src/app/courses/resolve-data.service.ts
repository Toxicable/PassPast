import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { PaperService } from './papers/paper.service';
import { PaperActions } from './papers/paper.actions';
import { AlertService } from '../../core/alert/alert.service';
import { AppState } from '../app-store';
import { Paper } from './models/paper';
import { Exam } from './models/exam';
import { CourseActions } from './courses/course.actions';
import { CourseService } from './courses/course.service';
import { ExamActions } from './exams/exam.actions';
import { ExamService } from './exams/exam.service';
import { Course } from './models/course';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class DataResolveService {

  constructor(
    private papers: PaperService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private paperActions: PaperActions,
    private alert: AlertService,
    private courseActions: CourseActions,
    private courses: CourseService,
    private examActions: ExamActions,
    private exams: ExamService
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    this.resolve(route);
    return true;
  }
  canDeactivate(component: any, route: ActivatedRouteSnapshot) {
    this.resolve(route);
    return true;
  }

  resolve(route: ActivatedRouteSnapshot) {
    debugger
    let courseId = route.params['courseId'];
    let paperId = route.params['paperId'];
    let examId = route.params['examId'];

    this.resolveCourse(+courseId)
      .first()
      .subscribe();

    // this.resolvePaper(+paperId)
    // .first()
    //   .subscribe();
    // this.resolveExam(+examId)
    // .first()
    //   .subscribe();
  }

  resolveCourse(courseId: number): Observable<boolean> {
    if (!courseId) {
      //this.store.dispatch(this.courseActions.Select(null));
      return Observable.of(false);
    }

    return this.store.map(state => state.courses.course.entities)
      .first()
      .flatMap((courses: Course[]) => {
        let localCourse = courses.find(c => c.id === courseId);
        if (localCourse) {
          //this.store.dispatch(this.courseActions.Select(localCourse));
          return Observable.of(true);
        }
        return this.courses.getCourse(courseId)
          .map((course: Course) => {
            if (course != null) {
             // this.store.dispatch(this.courseActions.Add(course));
              //this.store.dispatch(this.courseActions.Select(course));
              return true;
            }
            this.alert.sendWarning('Course does not exist');
            return false;
          });
      });
  }

  resolvePaper(paperId: number): Observable<boolean> {
    if (!paperId) {
      this.store.dispatch(this.paperActions.Select(null));
      return Observable.of(false);
    }

    return this.store.map(state => state.courses.paper.displayed)
      .first()
      .flatMap((papers: Paper[]) => {
        let localPapers = papers.find(c => c.id === paperId);
        if (localPapers) {
          this.store.dispatch(this.paperActions.Select(localPapers));
          return Observable.of(true);
        }
        return this.papers.getPaper(paperId)
          .map((paper: Paper) => {
            if (paper != null) {
              this.store.dispatch(this.paperActions.Add(paper));
              this.store.dispatch(this.paperActions.Select(paper));
              return true;
            }

            this.alert.sendWarning('Paper does not exist');
            return false;
          });
      });
  }

  resolveExam(examId: number): Observable<boolean> {
    if (!examId) {
      this.store.dispatch(this.examActions.Select(null));
      return Observable.of(false);
    }

    return this.store.map(state => state.courses.exam.entities)
      .first()
      .flatMap((exams: Exam[]) => {
        let localExams = exams.find(c => c.id === examId);

        if (localExams) {
          this.store.dispatch(this.examActions.Select(localExams));
          return Observable.of(true);
        }
        return this.exams.getExam(examId)
          .map((exam: Exam) => {
            if (exam != null) {
              this.store.dispatch(this.examActions.Add(exam));
              this.store.dispatch(this.examActions.Select(exam));
              return true;
            }
            this.alert.sendWarning('Exam does not exist');
            return false;
          });
      });
  }
}
