import { NgModule } from '@angular/core';
import { CoursesComponent }   from './courses/courses.component';
import { coursesRouting } from './courses.routing';
import { PapersComponent } from './papers/papers.component';
import { ExamsComponent } from './exams/exams.component';
import { QuestionsComponent } from './questions/questions.component';
import { CourseService } from './courses/course.service';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { PaperService } from './papers/paper.service';
import { AddPaperComponent } from './papers/add-paper/add-paper.component';
import { CourseResolveService } from './courses/course-resolve.service';
import { AddExamComponent } from './exams/add-exam/add-exam.component';
import { PaperResolveService } from './papers/paper-resolve.service';
import { ExamService } from './exams/exam.service';
import { QuestionService } from './questions/question.service';
import { ExamResolveService } from './exams/exam-resolve.service';
import { CourseActions } from './courses/course.actions';
import { PaperActions } from './papers/paper.actions';
import { ExamActions } from './exams/exam.actions';
import { QuestionActions } from './questions/question.actions';
import { SharedModule } from '../../shared/shared.module';
import { QuestionSectionComponent } from './exams/add-exam/question-section.component';

@NgModule({
    imports: [
        SharedModule,
        coursesRouting

    ],
    declarations: [
        CoursesComponent,
        AddCourseComponent,
        PapersComponent,
        AddPaperComponent,
        ExamsComponent,
        AddExamComponent,
        QuestionsComponent,
        QuestionSectionComponent
    ],
    providers: [
        CourseService,
        PaperService,
        ExamService,
        QuestionService,
        CourseResolveService,
        PaperResolveService,
        ExamResolveService,

        CourseActions,
        PaperActions,
        ExamActions,
        QuestionActions,
    ],
    entryComponents: [
        AddCourseComponent,
        AddExamComponent,
        AddPaperComponent
    ]
})
export class CourseModule { }
