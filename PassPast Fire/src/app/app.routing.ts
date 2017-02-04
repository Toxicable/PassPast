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
        path: ':courseKey',
        component: PapersComponent,
    },
    {
        path: ':courseKey/:paperKey',
        component: ExamsComponent,
    },
    {
        path: ':courseKey/:paperKey/add-exam',
        component: AddExamComponent,
    },
    {
        path: ':courseKey/:paperKey/:examKey',
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
