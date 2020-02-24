import { NgModule } from '@angular/core';
import { CoursesComponent, StudentViewComponent } from './courses.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseRoutingModule } from './routing/courses.routing.module';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [CoursesComponent, CourseEditComponent, StudentViewComponent],
  entryComponents: [StudentViewComponent],
  imports: [CourseRoutingModule, SharedModule ]
})
export class CoursesModule { }
