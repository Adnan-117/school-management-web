import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CourseService } from '../courses/services/course.service';
import { Courses } from '../courses/models/courses';
import { Students } from './model/students';
import { StudentsService } from './service/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  public studentForm: FormGroup;
  public idCourse: number;
  public courseRetrieved: Courses;
  public newStudentArray: Students[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private courseService: CourseService,
              private studentService: StudentsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRouteParams();
    this.initializeForm();
  }

  getRouteParams() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.idCourse = +params['id'];
          this.courseService.getCourseById(this.idCourse).subscribe(
            (data: Courses) => this.courseRetrieved = data
          );
        });
  }

  initializeForm() {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: [''],
    });
  }

  onSubmit(studentForm: any) {
    if (this.courseRetrieved.students !== null
      || this.courseRetrieved.students !== []) {
        for (const student of this.courseRetrieved.students) {
        this.newStudentArray.push(student);
        }
    }

    const newStudent: Students = new Students(
      studentForm.firstName, studentForm.lastName,
      studentForm.email, studentForm.phoneNumber);

    this.newStudentArray.push(newStudent);

    const studentToAdd: Courses = new Courses(
      this.courseRetrieved.name, this.courseRetrieved.date, this.newStudentArray, this.courseRetrieved.idCourse
    );

    this.studentService.addStudentToCourse(studentToAdd).subscribe(
      () => this.router.navigate(['../../coursesList'])
    );
  }

}
