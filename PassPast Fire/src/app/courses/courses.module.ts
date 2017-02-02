import { NgModule } from '@angular/core';
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesComponent } from './course-list/courses.component';
import { CourseService } from './course.service';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  entryComponents: [
    AddCourseComponent
  ],
  declarations: [
    AddCourseComponent,
    CoursesComponent,
  ],
  providers: [
    CourseService
  ]
})
export class CourseModule { }
