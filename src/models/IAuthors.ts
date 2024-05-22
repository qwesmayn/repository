import { IDiscipline } from "./IDiscipline";

export interface IAuthors {
    _id : string,
    fullName : string, 
    position : string,
    disciplines : IDiscipline[]
}