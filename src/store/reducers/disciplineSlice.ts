import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createDisciplines,
  deleteDisciplines,
  getDisciplines,
  getDisciplinesById,
  getMaterialsTypes,
} from "../action_creators/actionCreatos";
import { IDiscipline } from "../../models/IDiscipline";
import { ITypesMaterials } from "../../models/ITypesMaterials";

export interface disciplineState {
  isLoading: boolean;
  disciplines: IDiscipline[];
  error: string;
}

const initialState: disciplineState = {
  isLoading: false,
  disciplines: [],
  error: "",
};

export const disciplineSlice = createSlice({
  name: "disciplines",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // обработка получения дисциплин
    builder.addCase(getDisciplines.pending.type, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(
        getDisciplines.fulfilled.type,
        (state, action: PayloadAction<IDiscipline[]>) => {
          state.isLoading = false;
          state.error = "";
          state.disciplines = action.payload;
        }
      ),
      builder.addCase(
        getDisciplines.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );

    // обработка получения дисциплин по ид
    builder.addCase(getDisciplinesById.pending.type, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(
        getDisciplinesById.fulfilled.type,
        (state, action: PayloadAction<IDiscipline[]>) => {
          state.isLoading = false;
          state.error = "";
          state.disciplines = action.payload;
        }
      ),
      builder.addCase(
        getDisciplinesById.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );

    // обработка создания дисциплин
    builder.addCase(
      createDisciplines.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );

    // обработка удаления дисциплин
    builder.addCase(
      deleteDisciplines.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export default disciplineSlice.reducer;
