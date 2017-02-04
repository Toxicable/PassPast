import { LoadingBarService } from './../core/loading-bar/loading-bar.service';
import { QuestionSection } from './question-section';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Exam, IncrimentType, Question, QuestionType, SemesterType } from '../models'
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ExamService {
  exams$: Observable<Exam[]>;
  selectedPaperId$: BehaviorSubject<string>;

  constructor(
    private af: AngularFire,
    private loadingBar: LoadingBarService,
  ) {
    this.selectedPaperId$ = new BehaviorSubject<string>(null);
    this.exams$ = this.af.database.list('/exams', {
      query: {
        orderByChild: 'paperKey',
        equalTo: this.selectedPaperId$,
      }
    })
    this.exams$.subscribe(p => p === null ? this.loadingBar.load() : this.loadingBar.done());
  }

  selectPaper(paperId: string) {
    this.selectedPaperId$.next(paperId);
  }

  create(form: { sections: QuestionSection[], year: number, semester: SemesterType }, paperKey: string) {

    const userId = this.af.auth.getAuth().uid;
    const newExam: Exam = {
      createdBy: userId,
      createdAt: new Date().toISOString(),
      year: form.year,
      semester: form.semester,
      paperKey
    };

    this.af.database.list('/exams').push(newExam)
      .then(result => {
        const examKey: string = result.key;

        const mapSection = (section: QuestionSection): Question[] => {
          const answersFactory = () => this.range(5)
            .map(index => {
              return {
                createdBy: userId,
                createdAt: new Date().toISOString(),
                contentOrIncriment: this.toAlpha(index + 1),
                voteValue: 0,
                votesSum: 0
              };
            });

          return this.range(+section.count).map(incriment => {
            return {
              subQuestions: section.subQuestions.map(y => mapSection(y)).reduce((a, b) => a.concat(b), []),
              createdAt: new Date().toISOString(),
              createdBy: userId,
              examKey: examKey,
              answers: section.type === 'mcq' && section.subQuestions.length === 0 ? answersFactory() : null,
              type: section.type,
              incriment: section.incrimentType === 'numbered' ? incriment + 1 :
                section.incrimentType === 'alpha' ? this.toAlpha(incriment + 1) : this.toRoman(incriment + 1)
            }
          });
        }

        const mappedQuestions = form.sections.map(x => mapSection(x)).reduce((a, b) => a.concat(b), [])
        this.af.database.list('/questions').push(mappedQuestions);
      })
  }
  private range(count): number[] {
    return Array.from(Array(count).keys());
  }

  private toRoman(number: number) {
    if ((number < 0) || (number > 39)) {
      throw new Error('insert value betwheen 1 and 39');
    }
    if (number < 1) {
      return '';
    }
    return number >= 10 ? 'x' + this.toRoman(number - 10) :
      number >= 9 ? 'ix' + this.toRoman(number - 9) :
        number >= 5 ? 'v' + this.toRoman(number - 5) :
          number >= 4 ? 'iv' + this.toRoman(number - 4) :
            'i' + this.toRoman(number - 1);
  }
  private toAlpha(number: number) {
    return String.fromCharCode(number + 96);
  }
}
