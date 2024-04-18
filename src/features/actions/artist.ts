import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetSeveralArtists, GetTopArtists } from '@/utils/Spotify/Artists';
import { TopItems } from '../../../spotify_api';

// Async Thunks to fetch selected Item metadata
export const fetchSelectedArtists = createAsyncThunk(
  'music/fetchSelectedArtists',
  async (payload: { access_token: string; ids: string[] }, thunkAPI) => {
    const response = await GetSeveralArtists(payload.access_token, payload.ids);
    return response;
  },
);

export const fetchArtists = createAsyncThunk(
  'music/fetchArtists',
  async (payload: { access_token: string; time_range: string }, thunkAPI) => {
    const { access_token, time_range } = payload;
    const response: TopItems = await GetTopArtists(access_token, time_range);
    return response.items;
  },
);
