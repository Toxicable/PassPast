import { NgModule } from '@angular/core';

import { CoursesComponent }   from './courses.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    exports: [],
    declarations: [CoursesComponent],
    providers: [],
})
export class CoursesModule { }
