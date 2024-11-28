'use client';
import { useRef, useEffect } from 'react';
import TopStatsContainer from '@/app/Dashboard/_Containers/TopStatsContainer';
// Context components
import Navbar from '@/app/Dashboard/_Components/Navbar';

import { getPreviewUrl } from '@/features/reducers/MusicReducer';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { setUser } from '@/features/reducers/UserReducer';
import { getToastMessage, getView } from '@/features/reducers/UIReducer';
import { checkToken } from '@/features/reducers/AuthReducer';
import PlaylistContainer from '@/app/Dashboard/_Containers/PlaylistContainer';
import NotificationToast from '@/app/Dashboard/_Components/NotificationToast';
import RecommendationContainer from '@/app/Dashboard/_Containers/RecommendationContainer';
import useSpotify from '@/utils/Spotify/hooks/useSpotify';
import WelcomeComponent from '@/app/_Components/WelcomeComponent';
import { getInteractable } from '@/features/reducers/UIReducer';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  // App selectors for preview and User
  const token = useAppSelector(checkToken);
  const previewUrl = useAppSelector(getPreviewUrl);
  const view = useAppSelector(getView);
  const isInteractable = useAppSelector(getInteractable);
  const toastMessage = useAppSelector(getToastMessage);

  // UseRef is used here to bypass typescript checking / explicitly referencing the km
  const audioRef = useRef<HTMLAudioElement>(null);

  const { getUser } = useSpotify();

  // todo: useEffect to play music, refactor to fix errors
  useEffect(() => {
    if (previewUrl && audioRef.current) {
      audioRef.current.src = previewUrl;
      audioRef.current.volume = 0.1;
      audioRef.current.play();
    } else if (!previewUrl && audioRef.current) audioRef.current.pause();
  }, [previewUrl]);

  useEffect(() => {
    const retrieveUserData = async () => {
      if (token) {
        try {
          const response = await getUser();
          dispatch(setUser(response));
        } catch (error) {
          console.error('Error fetching user Data: ', (error as Error).message);
        }
      }
    };
    retrieveUserData();
  }, [dispatch, token, getUser]);

  return (
    <section className="w-full bg-primary relative">
      {/* Welcome Message */}
      {!isInteractable ? <WelcomeComponent /> : <Navbar />}

      <div className="mt-14">
        {/* Conditionals to render content */}
        {view === 'Top Stats' ? (
          <div className="ml-0 md:ml-7">
            <TopStatsContainer />
          </div>
        ) : view === 'Playlists' ? (
          <PlaylistContainer />
        ) : (
          <RecommendationContainer />
        )}

        {/* Single audio player */}
        <audio ref={audioRef} />

        {/* Notification Toast message for events within the Application */}
        {toastMessage && <NotificationToast message={toastMessage} />}
      </div>
    </section>
  );
};

export default Dashboard;
