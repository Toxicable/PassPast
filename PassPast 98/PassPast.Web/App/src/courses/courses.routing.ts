import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { PapersComponent } from './papers/papers.component';
import { ExamsComponent } from './exams/exams.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
      {
        path: 'courses',
        component: CoursesComponent
    },
    {
        path: 'courses/:courseId',
        component: PapersComponent
    },
    {
        path: 'courses/:courseId/:paperId',
        component: ExamsComponent
    },
    {
        path: 'courses/:courseId/:paperId/:examId',
        component: QuestionsComponent
    },
];




export const coursesRouting: ModuleWithProviders = RouterModule.forChild(routes);