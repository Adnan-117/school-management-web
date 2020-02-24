import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Courses } from 'src/app/courses/models/courses';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  public urlDeleteStudent = '/deleteStudents';
  public urlAddStudent = '/updateCourse';

  constructor(private httpClient: HttpClient) { }

  removeStudentsFromCourses(idStudent: number): Observable<any> {
    const url = `${this.urlDeleteStudent}/${idStudent}`;
    return this.httpClient.delete(url);
  }

  addStudentToCourse(course: Courses): Observable<any> {
    return this.httpClient.put<Courses>(this.urlAddStudent, course);
  }
}
