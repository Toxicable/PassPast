import { NgModule } from '@angular/core';

import { CoursesComponent }   from './courses/courses.component';
import { coursesRouting } from './courses.routing';
import { PapersComponent } from './papers/papers.component';
import { ExamsComponent } from './exams/exams.component';
import { QuestionsComponent } from './questions/questions.component';

@NgModule({
    imports: [coursesRouting],
    exports: [],
    declarations: [
        CoursesComponent, 
        PapersComponent, 
        ExamsComponent,
        QuestionsComponent
    ]
})
export class CourseModule { }
