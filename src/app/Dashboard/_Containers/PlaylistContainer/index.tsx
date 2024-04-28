import QueueCard from '@/app/Dashboard/_Components/QueueCard';
import { getUserPlaylists } from '@/features/actions/playlist';
import { useAppSelector } from '@/features/hooks';
import { checkToken } from '@/features/reducers/AuthReducer';
import { getTrackQueue } from '@/features/reducers/PlaylistReducer';
import { saveSpotifyTracks } from '@/utils/Spotify/Tracks';
import PlaylistListContainer from '../../_Components/PlaylistListContainer';

const PlaylistContainer = () => {
  const queue = useAppSelector(getTrackQueue);
  const token = useAppSelector(checkToken);

  const saveTrackHandler = async () => {
    const queueIds = [];
    for (let i = 0; i < queue.length; i++) {
      queueIds.push(queue[i].id);
    }

    if (token) {
      const { access_token } = token;
      await saveSpotifyTracks(access_token, queueIds);
      // await getUserPlaylists(access_token)
    }
  };

  return (
    <section className="mx-3 min-h-screen relative  flex items-center justify-center">
      {/* todo: Adjust height for regular / ultrawide screens */}
      <div className="rounded-sm w-full max-w-2xl flex flex-col justify-between px-4 py-2 bg-white h-3/4 max-h-[600px]  ">
        <h1 className="w-full text-center text-xl font-bold my-3">
          Your New Tracks
        </h1>
        <div className=" px-1 h-4/5 min-h-[400px] overflow-y-auto relative">
          {queue.length > 0 ? (
            queue.map((track, key) => (
              <div className="my-2" key={key}>
                <QueueCard track={track} />
              </div>
            ))
          ) : (
            <div className="text-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p className="text-lg font-semibold">
                No Tracks Yet, Add from the Top Stats Tab
              </p>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row justify-center my-3">
          <button
            className="my-1 px-3 py-2 md:mx-1 bg-button-secondary rounded-sm font-semibold"
            onClick={() => saveTrackHandler()}
          >
            Save Tracks
          </button>
          <button className="bg-button-primary text-white my-1 px-3 py-2">
            Add to Playlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlaylistContainer;
