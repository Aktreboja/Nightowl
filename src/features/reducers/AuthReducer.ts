import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token } from '../../../types';
import { RootState } from '../store';

interface AuthState {
  auth: boolean;
  token: Token | null;
  code_verifier: string | null;
}

const initialState: AuthState = {
  auth: false,
  token: null,
  code_verifier: null,
};

const AuthReducer = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<Token | null>) => {
      state.token = action.payload;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
    setCodeVerifier: (state, action: PayloadAction<string>) => {
      state.code_verifier = action.payload;
    },
  },
});

export const checkAuth = (state: RootState) => state.auth.auth;
export const checkToken = (state: RootState) => state.auth.token;
export const getCodeVerifier = (state: RootState) => state.auth.code_verifier;

export const { setAuth, setToken, setCodeVerifier } = AuthReducer.actions;
export default AuthReducer.reducer;
