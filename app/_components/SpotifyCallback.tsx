'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { exchangeCodeForToken } from '../_utils/Spotify/auth';
import { useSpotify } from '../_utils/Spotify/SpotifyContext';

export const SpotifyCallback: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const { setTokens } = useSpotify();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        console.log('Callback received:', { code: !!code, error });

        if (error) {
          setError(`Authorization failed: ${error}`);
          setStatus('error');
          return;
        }

        if (!code) {
          setError('No authorization code received');
          setStatus('error');
          return;
        }

        // Get stored code verifier
        const codeVerifier = localStorage.getItem('spotify_code_verifier');
        console.log('Code verifier found:', !!codeVerifier);

        if (!codeVerifier) {
          setError('No code verifier found');
          setStatus('error');
          return;
        }

        // Check environment variables
        const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL;

        console.log('Environment variables:', {
          clientId: !!clientId,
          redirectUri: !!redirectUri,
          redirectUriValue: redirectUri,
        });

        if (!clientId) {
          setError('Missing client ID');
          setStatus('error');
          return;
        }

        // Exchange code for token
        console.log('Exchanging code for token...');
        const tokenResponse = await exchangeCodeForToken(
          code,
          codeVerifier,
          clientId,
          redirectUri as string
        );


        console.log('Token response received:', {
          accessToken: !!tokenResponse.access_token,
          refreshToken: !!tokenResponse.refresh_token,
        });

        // Store tokens in context and localStorage
        setTokens(tokenResponse.access_token, tokenResponse.refresh_token);
        localStorage.setItem('access_token', tokenResponse.access_token);
        if (tokenResponse.refresh_token) {
          localStorage.setItem('refresh_token', tokenResponse.refresh_token);
        }

        // Clear code verifier
        localStorage.removeItem('spotify_code_verifier');

        setStatus('success');

        // Redirect to profile page after a short delay
        setTimeout(() => {
          router.push('/profile');
        }, 1500);
      } catch (err) {
        console.error('Callback error:', err);
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
        setStatus('error');
      }
    };

    handleCallback();
  }, [router, setTokens]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">
            Connecting to Spotify...
          </h2>
          <p className="text-gray-400">
            Please wait while we complete your authentication
          </p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center text-white max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Authentication Failed</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="text-center text-white">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">Successfully Connected!</h2>
        <p className="text-gray-400">Redirecting to your profile...</p>
      </div>
    </div>
  );
};
