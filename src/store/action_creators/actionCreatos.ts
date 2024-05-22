import { IAuthors } from './../../models/IAuthors';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { jwtDecode } from "jwt-decode";
import { $authHost, $host } from "../../http";
import { IStudents } from '../../models/IStudents';


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
          "/students",
        )
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("Не удалось получить студентов");
      }
    }
  );

  // запросы на добавление


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

  