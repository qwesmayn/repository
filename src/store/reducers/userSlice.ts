    import { createSlice } from '@reduxjs/toolkit'
    import type { PayloadAction } from '@reduxjs/toolkit'
    import { Login } from '../action_creators/actionCreatos';
    import { IUser } from '../../models/IUser';

    export interface userState {
    isAuth : boolean,
    isLoading : boolean,
    user : IUser[],
    error : string,
    }

    const initialState: userState = {
    isAuth : false,
    isLoading : false,
    user : [],
    error : "",
    }

    export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(Login.pending.type, (state) => {
        state.isLoading = true;
        }),
        builder.addCase(Login.fulfilled.type, (state, action: PayloadAction<IUser[]>) => {
        state.isLoading = false;
        state.error = "";
        state.user = action.payload
        state.isAuth = true;
        debugger
        }),
        builder.addCase(Login.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
        });
    }
    })

    export default userSlice.reducer