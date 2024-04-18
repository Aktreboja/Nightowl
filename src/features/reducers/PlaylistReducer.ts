import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Playlist, Track } from '@spotify/web-api-ts-sdk';
import { RootState } from '../store';
import { getUserPlaylists } from '../actions/playlist';

interface PlaylistMetadata {
  name: string;
  description: string;
}

interface PlaylistState {
  queue: Track[];
  playlistMeta: PlaylistMetadata;
  playlists: Playlist[];
}

const initialState: PlaylistState = {
  queue: [],
  playlistMeta: {
    name: '',
    description: '',
  },
  playlists: [],
};

const PlaylistReducer = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    updatePlaylistName: (state, action: PayloadAction<string>) => {
      state.playlistMeta.name = action.payload;
    },
    updatePlaylistDescription: (state, action: PayloadAction<string>) => {
      state.playlistMeta.description = action.payload;
    },
    addTrackToQueue: (state, action: PayloadAction<Track>) => {
      const existingTrack = state.queue.find(
        (track) => track.id === action.payload.id,
      );
      if (existingTrack) {
        console.log('Track Already exists!');
      } else {
        state.queue.push(action.payload);
      }
    },
    removeTrackFromQueue: (state, action: PayloadAction<Track>) => {
      const updatedQueue = state.queue;
      const removedIndex = state.queue.findIndex(
        (track) => track.id === action.payload.id,
      );
      updatedQueue.splice(removedIndex, 1);
      state.queue = updatedQueue;
    },
    clearTrackQueue: (state) => {
      state.queue = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getUserPlaylists.fulfilled,
      (state, action: PayloadAction<Playlist[]>) => {
        state.playlists = action.payload;
      },
    );
  },
});

export const getTrackQueue = (state: RootState) => state.playlist.queue;
export const getQueueCount = (state: RootState) => state.playlist.queue.length;

// Playlist Selectors
export const getPlaylists = (state: RootState) => state.playlist.playlists;

export const {
  addTrackToQueue,
  clearTrackQueue,
  removeTrackFromQueue,
  updatePlaylistDescription,
  updatePlaylistName,
} = PlaylistReducer.actions;
export default PlaylistReducer.reducer;
