import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetUserPlaylists } from '@/utils/Spotify/Playlists';

/**
 * Gets User Playlsits
 */
export const getUserPlaylists = createAsyncThunk(
  'music/getUserPlaylists',
  async (access_token: string, thunkAPI) => {
    const response = await GetUserPlaylists(access_token);
    console.log(response);
    return response;
  },
);
