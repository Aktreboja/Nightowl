import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '@spotify/web-api-ts-sdk';
import { getUserData } from '@/utils/Spotify/Users';
import { RootState } from '../store';

interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  view: string;
}

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
  view: 'Top Stats',
};

// Asynchronous function to get the user.
const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (access_token: string, thunkApi) => {
    const response = await getUserData(access_token);
    return response;
  },
);

const UserReducer = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setView: (state, action: PayloadAction<string>) => {
      state.view = action.payload;
    },
  },
  extraReducers(builder) {
    // Case that will be one of the three thunk states (fulfilled, loading, error)
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    }),
      builder.addCase(fetchUser.rejected, (state, action) => {
        state.error = 'Fetching Users Error';
      });
  },
});

// Selectors for User
export const getUser = (state: RootState) => state.user.user;
export const getView = (state: RootState) => state.user.view;

export const { setUser, setView } = UserReducer.actions;
export default UserReducer.reducer;
