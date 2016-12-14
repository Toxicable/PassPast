import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddExamComponent } from './exams/add-exam/add-exam.component';
import { ActivateCourseService } from './courses/activate-courses.service';
import { ActivatePaperService } from './papers/activate-papers.service';
import { ActivateExamService } from './exams/activate-exam.service';
import { ActivateQuestionsService } from './questions/activate-questions.service';
import { QuestionsComponent } from './questions/question-list/questions.component';
import { CoursesComponent } from './courses/course-list/courses.component';
import { PapersComponent } from './papers/paper-list/papers.component';
import { ExamsComponent } from './exams/exam-list/exams.component';

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
        canActivate: [ActivateQuestionsService]
    }

];




export const coursesRouting: ModuleWithProviders = RouterModule.forChild(routes);
