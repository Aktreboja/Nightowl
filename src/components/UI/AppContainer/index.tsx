'use client';
import { useEffect, useState } from 'react';
import Dashboard from '@/app/dashboard/page';
import useSpotify from '@/utils/Spotify/hooks/useSpotify';
import Landing from '@/pages/Landing';
import LandingLoader from '@/components/UI/LandingLoader';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { checkAuth, setToken, setAuth } from '@/features/reducers/AuthReducer';

export default function AppContainer() {
  const dispatch = useAppDispatch();

  const auth = useAppSelector(checkAuth);
  // const token = useAppSelector(checkToken);

  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(false);

  // useSpotify Hook
  const { getAccessToken } = useSpotify();

  // useEffect for when a code urlSearchParam is present (retrieving access token).
  useEffect(() => {
    // Async function to validate user.
    const validateUser = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      // If redirect code exists in the query parameters
      // Retrieve the token and add it to redux store.
      if (code) {
        const token = await getAccessToken(code);
        if (token && 'expires_in' in token) {
          dispatch(setToken(token));
          dispatch(setAuth(true));
        }
        window.history.replaceState({}, '', window.location.pathname);
      }

      setTimeout(() => {
        setLoading(false);
      }, 1500);
    };

    validateUser();
  }, [getAccessToken, dispatch]);

  // UseEffect to resolve hydration errors
  useEffect(() => {
    setClient(true);
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
