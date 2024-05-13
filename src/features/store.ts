'use client';
import { configureStore } from '@reduxjs/toolkit';
import PreviewReducer from './reducers/MusicReducer';
import AuthReducer from './reducers/AuthReducer';
import UserReducer from './reducers/UserReducer';
import PlaylistReducer from './reducers/PlaylistReducer';
import UIReducer from './reducers/UIReducer';

// @ts-ignore
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

// Change this to user Reducer
const persistedReducer = persistReducer(persistConfig, AuthReducer);

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: UserReducer,
      music: PreviewReducer,
      auth: persistedReducer,
      playlist: PlaylistReducer,
      UI: UIReducer,
    },
  });
};

export const store = makeStore();
export const persistor = persistStore(store);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Inferring types from the store
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
