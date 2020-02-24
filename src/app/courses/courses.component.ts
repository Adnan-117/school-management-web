import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { StudentsService } from '../students/service/students.service';
import { Courses } from './models/courses';
import { CourseService } from './services/course.service';
import { Students } from '../students/model/students';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Courses[];

  constructor(private courseService: CourseService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getListOfCourses();
  }
  getListOfCourses() {
    this.courseService.getListOfCourses().subscribe(
      (retrievedCourses: Courses[]) => this.courses = retrievedCourses,
      (error: any) => console.log('error:' + error)
    );
  }

  addCourse() {
    this.router.navigate(['coursesList/add']);
  }

  removeCourse(idCourse: number) {
    this.courseService.deleteCourse(idCourse).subscribe(
      () => this.ngOnInit()
    );
  }

  updateCourse(idCourse: number) {
    this.router.navigate(['coursesList/edit', idCourse]);
  }

  viewStudents(course: Courses) {
    const dialogRef = this.dialog.open(StudentViewComponent, {
      data: course,
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(
      () => this.ngOnInit()
    );
  }

}


@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html'
})

export class StudentViewComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<StudentViewComponent>,
    @Inject(MAT_DIALOG_DATA) public course: Courses,
    private studentService: StudentsService) { }

  public studentsReceived: Students[];

  ngOnInit() {
    this.studentsReceived = this.course.students;
  }

  public removeStudent(studentToRemove: Students) {
    this.studentService.removeStudentsFromCourses(studentToRemove.idStudent).subscribe(
      () => {
        this.studentsReceived = this.studentsReceived.filter(q => q !== studentToRemove);
      }
    );
  }

  public close() {
    this.dialogRef.close();
  }
}
