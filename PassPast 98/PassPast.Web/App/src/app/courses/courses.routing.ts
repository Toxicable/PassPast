import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { PapersComponent } from './papers/papers.component';
import { ExamsComponent } from './exams/exams.component';
import { QuestionsComponent } from './questions/questions.component';
import { CourseResolveService } from './courses/course-resolve.service';
import { PaperResolveService } from './papers/paper-resolve.service';
import { AddExamComponent } from './exams/add-exam/add-exam.component';
import { ExamResolveService } from './exams/exam-resolve.service';

const routes: Routes = [
    {
        path: 'courses',
        component: CoursesComponent,
    },
    {
        path: 'courses/:courseId',
        component: PapersComponent,
        resolve: {
            courseExists: CourseResolveService
        }
    },
    {
        path: 'courses/:courseId/:paperId',
        component: ExamsComponent,
        resolve: {
            paperExists: PaperResolveService
        }
    },
    {
        path: 'courses/:courseId/:paperId/add-exam',
        component: AddExamComponent,
        resolve: {
            paperExists: PaperResolveService
        }
    },
    {
        path: 'courses/:courseId/:paperId/:examId',
        component: QuestionsComponent,
        resolve: {
            examExists: ExamResolveService
        }
    },
];




export const coursesRouting: ModuleWithProviders = RouterModule.forChild(routes);