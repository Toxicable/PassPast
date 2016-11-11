import { NgModule } from '@angular/core';

import { CoursesComponent }   from './courses/courses.component';
import { coursesRouting } from './courses.routing';
import { PapersComponent } from './papers/papers.component';
import { ExamsComponent } from './exams/exams.component';
import { QuestionsComponent } from './questions/questions.component';
import { CourseService } from './courses/course.service';

@NgModule({
    imports: [
        coursesRouting
        
        ],
    exports: [],
    declarations: [
        CoursesComponent, 
        PapersComponent, 
        ExamsComponent,
        QuestionsComponent
    ],
    providers: [
        CourseService
    ]
})
export class CourseModule { }
