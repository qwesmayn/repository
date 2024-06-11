import { IStudents } from "./IStudents";

export interface IStudentById {
    _id: string;
    student: IStudents;
    discipline: string;
}
