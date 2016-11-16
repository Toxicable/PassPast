import { NgModule } from '@angular/core';
import { CoursesComponent }   from './courses/courses.component';
import { coursesRouting } from './courses.routing';
import { PapersComponent } from './papers/papers.component';
import { ExamsComponent } from './exams/exams.component';
import { QuestionsComponent } from './questions/questions.component';
import { CourseService } from './courses/course.service';
import { SharedModule } from '../shared/shared.module';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { PaperService } from './papers/paper.service';
import { AddPaperComponent } from './papers/add-paper/add-paper.component';
import { CourseResolveService } from './courses/course-resolve.service';
import { AddExamComponent } from './exams/add-exam/add-exam.component';
import { PaperResolveService } from './papers/paper-resolve.service';
import { ExamService } from './exams/exam.service';
import { QuestionService } from './questions/question.service';
import { ExamResolveService } from './exams/exam-resolve.service';

@NgModule({
    imports: [
        SharedModule,
        coursesRouting

    ],
    exports: [],
    declarations: [
        CoursesComponent, 
        AddCourseComponent,
        PapersComponent, 
        AddPaperComponent,
        ExamsComponent,
        AddExamComponent,
        QuestionsComponent        
    ],
    providers: [
        CourseService,
        PaperService,
        ExamService,
        QuestionService,
        CourseResolveService,
        PaperResolveService,
        ExamResolveService

    ]
})
export class CourseModule { }