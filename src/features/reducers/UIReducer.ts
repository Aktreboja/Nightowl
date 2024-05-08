import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UIProps {
  toastMessage: string;
  interactable: boolean;
}

const initialState: UIProps = {
  toastMessage: '',
  interactable: false,
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
    setInteractable: (state, action: PayloadAction<boolean>) => {
      state.interactable = action.payload;
    },
  },
});

export const getToastMessage = (state: RootState) => state.UI.toastMessage;
export const getInteractable = (state: RootState) => state.UI.interactable;

export const { clearToastMessage, setToastMessage, setInteractable } =
  UIReducer.actions;
export default UIReducer.reducer;
