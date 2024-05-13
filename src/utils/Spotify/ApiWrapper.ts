/**
 * Spotify API wrapper object.
 * @function {fetch} fetches the Spotify API with given endpoint and headers
 */
const spotifyApi = {
  // Fetch function
  async fetch(
    url: string,
    options: RequestInit,
    headers: HeadersInit,
  ): Promise<Response> {
    const response = await this.fetch(url, { ...options }, { ...headers });

    // If the access token is expired
    if (response.status === 401) {
      // const newAccessToken = await this.refreshAccessToken();

      if (true) {
      } else {
        console.log('Refresh token is expired or invalid');
      }
    }

    return response;
  },

  // Refresh token Utility function
  async refreshAccessToken(refresh_token: string): Promise<string | null> {
    try {
      const response = await fetch('REFRESH TOKEN ENDPOINT HERE', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
          grant_type: 'refresh_token',
          refresh_token: refresh_token,
        }),
      });
      if (!response.ok) throw new Error('Failed to refresh access token');

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.log('Error refreshing access token: ', error);
      return null;
    }
  },
};

export default spotifyApi;
