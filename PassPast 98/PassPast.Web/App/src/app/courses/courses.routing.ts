import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { PapersComponent } from './papers/papers.component';
import { ExamsComponent } from './exams/exams.component';
import { QuestionsComponent } from './questions/questions.component';
import { AddExamComponent } from './exams/add-exam/add-exam.component';
import { ActivateCoursesService } from './courses/activate-courses.service';
import { ActivatePapersService } from './papers/activate-papers.service';

const routes: Routes = [

    {
        path: 'courses',
        component: CoursesComponent,
        canActivate: [ActivateCoursesService]
    },
    {
        path: 'courses/:courseId',
        component: PapersComponent,
        canActivate: [ActivatePapersService]
    },
    {
        path: 'courses/:courseId/:paperId',
        component: ExamsComponent,
    },
    {
        path: 'courses/:courseId/:paperId/add-exam',
        component: AddExamComponent,
    },
    {
        path: 'courses/:courseId/:paperId/:examId',
        component: QuestionsComponent,
    }

];




export const coursesRouting: ModuleWithProviders = RouterModule.forChild(routes);
