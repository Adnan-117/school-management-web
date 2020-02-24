import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from '../courses.component';
import { CourseEditComponent } from '../course-edit/course-edit.component';


const routes: Routes = [
  {path: '', component: CoursesComponent},
  {path: 'add', component: CourseEditComponent},
  {path: 'edit/:id', component: CourseEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
