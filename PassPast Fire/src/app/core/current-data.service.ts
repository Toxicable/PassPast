import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { ExamService } from './../exams/exam.service';
import { PaperService } from './../papers/paper.service';
import { CourseService } from './../courses/course.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class CurrentDataService implements CanActivate{

  constructor(
    private courses: CourseService,
    private papers: PaperService,
    private exams: ExamService,
    private title: Title,
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    this.courses.select(route.params['courseKey']);
    this.papers.select(route.params['paperKey']);
    this.exams.select(route.params['examKey']);
    return true;
  }

  setTitle() {
    const defaultTitle = 'Pass Past';
    return Observable.combineLatest(
      this.courses.selected$,
      this.papers.selected$,
      this.exams.selected$,
    ).do((selectedItems) => {
      const course = selectedItems[0];
      const paper = selectedItems[1];
      const exam = selectedItems[2];

      const title = `${course.code || ''} ${paper.name || ''} ${exam.year || ''} ${exam.semester || ''}`;
      const oldTitle = this.title.getTitle();

      if (title.trim() === '') {
        if (oldTitle !== defaultTitle) {
          this.title.setTitle(defaultTitle);
        }
      } else {
        if (title !== oldTitle) {
          this.title.setTitle(title);
        }
      }
    });
  }
}
