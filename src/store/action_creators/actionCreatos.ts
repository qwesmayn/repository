import { IAuthors } from './../../models/IAuthors';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { jwtDecode } from "jwt-decode";
import { $authHost, $host } from "../../http";
import { IStudents } from '../../models/IStudents';
import { IGroups } from '../../models/IGroups';
import { IDiscipline } from '../../models/IDiscipline';
import { IGroupsByiD } from '../../models/IGroupById';


  // Авторизация

  export const Login = createAsyncThunk(
    "user/login",
    async (
      user: { email: string; password: string;},
      thunkAPI
    ) => {
      try {
        const response = await $host.post<{ token: string }>(
          "/user-admin/login", user
        );
        localStorage.setItem("token", response.data.token);
        return jwtDecode<IUser>(response.data.token)._id;
      } catch (error) {
        return thunkAPI.rejectWithValue("Не удалось установить авторизацию");
      }
    }
  );

  // Запросы на получение данных 

  export const getAuthors = createAsyncThunk(
    "fetchAuthors",
    async (
      _,
      thunkAPI
    ) => {
      try {
        const response = await $authHost.get<{authors : IAuthors[]}>(
          "/authors",
        );
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("Не удалось получить преподователей");
      }
    }
  );

  export const getStudents = createAsyncThunk(
    "fetchStudents",
    async (
      _,
      thunkAPI
    ) => {
      try {
        const response = await $authHost.get<{students : IStudents[]}>(
          "/students/",
        )
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("Не удалось получить студентов");
      }
    }
  );

  export const getGroups = createAsyncThunk(
    "fetchGroups",
    async (
      _,
      thunkAPI
    ) => {
      try {
        const response = await $authHost.get<{groups : IGroups[]}>(
          "/groups/",
        )
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("Не удалось получить группы");
      }
    }
  );

  export const getDisciplines = createAsyncThunk(
    "fetchDisciplines",
    async (
      _,
      thunkAPI
    ) => {
      try {
        const response = await $authHost.get<{disciplines : IDiscipline[]}>(
          "/disciplines/",
        )
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("Не удалось получить группы");
      }
    }
  );

  export const getGroupsOnIdDiscipline = createAsyncThunk(
    "fetchGroupsOnIdDiscipline",
    async (disciplineIds: string[], thunkAPI) => {
      try {
        const response = await $authHost.get<{ groupsById: IGroupsByiD[] }>(
          `/find/d-g/groups`, {
            params: { disciplineIds: disciplineIds.join(',') }
          }
        );
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("Не удалось получить группы по id дисциплин");
      }
    }
  );
  

  // запросы на добавление

  export const createStudent = createAsyncThunk(
    "createStudents",
    async (
      data : { fullName : string, group : string, login: string, password : string},
      thunkAPI
    ) => {
      try {
        const response = await $authHost.post<{student : IStudents}>(
          "/students/", data
        )
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("Не удалось добавить студента");
      }
    }
  );

  export const createAuthors = createAsyncThunk(
    "createStudents",
    async (
      data : { fullName : string, position : string, disciplines : string[]},
      thunkAPI
    ) => {
      try {
        const response = await $authHost.post<{authors : IAuthors}>(
          "/authors/", data
        )
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("Не удалось добавить преподователя");
      }
    }
  );

  export const createGroup = createAsyncThunk(
    "createGroup",
    async (
      data : {name : string},
      thunkAPI
    ) => {
      try {
        const response = await $authHost.post<{group : IGroups}>(
          "/groups/", data
        )
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("Не удалось добавить преподователя");
      }
    }
  );

  export const createDisciplines = createAsyncThunk(
    "createDisciplines",
    async (
      data : {name : string},
            thunkAPI
    ) => {
      try {
        const response = await $authHost.post<{group : IGroups}>(
          "/groups/", data
        )
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("Не удалось добавить преподователя");
      }
    }
  );

  export const createLink = createAsyncThunk(
    "createLink",
    async (
      data : {groupId : string, disciplineId : string},
      thunkAPI
    ) => {
      try {
        const response = await $authHost.post<{group : IGroups}>(
          "/find/d-g", data
        )
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("Не удалось добавить связь между дисцплинной и группой");
      }
    }
  );


  // запросы на удаление

  export const deleteAuthors = createAsyncThunk(
    "deleteAuthors",
    async (
      id : string,
      thunkAPI
    ) => {
      try {
        const response = await $authHost.delete(
          `/authors/${id}`,
        );
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("Не удалось удалить преподователя");
      }
    }
  );

  export const deleteStudents = createAsyncThunk(
    "deleteStudents",
    async ( 
      id : string,
      thunkAPI
    ) => {
      try {
        const response = await $authHost.delete(
          `/students/${id}`,
        )
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("Не удалось удалить студента");
      }
    }
  );

  export const deleteGroups = createAsyncThunk(
    "deleteGroups",
    async ( 
      id : string,
      thunkAPI
    ) => {
      try {
        const response = await $authHost.delete(
          `/groups/${id}`,
        )
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("Не удалось удалить группу");
      }
    }
  );

  export const deleteDisciplines = createAsyncThunk(
    "deleteDisciplines",
    async ( 
      id : string,
      thunkAPI
    ) => {
      try {
        const response = await $authHost.delete(
          `/disciplines/${id}`,
        )
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("Не удалось удалить дисцплину");
      }
    }
  );

  export const deleteLink = createAsyncThunk(
    "deleteLink",
    async ( 
      data :{groupId : string, disciplineId : string},
      thunkAPI
    ) => {
      try {
        const response = await $authHost.delete(
          `/find/d-g/${data.groupId}/${data.disciplineId}`,
        )
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  // запросы на изменение данных

  export const changeStudents = createAsyncThunk(
    "changeStudents",
    async ( 
      changes : {id : string, change : {}},
      thunkAPI
    ) => {
      try {
        const response = await $authHost.put(
          `/students/${changes.id}`, 
          changes.change
        )
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("Не удалось изменить студента");
      }
    }
  );

  export const changeAuthors = createAsyncThunk(
    "changeAuthors",
    async ( 
      changes : {id : string, change : {}},
      thunkAPI
    ) => {
      try {
        const response = await $authHost.put(
          `/authors/${changes.id}`, 
          changes.change
        )
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("Не удалось изменить преподователя");
      }
    }
  );

  