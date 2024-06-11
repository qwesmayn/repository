import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createLinkStudnet,
  deleteLinkStudent,
  getStudentsByDisciplineIds,
} from "../action_creators/actionCreatos";
import { IStudentById } from "../../models/IStudentById";

export interface studentByIdState {
  isLoading: boolean;
  studentsById: IStudentById[];
  error: string;
}

const initialState: studentByIdState = {
  isLoading: false,
  studentsById: [],
  error: "",
};

export const studentByIdSlice = createSlice({
  name: "studentById",
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    // обработка получения связи
    builder.addCase(getStudentsByDisciplineIds.pending.type, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(
        getStudentsByDisciplineIds.fulfilled.type,
        (state, action: PayloadAction<IStudentById[]>) => {
          state.isLoading = false;
          state.error = "";
          state.studentsById = action.payload;
          debugger
        }
      ),
      builder.addCase(
        getStudentsByDisciplineIds.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
    // обработка создания связи
    builder.addCase(
      createLinkStudnet.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      }
    );
    // обработка удаления связи
    builder.addCase(
      deleteLinkStudent.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      }
    );
  },
});

export default studentByIdSlice.reducer;
