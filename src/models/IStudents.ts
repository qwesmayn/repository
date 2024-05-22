import { IGroup } from "./IGroup";

export interface IStudents {
    _id : string,
    fullName : string,
    group : IGroup,
    login : string,
    password : string,
}