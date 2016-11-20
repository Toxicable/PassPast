import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { PapersComponent } from './papers/papers.component';
import { ExamsComponent } from './exams/exams.component';
import { QuestionsComponent } from './questions/questions.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { AddPaperComponent } from './papers/add-paper/add-paper.component';
import { CourseResolveService } from './courses/course-resolve.service';
import { PaperResolveService } from './papers/paper-resolve.service';
import { AddExamComponent } from './exams/add-exam/add-exam.component';
import { ExamResolveService } from './exams/exam-resolve.service';
import { AuthenticatedAuthGuard } from '../core/guards/authenticated-auth-guard.service';

const routes: Routes = [
    {
        path: 'courses',
        component: CoursesComponent,
        canActivate: [AuthenticatedAuthGuard]
    },
    {
        path: 'courses/add-course',
        component: AddCourseComponent,
        canActivate: [AuthenticatedAuthGuard]
    },
    {
        path: 'courses/:courseId',
        component: PapersComponent,
        canActivate: [AuthenticatedAuthGuard],
        resolve: {
            courseExists: CourseResolveService
        }
    },
    {
        path: 'courses/:courseId/add-paper',
        component: AddPaperComponent,
        canActivate: [AuthenticatedAuthGuard],
        resolve: {
            courseExists: CourseResolveService
        }
    },
    {
        path: 'courses/:courseId/:paperId',
        component: ExamsComponent,
        canActivate: [AuthenticatedAuthGuard],
        resolve: {
            paperExists: PaperResolveService
        }
    },    
    {
        path: 'courses/:courseId/:paperId/add-exam',
        component: AddExamComponent,
        canActivate: [AuthenticatedAuthGuard],
        resolve: {
            paperExists: PaperResolveService
        }
    },
    {
        path: 'courses/:courseId/:paperId/:examId',
        component: QuestionsComponent,
        canActivate: [AuthenticatedAuthGuard],
        resolve: {
            examExists: ExamResolveService
        }
    },
];




export const coursesRouting: ModuleWithProviders = RouterModule.forChild(routes);