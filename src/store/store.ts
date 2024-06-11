import studentByIdReducer from './reducers/studentByIdSlice';
import materialReducer from './reducers/materialSlice';
import groupsByIdReducer from './reducers/GroupByIdSlice';
import disciplineReducer from './reducers/disciplineSlice';
import groupReducer from './reducers/groupSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'
import userManageReducer from './reducers/userManageSlice'


const rootReducer = combineReducers({
    userReducer,
    userManageReducer,
    groupReducer,
    disciplineReducer,
    groupsByIdReducer,
    materialReducer,
    studentByIdReducer
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch