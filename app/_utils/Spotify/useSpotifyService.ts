import { useState, useEffect } from 'react';
import { spotifyService, TimeRange, TopItemsData } from './SpotifyService';
import { Artist, Track, User, Page } from '@spotify/web-api-ts-sdk';

interface UseSpotifyServiceReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching user's top items (artists and tracks)
 */
export function useTopItems(
  timeRange: TimeRange,
  limit: number = 20
): UseSpotifyServiceReturn<TopItemsData> {
  const [data, setData] = useState<TopItemsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!accessToken || !refreshToken) {
      setError('No access token available');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await spotifyService.getTopItems(
        accessToken,
        refreshToken,
        timeRange,
        limit
      );
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timeRange, limit]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Custom hook for fetching user's top artists
 */
export function useTopArtists(
  timeRange: TimeRange = 'medium_term',
  limit: number = 20
): UseSpotifyServiceReturn<Page<Artist>> {
  const [data, setData] = useState<Page<Artist> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!accessToken || !refreshToken) {
      setError('No access token available');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await spotifyService.getTopArtists(
        accessToken,
        refreshToken,
        {
          time_range: timeRange,
          limit,
        }
      );
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch artists');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timeRange, limit]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Custom hook for fetching user's top tracks
 */
export function useTopTracks(
  timeRange: TimeRange = 'medium_term',
  limit: number = 20
): UseSpotifyServiceReturn<Page<Track>> {
  const [data, setData] = useState<Page<Track> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!accessToken || !refreshToken) {
      setError('No access token available');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await spotifyService.getTopTracks(
        accessToken,
        refreshToken,
        {
          time_range: timeRange,
          limit,
        }
      );
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tracks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timeRange, limit]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Custom hook for fetching current user profile
 */
export function useCurrentUser(): UseSpotifyServiceReturn<User> {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!accessToken || !refreshToken) {
      setError('No access token available');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await spotifyService.getCurrentUser(
        accessToken,
        refreshToken
      );
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch user profile'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}
