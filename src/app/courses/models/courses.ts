import { Students } from 'src/app/students/model/students';

export class Courses {
    constructor(
        public name: string,
        public date: Date,
        public students?: Students[],
        public idCourse?: number,
    ) {}
}
