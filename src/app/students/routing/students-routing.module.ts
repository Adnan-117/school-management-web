import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from '../students.component';
import { StudentsEditComponent } from '../students-edit/students-edit.component';


const routes: Routes = [
  {path: '', component: StudentsComponent},
  {path: ':id', component: StudentsEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
