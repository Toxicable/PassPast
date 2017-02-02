import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

import { CoursesComponent } from './courses/course-list/courses.component';
import { PapersComponent } from './papers/paper-list/papers.component';
import { ExamsComponent } from './exams/exam-list/exams.component';
import { AddExamComponent } from './exams/add-exam/add-exam.component';
import { QuestionsComponent } from './questions/question-list/questions.component';


const appRoutes: Routes = [
    {
        path: '',
        component: CoursesComponent,
    },
    {
        path: ':courseId',
        component: PapersComponent,
    },
    {
        path: ':courseId/:paperId',
        component: ExamsComponent,
    },
    {
        path: ':courseId/:paperId/add-exam',
        component: AddExamComponent,
    },
    {
        path: ':courseId/:paperId/:examId',
        component: QuestionsComponent,
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent,
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules
});
