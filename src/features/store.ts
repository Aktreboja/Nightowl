'use client';
import { configureStore } from '@reduxjs/toolkit';
import PreviewReducer from './reducers/MusicReducer';
import AuthReducer from './reducers/AuthReducer';
import UserReducer from './reducers/UserReducer';
import PlaylistReducer from './reducers/PlaylistReducer';
// import storage from 'redux-persist/lib/storage'

// const persistConfig = {
//     key: "root",
//     storage
// }

// Change this to user Reducer
// const persistedUserReducer = persistReducer(persistConfig, UserReducer)

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: UserReducer,
      music: PreviewReducer,
      auth: AuthReducer,
      playlist: PlaylistReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Inferring types from the store
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
