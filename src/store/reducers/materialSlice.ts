import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createMaterial,
  deleteMaterials,
  getMaterials,
  getMaterialsTypes,
  getMaterialsTypesById,
} from "../action_creators/actionCreatos";
import { ITypesMaterials } from "../../models/ITypesMaterials";
import { IMaterials } from "../../models/IMaterials";

export interface MaterialState {
  materials: IMaterials[];
  materialsTypes: ITypesMaterials[];
  isLoading: boolean;
  error: string;
}

const initialState: MaterialState = {
  materials: [],
  materialsTypes: [],
  isLoading: false,
  error: "",
};

export const materialSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // обработка получения материалов
    builder.addCase(getMaterials.pending.type, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(
        getMaterials.fulfilled.type,
        (state, action: PayloadAction<IMaterials[]>) => {
          state.isLoading = false;
          state.error = "";
          state.materials = action.payload;
        }
      ),
      builder.addCase(
        getMaterials.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );

    // обработка получения материалов по ид
    builder.addCase(getMaterialsTypesById.pending.type, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(
        getMaterialsTypesById.fulfilled.type,
        (state, action: PayloadAction<IMaterials[]>) => {
          state.isLoading = false;
          state.error = "";
          state.materials = action.payload;
        }
      ),
      builder.addCase(
        getMaterialsTypesById.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );

    // обработка создание материала
    builder.addCase(
      createMaterial.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );

    // обработка удаления материала
    builder.addCase(
      deleteMaterials.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      }
    );

    // обработка получения типов материалов
    builder.addCase(getMaterialsTypes.pending.type, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(
        getMaterialsTypes.fulfilled.type,
        (state, action: PayloadAction<ITypesMaterials[]>) => {
          state.isLoading = false;
          state.error = "";
          state.materialsTypes = action.payload;
        }
      ),
      builder.addCase(
        getMaterialsTypes.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default materialSlice.reducer;
