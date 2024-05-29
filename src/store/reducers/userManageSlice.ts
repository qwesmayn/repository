import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  changeAuthors,
  changeStudents,
  createStudent,
  getAuthors,
  getAuthorsById,
  getStudents,
} from "../action_creators/actionCreatos";
import { IAuthors } from "../../models/IAuthors";
import { IStudents } from "../../models/IStudents";

export interface userManageState {
  isLoading: boolean;
  authors: IAuthors[];
  students: IStudents[];
  error: string;
}

const initialState: userManageState = {
  isLoading: false,
  authors: [],
  students: [],
  error: "",
};

export const userManageSlice = createSlice({
  name: "userManage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // обработка запроса на получение преподователей
    builder.addCase(getAuthors.pending.type, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(
        getAuthors.fulfilled.type,
        (state, action: PayloadAction<IAuthors[]>) => {
          state.isLoading = false;
          state.error = "";
          state.authors = action.payload;
        }
      ),
      builder.addCase(
        getAuthors.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );

    // обработка запроса на получение преподователей по ид
    builder.addCase(getAuthorsById.pending.type, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(
        getAuthorsById.fulfilled.type,
        (state, action: PayloadAction<IAuthors[]>) => {
          state.isLoading = false;
          state.error = "";
          state.authors = action.payload;
        }
      ),
      builder.addCase(
        getAuthorsById.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );


    // обработка запроса на получение студентов
    builder.addCase(getStudents.pending.type, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(
        getStudents.fulfilled.type,
        (state, action: PayloadAction<IStudents[]>) => {
          state.isLoading = false;
          state.error = "";
          state.students = action.payload;
        }
      ),
      builder.addCase(
        getStudents.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );

    // обработка редактирования студентов
    builder.addCase(
      changeStudents.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      }
    );

    // обработка редактирования преподователя
    builder.addCase(
      changeAuthors.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      }
    );


    // обработка создания студента
    builder.addCase(
      createStudent.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      }
    );
  },
});

export default userManageSlice.reducer;
