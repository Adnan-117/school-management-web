import { NgModule } from '@angular/core';
import { StudentsRoutingModule } from './routing/students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentsEditComponent } from './students-edit/students-edit.component';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [StudentsComponent, StudentsEditComponent],
  imports: [
    StudentsRoutingModule,
    SharedModule
  ]
})
export class StudentsModule { }
