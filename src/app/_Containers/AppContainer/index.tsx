'use client';
import { useEffect, useState } from 'react';
import Dashboard from '@/_pages/Dashboard';
import useSpotify from '@/utils/Spotify/hooks/useSpotify';
import Landing from '@/_pages/Landing';
import LandingLoader from '@/app/_Components/LandingLoader';
import { useAppDispatch, useAppSelector } from '@/features/hooks';

import {
  checkAuth,
  setToken,
  setAuth,
  checkToken,
} from '@/features/reducers/AuthReducer';

export default function AppContainer() {
  const dispatch = useAppDispatch();

  const auth = useAppSelector(checkAuth);
  const token = useAppSelector(checkToken);

  const [startedLoading, setStartedLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(false);

  // useSpotify Hook
  const { getAccessToken } = useSpotify();

  // Loading useEffect, fully loads once 'startedLoading' is set to True
  useEffect(() => {
    if (startedLoading) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [startedLoading]);

  // useEffect for when a code urlSearchParam is present (retrieving access token).
  useEffect(() => {
    // Async function to validate user.
    const validateUser = async (args: URLSearchParams) => {
      const code = args.get('code');
      // If redirect code exists in the query parameters
      // Retrieve the token and add it to redux store.
      if (code) {
        const token = await getAccessToken(code);
        if (token && 'expires_in' in token) {
          dispatch(setToken(token));
          dispatch(setAuth(true));
        }

        // Replace the url of the page to default route
        const url = new URL(window.location.href);
        url.searchParams.delete('code');
        const updatedUrl = url.search ? url.search : url.href.replace('?', '');
        window.history.replaceState({}, document.title, updatedUrl);
      }
    };

    // If url has query params, validate user
    const args = new URLSearchParams(window.location.search);
    if (args.size > 0) {
      validateUser(args);
    }

    setStartedLoading(true);
  }, [getAccessToken, dispatch]);

  // UseEffect to resolve hydration errors
  useEffect(() => {
    if (typeof window !== 'undefined') setClient(true);
  }, []);

  return (
    <div className="relative bg-primary w-full h-screen">
      <LandingLoader loading={loading} />
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${!loading ? 'opacity-100' : 'opacity-0'}`}
      >
        {auth && client ? <Dashboard /> : <Landing />}
      </div>
    </div>
  );
}
