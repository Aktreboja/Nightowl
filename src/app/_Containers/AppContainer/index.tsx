'use client';
import { useEffect, useState } from 'react';
import { checkTokenExp } from '@/utils/TokenService';
import Dashboard from '@/_pages/Dashboard';
import { refreshToken } from '@/utils/Spotify/Spotify';
import { getToken } from '@/utils/Spotify/Spotify';
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
    const validateUser = async (args: URLSearchParams) => {
      const code = args.get('code');

      // Implement based on search query
      // if (code) {
      //   const token = await getToken(code);
      //   if (token) {
      //     dispatch(setToken(token));
      //     dispatch(setAuth(true));
      //   }
      // } else if (error) {
      //   console.error(error);
      // }

      if (code) {
        const token = await getAccessToken(code);
        console.log('token: ', token);
      }
    };

    // Check for any code directs
    const args = new URLSearchParams(window.location.search);
    if (args.size > 0) {
      validateUser(args);
    }

    // Replace the url of the page to default route
    const url = new URL(window.location.href);
    url.searchParams.delete('code');
    const updatedUrl = url.search ? url.search : url.href.replace('?', '');
    window.history.replaceState({}, document.title, updatedUrl);

    setStartedLoading(true);
  }, [dispatch, token, getAccessToken]);

  // UseEffect to resolve hydration errors
  useEffect(() => {
    if (typeof window !== 'undefined') setClient(true);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <LandingLoader loading={loading} />
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${!loading ? 'opacity-100' : 'opacity-0'}`}
      >
        {auth && client ? <Dashboard /> : <Landing />}
      </div>
    </div>
  );
}
