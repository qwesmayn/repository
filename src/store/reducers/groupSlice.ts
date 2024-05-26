import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createGroup, deleteGroups, getGroups } from '../action_creators/actionCreatos';
import { IGroups } from '../../models/IGroups';

export interface groupState {
  isLoading: boolean,
  groups: IGroups[],
  errorCreate: string,
  errorDelete: string,
  errorChange: string
}

const initialState: groupState = {
  isLoading: false,
  groups: [],
  errorCreate: "",
  errorDelete: "",
  errorChange: "",
}

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    clearErrors(state) {
      state.errorCreate = "";
      state.errorDelete = "";
      state.errorChange = "";
    }
  },
  extraReducers: (builder) => {
    // обработка получения
    builder.addCase(getGroups.pending.type, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getGroups.fulfilled.type, (state, action: PayloadAction<IGroups[]>) => {
        state.isLoading = false;
        state.errorCreate = "";
        state.groups = action.payload
      }),
      builder.addCase(getGroups.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.errorCreate = action.payload;
      });
    // обработка создания группы
    builder.addCase(createGroup.rejected.type, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorChange = action.payload;
    });

    // обработка удаления 
    builder.addCase(deleteGroups.rejected.type, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorDelete = action.payload;
    });
  }
})

export const { clearErrors } = groupSlice.actions;
export default groupSlice.reducer;
