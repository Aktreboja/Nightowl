'use client';
import { SyntheticEvent, useEffect, useState } from 'react';
import { searchTracks } from '@/utils/Spotify/Search';
import { checkToken } from '@/features/reducers/AuthReducer';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { Track } from '@spotify/web-api-ts-sdk';
import {
  clearSearchResults,
  updateSearchResults,
} from '@/features/reducers/PlaylistReducer';

export default function RecommendSearchInput() {
  const [searchInput, setSearchInput] = useState('');
  const [finalInput, setFinalInput] = useState('');

  const dispatch = useAppDispatch();

  const token = useAppSelector(checkToken);

  // Debouncing useEffect to be able to search for tracks.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFinalInput(searchInput);
    }, 700);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    const searchHandler = async () => {
      if (token && finalInput.length > 0) {
        const { access_token } = token;
        const response = await searchTracks(access_token, finalInput);
        if (response.tracks)
          dispatch(updateSearchResults(response.tracks.items));
      } else {
        dispatch(clearSearchResults());
      }
    };
    searchHandler();
  }, [finalInput, token, dispatch]);

  return (
    <input
      placeholder="Blinding Lights"
      className="border px-2 py-3 w-full rounded-sm"
      onChange={(e) => setSearchInput(e.target.value)}
    />
  );
}
