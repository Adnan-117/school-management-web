import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoursesModule } from '../courses.module';
import { Courses } from '../models/courses';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  public urlGetCourses = '/courses';
  public urlGetCourseById = '/courseById';
  public urlSaveCourse = '/persistCourse';
  public urlDeleteCourse = '/deleteCourse';
  public urlUpdateCourse = '/updateCourse';

  constructor(private httpClient: HttpClient) { }

  public getListOfCourses(): Observable <Courses[]> {
    return this.httpClient.get<Courses[]>(this.urlGetCourses);
  }

  public getCourseById(idCourse: number): Observable <Courses> {
    const url = `${this.urlGetCourseById}/${idCourse}`;
    return this.httpClient.get<Courses>(url);
  }

  public saveCourses(newCourse: Courses): Observable <any> {
    return this.httpClient.post<Courses>(this.urlSaveCourse, newCourse);
  }

  public deleteCourse(idCourse: number): Observable <any> {
    const url = `${this.urlDeleteCourse}/${idCourse}`;
    return this.httpClient.delete<Courses>(url);
  }

  public updateCourse(updatedCourse: Courses): Observable <any>  {
    return this.httpClient.put<Courses>(this.urlUpdateCourse, updatedCourse);
  }
}
