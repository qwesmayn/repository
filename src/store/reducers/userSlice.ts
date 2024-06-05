import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuth, Login, studentLogin} from "../action_creators/actionCreatos";
import { IUser } from "../../models/IUser";

export interface userState {
  isAuth: boolean;
  isLoading: boolean;
  user: IUser | null;
  error: string | null;
  language: string;
}

const initialState: userState = {
  isAuth: false,
  isLoading: false,
  user: null,
  error: null,
  language: localStorage.getItem("language") || "ua",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Авторизация администратора
    builder.addCase(Login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(Login.fulfilled, (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(Login.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Авторизация студента
    builder.addCase(studentLogin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(studentLogin.fulfilled, (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(studentLogin.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Проверка авторизации
    builder.addCase(getAuth.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getAuth.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
        state.isAuth = true;
      }
    );
    builder.addCase(getAuth.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setAuth, setLanguage } = userSlice.actions;

export default userSlice.reducer;
