import { useAppSelector } from '@/features/hooks';
import { getCodeVerifier } from '@/features/reducers/AuthReducer';

const useSpotifyApi = () => {
  const code_verifier = useAppSelector(getCodeVerifier);

  const request = async (endpoint: string): Promise<Response> => {
    const response = await fetch(endpoint);

    if (response.status === 401) {
      const newAccessToken = await refreshAccessToken('');
      if (newAccessToken) {
      } else {
        console.log('Refresh token is expired or invalid');
      }
    }
    return response;
  };

  const getAccessToken = async (code: string): Promise<any> => {
    try {
      if (code_verifier) {
        const response = await fetch(
          process.env.NEXT_PUBLIC_SPOTIFY_TOKEN_ENDPOINT as string,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: process.env
                .NEXT_PUBLIC_SPOTIFY_REDIRECT_URL as string,
              code_verifier: code_verifier || '',
            }),
          },
        );
        return await response.json();
      } else {
      }
    } catch (error) {
      console.error('Error Retrieving Access Token: ', error);
    }
  };

  const refreshAccessToken = async (
    refresh_token: string,
  ): Promise<string | null> => {
    try {
      const response = await fetch('/REfresh token Endpoint here', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
          grant_type: 'refresh_token',
          refresh_token: refresh_token,
        }),
      });

      if (!response.ok) throw new Error('Failed to refresh access token.');
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.log('Error refreshing access token: ', error);
      return null;
    }
  };

  return { getAccessToken, request, refreshAccessToken };
};

export default useSpotifyApi;
