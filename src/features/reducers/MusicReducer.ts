import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track, Artist, Album, SimplifiedTrack } from '@spotify/web-api-ts-sdk';
import { RootState } from '../store';
import { checkForSaved, fetchSimilarTracks } from '../actions/track';
import { fetchArtists, fetchSelectedArtists } from '../actions/artist';

// Selected Item State
interface SelectedState {
  selectedItem: Artist | Track | Album | null;
  saved: boolean;
  followed: boolean;
  selectedArtists: Artist[];
  similarTracks: Track[];
  artistTopTracks: Track[];
  relatedArtists: Artist[];
  artistAlbums: Album[];
  albumTracks: SimplifiedTrack[];
}

interface PreviewState {
  preview: Track | Artist | Album | null;
  preview_url: string;
  tracks: Track[];
  artists: Artist[];
  time_range: 'short_term' | 'medium_term' | 'long_term';
  view_tab: string;
  selected: SelectedState;
}

const initialState: PreviewState = {
  preview: null,
  preview_url: '',
  tracks: [],
  artists: [],
  time_range: 'medium_term',
  view_tab: 'Tracks',
  selected: {
    selectedItem: null,
    saved: false,
    selectedArtists: [],
    similarTracks: [],
    followed: false,
    artistTopTracks: [],
    relatedArtists: [],
    artistAlbums: [],
    albumTracks: [],
  },
};

const MusicReducer = createSlice({
  name: 'Music',
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selected.selectedItem = null;
    },
    setPreview: (
      state,
      action: PayloadAction<Track | Artist | Album | null>,
    ) => {
      state.preview = action.payload;
    },
    setTracks: (state, action: PayloadAction<Track[]>) => {
      state.tracks = action.payload;
    },
    setArtists: (state, action: PayloadAction<Artist[]>) => {
      state.artists = action.payload;
    },
    setTimeRange: (
      state,
      action: PayloadAction<'short_term' | 'medium_term' | 'long_term'>,
    ) => {
      state.time_range = action.payload;
    },
    setPreviewUrl: (state, action: PayloadAction<string>) => {
      state.preview_url = action.payload;
    },
    setSelected: (
      state,
      action: PayloadAction<Track | Artist | Album | null>,
    ) => {
      state.selected.selectedItem = action.payload;
    },
    setSaved: (state, action: PayloadAction<boolean>) => {
      state.selected.saved = action.payload;
    },
    setSelectedArtists: (state, action: PayloadAction<Artist[]>) => {
      state.selected.selectedArtists = action.payload;
    },
    setSimilarTracks: (state, action: PayloadAction<Track[]>) => {
      state.selected.similarTracks = action.payload;
    },
    setArtistTopTracks: (state, action: PayloadAction<Track[]>) => {
      state.selected.artistTopTracks = action.payload;
    },
    setRelatedArtists: (state, action: PayloadAction<Artist[]>) => {
      state.selected.relatedArtists = action.payload;
    },
    setArtistAlbums: (state, action: PayloadAction<Album[]>) => {
      state.selected.artistAlbums = action.payload;
    },
    setAlbumTracks: (state, action: PayloadAction<SimplifiedTrack[]>) => {
      state.selected.albumTracks = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSelectedArtists.fulfilled, (state, action) => {
      state.selected.selectedArtists = action.payload as Artist[];
    }),
      builder.addCase(fetchSelectedArtists.rejected, (state, action) => {
        console.error("Unable to fetch selected item's Artists.");
      }),
      builder.addCase(
        checkForSaved.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          state.selected.saved = action.payload;
        },
      ),
      builder.addCase(fetchSimilarTracks.fulfilled, (state, action) => {
        state.selected.similarTracks = action.payload;
      }),
      builder.addCase(fetchArtists.fulfilled, (state, action) => {
        state.artists = action.payload as Artist[];
      });
  },
});

/**
 * Selectors for Music Reducer state
 */

// Preview component State
export const getPreview = (state: RootState) => state.music.preview;
export const getPreviewUrl = (state: RootState) => state.music.preview_url;

// Selectors for table view
export const getTracks = (state: RootState) => state.music.tracks;
export const getArtists = (state: RootState) => state.music.artists;
export const getTimeRange = (state: RootState) => state.music.time_range;

// Selected Item state
export const getSelected = (state: RootState) =>
  state.music.selected.selectedItem;
export const getSelectedArtists = (state: RootState) =>
  state.music.selected.selectedArtists;
export const getSimilarTracks = (state: RootState) =>
  state.music.selected.similarTracks;
export const getIsSaved = (state: RootState) => state.music.selected.saved;

// Selectors for artists view
export const getArtistsTopTracks = (state: RootState) =>
  state.music.selected.artistTopTracks;
export const getRelatedArtists = (state: RootState) =>
  state.music.selected.relatedArtists;
export const getArtistsAlbums = (state: RootState) =>
  state.music.selected.artistAlbums;

export const getAlbumTracks = (state: RootState) =>
  state.music.selected.albumTracks;

// Exports for usage in other files
export const {
  setPreview,
  setTracks,
  setArtists,
  setTimeRange,
  setPreviewUrl,
  setSelected,
  setSaved,
  setSelectedArtists,
  setSimilarTracks,
  setArtistTopTracks,
  setRelatedArtists,
  setArtistAlbums,
  setAlbumTracks,
  clearSelected,
} = MusicReducer.actions;

export default MusicReducer.reducer;
