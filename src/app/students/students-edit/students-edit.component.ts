import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Courses } from 'src/app/courses/models/courses';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CourseService } from 'src/app/courses/services/course.service';
import { StudentsService } from '../service/students.service';

@Component({
  selector: 'app-students-edit',
  templateUrl: './students-edit.component.html',
  styleUrls: ['./students-edit.component.css']
})
export class StudentsEditComponent implements OnInit {

  public studentEditForm: FormGroup;
  public idCourse: number;
  public courseRetrieved: Courses;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private courseService: CourseService,
              private studentService: StudentsService,
              private route: ActivatedRoute) {
                this.initializeForm();
              }

  ngOnInit() {
    this.getRouteParams();
  }

  initializeForm() {
    this.studentEditForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: [''],
    });
  }

  getRouteParams() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.idCourse = +params['id'];
          this.courseService.getCourseById(this.idCourse).subscribe(
            (data: Courses) => {
              this.courseRetrieved = data;
              this.createFormArray();
            }
          );
        });
  }

  createFormArray() {
    const studentsArray: FormArray = new FormArray([]);
    if (this.courseRetrieved.students.length > 0) {
      for (const student of this.courseRetrieved.students) {
        studentsArray.push(this.formBuilder.group({
          firstName: [student.firstName, Validators.required],
          lastName: [student.lastName, Validators.required],
          email: [student.email, Validators.required],
          phoneNumber: [student.phoneNumber],
        }));
      }
    }
    this.studentEditForm = this.formBuilder.group({
      students: studentsArray
    });
  }

  studentsControl() {
    return (<FormArray>this.studentEditForm.get('students')).controls;
  }

  addStudents() {
    (<FormArray>this.studentEditForm.get('students')).
      push(this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        phoneNumber: [''],
    }));
  }

  removeStudent(index: number) {
    (<FormArray>this.studentEditForm.get('students')).removeAt(index);
  }

  onSubmit() {
    const studentToAdd: Courses = new Courses(
      this.courseRetrieved.name, this.courseRetrieved.date,
      this.studentEditForm.value.students, this.courseRetrieved.idCourse
    );
    this.courseService.updateCourse(studentToAdd).subscribe(
      () => this.router.navigate(['../../coursesList'])
    );
  }

}
