'use client'

//  Notes on client and server components in next
//  https://nextjs.org/docs/app/building-your-application/rendering/client-components

import Image from 'next/image'
import { TokenResponse } from '../../types';

import Landing from '@/pages/Landing';
import Dashboard from '@/pages/Dashboard';
import currentToken from '@/utils/TokenService';
import { useEffect, useState } from 'react';
import { loginWithSpotifyClick, getToken, isValidTokenResponse } from '@/utils/Spotify/Spotify';

export default function Home() {

  const [auth, setAuth] = useState(false)

  useEffect(() => {
    const checkToken = async () => {
      const args = new URLSearchParams(window.location.search);
      const code = args.get('code');
      if (code) {
        const token = await getToken(code)

        if (isValidTokenResponse(token)) {
          currentToken.save(token);

          // Remove code from URL so we can refresh correctly.
          const url = new URL(window.location.href);
          url.searchParams.delete("code");
      
          const updatedUrl = url.search ? url.search : url.href.replace('?', '');
          window.history.replaceState({}, document.title, updatedUrl);
          setAuth(true);
        } else {
          console.error("Invalid token Response");
        }

      }
    }
    checkToken();
  }, [])
  
  return (
    <main>
      {auth ? 
        <Dashboard /> :  
        <Landing />
      }
    </main>
  )
}
