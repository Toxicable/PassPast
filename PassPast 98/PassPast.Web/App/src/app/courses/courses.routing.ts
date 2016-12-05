import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { PapersComponent } from './papers/papers.component';
import { ExamsComponent } from './exams/exams.component';
import { QuestionsComponent } from './questions/questions.component';
import { AddExamComponent } from './exams/add-exam/add-exam.component';
import { ActivateCourseService } from './courses/activate-courses.service';
import { ActivatePaperService } from './papers/activate-papers.service';
import { ActivateExamService } from './exams/activate-exam.service';

const routes: Routes = [

    {
        path: 'courses',
        component: CoursesComponent,
        canActivate: [ActivateCourseService]
    },
    {
        path: 'courses/:courseId',
        component: PapersComponent,
        canActivate: [ActivatePaperService]
    },
    {
        path: 'courses/:courseId/:paperId',
        component: ExamsComponent,
        canActivate: [ActivateExamService]
    },
    {
        path: 'courses/:courseId/:paperId/add-exam',
        component: AddExamComponent,
        canActivate: [ActivateExamService]
    },
    {
        path: 'courses/:courseId/:paperId/:examId',
        component: QuestionsComponent,
    }

];




export const coursesRouting: ModuleWithProviders = RouterModule.forChild(routes);
