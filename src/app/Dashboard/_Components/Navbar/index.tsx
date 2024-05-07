import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { User } from '@spotify/web-api-ts-sdk';
import { logoutClick } from '@/utils/Spotify/Spotify';
import { getUser, getView, setView } from '@/features/reducers/UserReducer';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { getQueueCount } from '@/features/reducers/PlaylistReducer';
import { setSelected } from '@/features/reducers/MusicReducer';

const Navbar = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(getUser);
  const currentView = useAppSelector(getView);
  const queueCount = useAppSelector(getQueueCount);

  const [settings, setSettings] = useState(false);
  const settingsRef = useRef<HTMLImageElement>(null);

  // UseEffect to handle out of click bounds for Profile
  useEffect(() => {
    const handleClickOutsideBounds = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      )
        setSettings(false);
    };
    document.addEventListener('mousedown', handleClickOutsideBounds);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideBounds);
    };
  });

  // View Change on-click Handler
  const handleViewChange = (newView: string) => {
    dispatch(setSelected(null));
    dispatch(setView(newView));
  };

  if (!user) return null;
  const { display_name, images } = user as User;

  return (
    <nav className="fixed top-0 shadow-xl w-full h-14 z-40 overflow-hidden bg-secondary text-white flex items-center justify-between">
      <div className="h-full w-fit flex  items-center">
        <h1 className="px-4 font-bold">Nightowl</h1>
      </div>
      <div className="hidden md:flex ">
        <p
          className={`${currentView === 'Top Stats' && 'underline'} px-4 cursor-pointer font-semibold hover:underline`}
          onClick={() => handleViewChange('Top Stats')}
        >
          Top Stats
        </p>
        <div className="relative">
          <p
            className={`${currentView === 'Playlists' && 'underline'} px-4 cursor-pointer font-semibold hover:underline relative`}
            onClick={() => handleViewChange('Playlists')}
          >
            Playlist
          </p>
          {queueCount > 0 && (
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              {queueCount}
            </div>
          )}
        </div>
        <p
          className={`${currentView === 'Recommend' && 'underline'} px-4 cursor-pointer font-semibold hover:underline`}
          onClick={() => handleViewChange('Recommend')}
        >
          Recommend
        </p>
      </div>
      <div className="w-fit px-5">
        <div className="flex items-center">
          <p className="px-3 font-semibold">{display_name}</p>
          <Image
            src={images[1].url}
            alt={display_name}
            width={35}
            height={35}
            style={{ borderRadius: '50%', cursor: 'pointer' }}
            onClick={() => setSettings(!settings)}
          />
        </div>
      </div>
      {settings && (
        <div
          className="fixed top-16 right-1 w-60 h-fit z-40 rounded-md bg-white text-black shadow-lg"
          ref={settingsRef}
        >
          <div className="max-md:block hidden">
            <button
              type="button"
              onClick={() => handleViewChange('Top Stats')}
              className={`${currentView === 'Top Stats' && 'bg-button-primary text-white'} text-center py-2 w-full font-semibold hover:bg-button-primary hover:text-white duration-75 rounded-t-md`}
            >
              Top Stats
            </button>
            <button
              type="button"
              onClick={() => handleViewChange('Playlists')}
              className={`${currentView === 'Playlists' && 'bg-button-primary text-white'} text-center py-2 w-full font-semibold hover:bg-button-primary hover:text-white duration-75`}
            >
              Playlist
            </button>
            <button
              type="button"
              onClick={() => handleViewChange('Recommend')}
              className={`${currentView === 'Recommend' && 'bg-button-primary text-white'} text-center py-2 w-full font-semibold hover:bg-button-primary hover:text-white duration-75`}
            >
              Recommend
            </button>
          </div>

          <button
            type="button"
            className=" text-center py-2 w-full font-semibold  hover:bg-button-primary hover:text-white duration-75 rounded-b-md"
            onClick={() => logoutClick()}
          >
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
