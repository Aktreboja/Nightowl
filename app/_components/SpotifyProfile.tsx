'use client';

import { Button } from './ui/button';
import { useSpotify } from '../_utils/Spotify/SpotifyContext';
import { useRouter } from 'next/navigation';

export const SpotifyProfile: React.FC = () => {
  const { user, logout, isAuthenticated } = useSpotify();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to Nightowl</h1>
          <p className="text-gray-600 mb-8">
            Connect with Spotify to view your profile
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Nightowl</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black"
          >
            Sign Out
          </Button>
        </div>

        {/* Profile Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-6">
            {user.images && user.images.length > 0 ? (
              <img
                src={user.images[0].url}
                alt={user.display_name}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold">{user.display_name}</h2>
              <p className="text-gray-400">{user.email}</p>
              <p className="text-sm text-gray-500">User ID: {user.id}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <p className="text-xl font-semibold">Connected</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Account Type</p>
                <p className="text-xl font-semibold">Spotify</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Library</p>
                <p className="text-xl font-semibold">Ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold mb-2">Welcome to Nightowl!</h3>
          <p className="text-gray-400">
            Your Spotify profile is now connected. You can explore your music
            library, create playlists, and discover new music recommendations.
          </p>
        </div>
      </div>
    </div>
  );
};
