import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Playlist, Track, TrackItem } from '@spotify/web-api-ts-sdk';
import { RootState } from '../store';

interface PlaylistMetadata {
  name: string;
  description: string;
}

interface PlaylistState {
  queue: Track[];
  playlistMeta: PlaylistMetadata;
  playlists: Playlist<TrackItem>[];
  selectedPlaylist: Playlist<TrackItem> | null;
  searchResults: Track[];
}

const initialState: PlaylistState = {
  queue: [],
  playlistMeta: {
    name: '',
    description: '',
  },
  playlists: [],
  searchResults: [],
  selectedPlaylist: null,
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
    updateSearchResults: (state, action: PayloadAction<Track[]>) => {
      state.searchResults = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearSelectedPlaylist: (state) => {
      state.selectedPlaylist = null;
    },
    updatePlaylists: (state, action: PayloadAction<Playlist<TrackItem>[]>) => {
      state.playlists = action.payload;
    },
    updateSelectedPlaylist: (
      state,
      action: PayloadAction<Playlist<TrackItem>>,
    ) => {
      state.selectedPlaylist = action.payload;
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
  // extraReducers(builder) {
  //   builder.addCase(
  //     getUserPlaylists.fulfilled,
  //     (state, action: PayloadAction<Playlist[]>) => {
  //       state.playlists = action.payload;
  //     },
  //   );
  // },
});

export const getTrackQueue = (state: RootState) => state.playlist.queue;
export const getQueueCount = (state: RootState) => state.playlist.queue.length;

// Playlist Selectors
export const getPlaylists = (state: RootState) => state.playlist.playlists;
export const getSelectedPlaylist = (state: RootState) =>
  state.playlist.selectedPlaylist;
export const getSearchResults = (state: RootState) =>
  state.playlist.searchResults;

export const {
  addTrackToQueue,
  clearTrackQueue,
  removeTrackFromQueue,
  updatePlaylists,
  updateSelectedPlaylist,
  clearSelectedPlaylist,
  updatePlaylistDescription,
  updatePlaylistName,
  updateSearchResults,
  clearSearchResults,
} = PlaylistReducer.actions;
export default PlaylistReducer.reducer;
