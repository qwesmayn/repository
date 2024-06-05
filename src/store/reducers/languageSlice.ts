import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialLanguage: string = localStorage.getItem('language') || 'ua';

const languageSlice = createSlice({
  name: 'language',
  initialState: initialLanguage,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
