import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { deleteDisciplines, getDisciplines} from '../action_creators/actionCreatos';
import { IDiscipline } from '../../models/IDiscipline';

export interface disciplineState {
isLoading : boolean,
disciplines : IDiscipline[],
error : string,
}

const initialState: disciplineState = {
isLoading : false,
disciplines : [],
error : "",
}

export const disciplineSlice = createSlice({
name: 'disciplines',
initialState,
reducers: {},
extraReducers: (builder) => {
    // обработка получения 
    builder.addCase(getDisciplines.pending.type, (state) => {
    state.isLoading = true;
    }),
    builder.addCase(getDisciplines.fulfilled.type, (state, action: PayloadAction<IDiscipline[]>) => {
    state.isLoading = false;
    state.error = "";
    state.disciplines = action.payload
    }),
    builder.addCase(getDisciplines.rejected.type, (state, action: PayloadAction<string>) => {
    state.isLoading = false;
    state.error = action.payload;
    });

    // обработка удаления 
    builder.addCase(deleteDisciplines.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
        });
}
})

export default disciplineSlice.reducer