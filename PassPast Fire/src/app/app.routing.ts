import { CurrentDataService } from './core/current-data.service';
import { AdminAuthGuard } from './core/guards/admin-auth-guard.service';
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
    path: 'admin',
    loadChildren: './+admin/admin.module.ts#AdminModule',
    canActivate: [AdminAuthGuard],
    canLoad: [AdminAuthGuard],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: '',
    component: CoursesComponent,
    canActivate: [CurrentDataService],
  },
  {
    path: ':courseKey',
    component: PapersComponent,
    canActivate: [CurrentDataService],
  },
  {
    path: ':courseKey/:paperKey',
    component: ExamsComponent,
    canActivate: [CurrentDataService],
  },
  {
    path: ':courseKey/:paperKey/:examKey',
    component: QuestionsComponent,
    canActivate: [CurrentDataService],
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
  preloadingStrategy: PreloadAllModules
});
