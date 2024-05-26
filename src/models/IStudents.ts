import { IGroups } from "./IGroups";

export interface IStudents {
    _id : string,
    fullName : string,
    group : IGroups,
    login : string,
    password : string,
}