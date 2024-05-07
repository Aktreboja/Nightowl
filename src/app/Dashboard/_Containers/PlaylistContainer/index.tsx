import { useState, useEffect } from 'react';
import QueueCard from '@/app/Dashboard/_Components/QueueCard';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { checkToken } from '@/features/reducers/AuthReducer';
import {
  getPlaylists,
  getTrackQueue,
  updatePlaylists,
} from '@/features/reducers/PlaylistReducer';
import { saveSpotifyTracks } from '@/utils/Spotify/Tracks';
import { getUser } from '@/features/reducers/UserReducer';
import useSpotifyPlaylists from '@/utils/Spotify/hooks/useSpotifyPlaylists';
import Image from 'next/image';

const PlaylistContainer = () => {
  const queue = useAppSelector(getTrackQueue);
  const token = useAppSelector(checkToken);

  const user = useAppSelector(getUser);
  const playlists = useAppSelector(getPlaylists);

  const playlistsApi = useSpotifyPlaylists();

  const [addToPlaylist, setAddToPlaylist] = useState(false);
  const dispatch = useAppDispatch();

  // useEffect to fetch all of the user's playlists
  useEffect(() => {
    const fetchPlaylists = async () => {
      if (user) {
        const playlistResponse = await playlistsApi.fetchUserPlaylists(user.id);
        dispatch(updatePlaylists(playlistResponse));
      }
    };
    fetchPlaylists();
  }, [user]);

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

  // Create Playlist handler function
  const createPlaylistHandler = async () => {
    const testPlaylistCreation = {
      name: 'Test playlist',
    };
    if (user) {
      const response = await playlistsApi.createPlaylist(
        user.id,
        testPlaylistCreation,
      );
      console.log(response);
    }
  };

  if (!addToPlaylist)
    return (
      <section className="mx-3 min-h-screen relative  flex items-center justify-center">
        {/* todo: Adjust height for regular / ultrawide screens */}
        <div className="rounded-sm w-4/5 max-w-2xl flex flex-col justify-between px-4 py-2 bg-white h-3/4 max-h-[600px]  ">
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
              <div className="text-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5">
                <p className="max-lg:text-sm text-lg font-semibold ">
                  No Tracks Yet, Add from the Top Stats Tab
                </p>
              </div>
            )}
          </div>
          {/* Button Container */}
          <div className="w-full flex flex-row justify-center my-3">
            <div className="mx-1">
              <button
                className="my-1 px-3 py-2 md:mx-2 bg-button-secondary rounded-sm font-semibold hover:bg-button-primary hover:text-white duration-75"
                onClick={() => saveTrackHandler()}
              >
                Save Tracks
              </button>
            </div>

            <div className="mx-1">
              <button
                onClick={() => setAddToPlaylist(true)}
                className="bg-button-primary text-white my-1 px-3 py-2 hover:bg-button-secondary hover:text-black font-semibold duration-75"
              >
                Add to Playlist
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  else
    return (
      <section className="absolute w-full h-screen flex justify-center items-center bg-primary">
        <div className="max-lg:w-3/4 w-1/3 shadow-lg bg-white rounded-md py-4 min-h-[500px]">
          <h3 className=" text-center text-xl font-semibold">
            Add to Playlist
          </h3>

          <div className="w-4/5 mx-auto">
            {/* Create a new playlist form */}
            <form className="mx-auto">
              <div className="flex flex-col mb-2">
                <label className="font-semibold my-1">Name</label>
                <input
                  className="border px-2 py-2"
                  placeholder="My new Playlist"
                />
              </div>
              <div className="flex flex-col mb-2">
                <label className="font-semibold my-1">Description</label>
                <textarea
                  className="border px-2 py-2"
                  placeholder="My new Playlist"
                ></textarea>
              </div>
            </form>
            <div className="w-full flex justify-center my-7">
              <button
                className="bg-button-primary text-white hover:bg-primary px-5 py-3 font-semibold rounded-sm duration-75"
                onClick={() => createPlaylistHandler()}
              >
                Create Playlist
              </button>
            </div>
            <div className="relative">
              <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 font-semibold">
                Or
              </p>
              <hr className="text-black w-3/5 mx-auto" />
            </div>
            <div className="my-3">
              <h3 className="text-center font-semibold">
                Add to Existing Playlist
              </h3>
            </div>

            {/* Playlists Container */}
            <div className="h-40 grid grid-cols-2 place-items-center overflow-y-scroll border ">
              {playlists &&
                playlists.map((playlist, key) => (
                  <div
                    key={key}
                    className="my-2 border border-gray rounded-sm w-4/5 h-16 mx-1 flex items-end p-2"
                  >
                    {/* Add a conditionally Rendered playlist image component */}
                    {playlist.images ? (
                      <Image
                        src={playlist.images[0].url}
                        width={50}
                        height={50}
                        alt="Playlist"
                      />
                    ) : (
                      <div className="w-[50px] h-[50px] bg-gray"></div>
                    )}
                    <p className="font-semibold ml-2 mb-1">{playlist.name}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    );
};

export default PlaylistContainer;
