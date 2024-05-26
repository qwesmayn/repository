import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { deleteLink, getGroupsOnIdDiscipline } from '../action_creators/actionCreatos';
import { IGroupsByiD } from '../../models/IGroupById';

export interface groupsByIdState {
isAuth : boolean,
isLoading : boolean,
groupsById : IGroupsByiD[],
error : string,
}

const initialState: groupsByIdState = {
isAuth : false,
isLoading : false,
groupsById : [],
error : "",
}

export const groupsByIdSlice = createSlice({
name: 'groupsById',
initialState,
reducers: {
    clearErrors(state) {
        state.error = "";
      }
},
extraReducers: (builder) => {
    builder.addCase(getGroupsOnIdDiscipline.pending.type, (state) => {
    state.isLoading = true;
    }),
    builder.addCase(getGroupsOnIdDiscipline.fulfilled.type, (state, action: PayloadAction<IGroupsByiD[]>) => {
    state.isLoading = false;
    state.error = "";
    state.groupsById = action.payload
    state.isAuth = true;
    }),
    builder.addCase(getGroupsOnIdDiscipline.rejected.type, (state, action: PayloadAction<string>) => {
    state.isLoading = false;
    state.error = action.payload;
    });

    builder.addCase(deleteLink.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
        });
}
})

export default groupsByIdSlice.reducer