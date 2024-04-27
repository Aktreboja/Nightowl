import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  toastMessage: '',
};

const UIReducer = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setToastMessage: (state, action: PayloadAction<string>) => {
      state.toastMessage = action.payload;
    },
    clearToastMessage: (state) => {
      state.toastMessage = '';
    },
  },
});

export const getToastMessage = (state: RootState) => state.UI.toastMessage;

export const { clearToastMessage, setToastMessage } = UIReducer.actions;
export default UIReducer.reducer;
