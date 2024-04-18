import QueueCard from '@/app/Dashboard/_Components/QueueCard';
import { getUserPlaylists } from '@/features/actions/playlist';
import { useAppSelector } from '@/features/hooks';
import { checkToken } from '@/features/reducers/AuthReducer';
import { getTrackQueue } from '@/features/reducers/PlaylistReducer';
import { saveSpotifyTracks } from '@/utils/Spotify/Tracks';

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
    <section className="mx-3 min-h-screen relative flex items-center">
      <div className="rounded-sm w-full max-w-2xl mx-auto px-4 py-2 bg-white h-fit  ">
        <h1 className="w-full text-center text-xl font-bold my-3">
          Your New Tracks
        </h1>
        <div className=" px-1 h-[80vh] max-h-[800px] md:h-[800px] md:4/5 overflow-y-auto">
          {queue.length > 0 ? (
            queue.map((track, key) => (
              <div className="my-2" key={key}>
                <QueueCard track={track} />
              </div>
            ))
          ) : (
            <div className="text-center h-full flex justify-center items-center">
              <p className="text-lg font-semibold">
                No Tracks Yet, Add from the Top Stats Tab
              </p>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row justify-center my-3">
          <button
            className="my-1 px-3 py-2 mx-2 bg-button-secondary rounded-sm font-semibold"
            onClick={() => saveTrackHandler()}
          >
            Save Tracks
          </button>
          {/* <button className="my-1 px-3 py-2 mx-2 bg-button-primary text-white font-semibold rounded-sm">Add To Playlist</button>
                    <button className="my-1 px-3 py-2 mx-2 bg-button-primary text-white font-semibold rounded-sm">Recommend Playlist</button> */}
        </div>
      </div>
    </section>
  );
};

export default PlaylistContainer;
