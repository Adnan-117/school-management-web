import { Component, OnInit } from '@angular/core';
import { Courses } from '../models/courses';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Students } from 'src/app/students/model/students';


@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  public newCourse: Courses;
  public courseForm: FormGroup;
  public idCourse: number;
  public editMode = false;
  public students: Students[];

  constructor(private formBuilder: FormBuilder,
              private courseService: CourseService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRouteParams();
    this.initializeForm();
  }

  initializeForm() {
    this.courseForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  getRouteParams() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.idCourse = +params['id'];
          this.editMode = params['id'] != null;
          if (this.editMode) {
            this.getCourseById(this.idCourse);
          }
        });
  }

  getCourseById(idCourse: number) {
    this.courseService.getCourseById(idCourse).subscribe(
      (result: Courses) => this.populateFormControls(result)
    );
  }

  populateFormControls(result: Courses): void {
    this.students = result.students;
    const dateRetrived = new Date(result.date);
    this.courseForm = this.formBuilder.group({
      name: [result.name, Validators.required],
      date: [dateRetrived, Validators.required]
    });
  }

  onSubmit(addedCourse: any) {
    if (this.editMode) {
      const updatedCourse = new Courses(addedCourse.name, addedCourse.date, this.students, this.idCourse);
      this.courseService.updateCourse(updatedCourse).subscribe(
        (result) => this.router.navigate(['coursesList'])
      );
    } else {
      const newCourse = new Courses(addedCourse.name, addedCourse.date);
      this.courseService.saveCourses(newCourse).subscribe(
        result => this.router.navigate(['coursesList'])
      );
    }

  }

}
