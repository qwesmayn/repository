import { createSlice } from '@reduxjs/toolkit'

export interface userState {
isLoading : boolean,
error : string,
}

const initialState: userState = {
isLoading : false,
error : "",
}

export const userSlice = createSlice({
name: 'user',
initialState,
reducers: {},
})

export default userSlice.reducer