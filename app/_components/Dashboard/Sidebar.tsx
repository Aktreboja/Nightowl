'use client';
import { useSpotify } from '@/app/_utils/Spotify/SpotifyContext';
import Image from 'next/image';
import Link from 'next/link';
const Sidebar = () => {
  const { user } = useSpotify();
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      {/* Add your sidebar content here */}
      <nav className="space-y-4 flex flex-col justify-between h-full">
        <div className="text-xl font-bold mb-6">Nightowl</div>
        <ul className="space-y-2 text-center">
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          {/* <li>Playlists</li> */}
          {/* Add more navigation items as needed */}
        </ul>
        <div className="flex items-center justify-center gap-2 cursor-pointer">
          {user?.images[0]?.url && (
            <Image
              src={user.images[0].url}
              alt="Profile Picture"
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <div className="text-md font-semibold">{user?.display_name}</div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
