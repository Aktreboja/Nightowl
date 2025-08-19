'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Landing from '@/app/_components/Landing';
import { useSpotify } from '@/app/_utils/Spotify/SpotifyContext';
const Home = () => {
  const { isAuthenticated, user } = useSpotify();
  const router = useRouter();

  useEffect(() => {
    // If authenticated and user data is loaded, redirect to profile
    if (isAuthenticated && user) {
      router.push('/profile');
    }
  }, [isAuthenticated, user, router]);

  // Show loading while redirecting
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Redirecting to profile...</p>
        </div>
      </div>
    );
  }

  return <Landing />;
};

export default Home;
