import { Injectable }             from '@angular/core';
import { Observable } from 'rxjs';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';
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

@Injectable()
export class DataResolveService implements Resolve<void> {

  constructor(private papers: PaperService,
              private router: Router,
              private store: Store<AppState>,
              private paperActions: PaperActions,
              private alert: AlertService,
              private courseActions: CourseActions,
              private courses: CourseService,
              private examActions: ExamActions,
              private exams: ExamService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    let paperId = route.params['paperId'];
    let examId = route.params['examId'];
    let courseId = route.params['courseId'];

    if (!examId) {
        this.store.dispatch(this.examActions.Select(null));
    }
    if (!paperId) {
        this.store.dispatch(this.paperActions.Select(null));
    }
    if (!courseId) {
        this.store.dispatch(this.courseActions.Select(null));
        return Observable.of(false);
    }

    return this.resolveCourse(+courseId)
        .flatMap(courseResult => {
            if (!paperId || !courseResult) {
                return Observable.of(false);
            }
            return this.resolvePaper(+paperId)
                .flatMap(paperResult => {

                    if (!examId || !paperResult) {
                        return Observable.of(false);
                    }
                    return this.resolveExam(+paperId);
                });
        });

  }

  resolvePaper(paperId: number): Observable<boolean> {
    return this.store.map(state => state.courses.paper.displayed)
      .first()
      .flatMap( (papers: Paper[]) => {
        let localPapers = papers.find( c => c.id === paperId);
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

    return this.store.map(state => state.courses.exam.entities)
      .first()
      .flatMap( (exams: Exam[]) => {
        let localExams = exams.find( c => c.id === examId);

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

  resolveCourse(courseId: number): Observable<boolean> {

    return this.store.map(state => state.courses.course.entities)
      .first()
      .flatMap( (courses: Course[]) => {
        let localCourse = courses.find( c => c.id === courseId);
        if (localCourse) {
          this.store.dispatch(this.courseActions.Select(localCourse));
          return Observable.of(true);
        }
        return this.courses.getCourse(courseId)
          .map((course: Course) => {
            if (course != null) {
              this.store.dispatch(this.courseActions.Add(course));
              this.store.dispatch(this.courseActions.Select(course));
              return true;
            }
            this.alert.sendWarning('Course does not exist');
            return false;
          });
      });
  }
}