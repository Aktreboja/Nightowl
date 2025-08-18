'use client';
import { SpotifyLoginButton } from './SpotifyLoginButton';
import { useSpotify } from '../_utils/Spotify/SpotifyContext';

const Landing = () => {
  const { isAuthenticated } = useSpotify();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-4">
      <div className="text-center text-white max-w-md mx-auto">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Nightowl
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Discover your music taste and create amazing playlists
        </p>

        {!isAuthenticated ? (
          <SpotifyLoginButton
            clientId={process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!}
            redirectUri={process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL!}
            className="w-full"
          />
        ) : (
          <div className="text-center">
            <p className="text-green-400 mb-4">✓ Connected to Spotify</p>
            <a
              href="/profile"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              View Profile
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
