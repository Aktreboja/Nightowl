'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Track, Artist } from '@spotify/web-api-ts-sdk';
import { RecommendationQuery } from '../../../../../spotify_api';
import TrackArt from '@/app/Dashboard/_Components/TrackArt';
import ArtistLoader from '@/app/Dashboard/_Components/ArtistLoader';
import { useAppSelector } from '@/features/hooks';
import {
  getSelected,
  getSelectedArtists,
  setSelected,
  getSimilarTracks,
  getIsSaved,
  setArtistTopTracks,
  getArtistsTopTracks,
  setRelatedArtists,
  getRelatedArtists,
  setArtistAlbums,
  getArtistsAlbums,
  clearSelected,
  setSelectedArtists,
  setSimilarTracks,
} from '@/features/reducers/MusicReducer';
import { useAppDispatch } from '@/features/hooks';
import { checkToken } from '@/features/reducers/AuthReducer';
import {
  checkForSaved,
  fetchSimilarTracks,
  unsaveTrack,
} from '@/features/actions/track';
import { fetchSelectedArtists } from '@/features/actions/artist';
import { IoCloseSharp } from 'react-icons/io5';
import useSpotifyArtists from '@/utils/Spotify/hooks/useSpotifyArtists';
import ArtistArt from '../../_Components/ArtistArt';
import AlbumArt from '../../_Components/AlbumArt';

export default function MetadataContainer() {
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  const token = useAppSelector(checkToken);

  // State for rendering conditional metadata container
  const selected = useAppSelector(getSelected);
  const isSaved = useAppSelector(getIsSaved);

  // Track View Selectors
  const selectedArtists = useAppSelector(getSelectedArtists);
  const recommendedTracks = useAppSelector(getSimilarTracks);

  // Artist view selectors
  const artistTopTracks = useAppSelector(getArtistsTopTracks);
  const relatedArtists = useAppSelector(getRelatedArtists);
  const artistAlbums = useAppSelector(getArtistsAlbums);

  const artistsApi = useSpotifyArtists();

  // UseEffect for loading artists
  useEffect(() => {
    setLoading(true);

    // Utility functions to load the metadata Container
    const checkSaved = async (access_token: string, id: string) =>
      dispatch(checkForSaved({ access_token, id }));
    const loadArtists = async (access_token: string, ids: string[]) =>
      dispatch(fetchSelectedArtists({ access_token, ids }));
    const loadRecommendations = async (
      access_token: string,
      recommendationQuery: RecommendationQuery,
    ) => dispatch(fetchSimilarTracks({ access_token, recommendationQuery }));

    const loadArtistTopTracks = async (artist_id: string) => {
      const artistTopTracks = await artistsApi.fetchArtistsTopTracks(artist_id);
      dispatch(setArtistTopTracks(artistTopTracks));
    };

    const loadRelatedArtists = async (artist_id: string) => {
      const relatedArtists =
        await artistsApi.fetchArtistsRelatedArtists(artist_id);
      dispatch(setRelatedArtists(relatedArtists));
    };

    const loadArtistsAlbums = async (artist_id: string) => {
      const artistAlbums = await artistsApi.fetchArtistsAlbums(artist_id);
      dispatch(setArtistAlbums(artistAlbums));
    };

    // Check if the token exists, if not set
    const access_token = token?.access_token;
    if (access_token && selected) {
      // Track implementation
      if ('preview_url' in selected) {
        const { artists } = selected as Track;
        const artistIds: string[] = [];
        for (let i = 0; i < artists.length; i++) {
          artistIds.push(artists[i].id);
        }

        // Get the similar tracks from this track.
        const recommendationQuery: RecommendationQuery = {
          seedTracks: new Array(selected.id),
          seedArtists: artistIds,
        };

        // Load data
        checkSaved(access_token, selected.id);
        loadArtists(access_token, artistIds);
        loadRecommendations(access_token, recommendationQuery);
      } else {
        // Artist implementation
        loadArtistTopTracks(selected.id);
        loadArtistsAlbums(selected.id);
        loadRelatedArtists(selected.id);
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [selected, setLoading, dispatch, token?.access_token]);

  // onClick handler to handle saving or unsaving a track
  const handleTrackSave = (mode: string) => {
    const access_token = token?.access_token;
    if (access_token && selected) {
      switch (mode) {
        case 'Add':
          // dispatch(saveTrack({ access_token, id: selected.id }));
          break;
        case 'Saved':
          dispatch(unsaveTrack({ access_token, id: selected.id }));
          break;
      }
    }
  };

  // Clear all of the metadata state before closing the modal.
  const handleModalClose = () => {
    dispatch(setArtistTopTracks([]));
    dispatch(setArtistAlbums([]));
    dispatch(setRelatedArtists([]));
    dispatch(setSelectedArtists([]));
    dispatch(setSimilarTracks([]));
    dispatch(setSelected(null));
  };

  // Conditional for Track
  if (selected && 'preview_url' in selected) {
    const { name, artists, album } = selected as Track;
    const { images } = album;

    // Remove the last comma from the string
    const artistsString = artists.map((artist) => artist.name).join(', ');

    return (
      <section className=" bg-white rounded-md py-7 w-full relative ">
        <span
          className="absolute right-3 top-2 cursor-pointer border rounded-full border-black border-opacity-45 p-1 hover:bg-secondary hover:bg-opacity-85 hover:text-white duration-75"
          onClick={() => handleModalClose()}
        >
          <IoCloseSharp className="" />
        </span>

        <div className="mx-2 px-3 my-4">
          <div className="flex mx-auto mt-4 my-8">
            <div className="relative max-lg:w-20 max-lg:h-20 w-24 h-24 ">
              <Image
                src={images[0].url}
                layout="fill"
                objectFit="cover"
                alt={`${name} cover `}
              />
            </div>

            <div className="px-4 flex flex-col justify-between items-start">
              <div>
                <h1 className="w-full font-bold max-lg:text-sm text-2xl">
                  {name}
                </h1>
                <p className="font-medium">{artistsString}</p>
              </div>

              <button
                className="border-black border rounded-sm px-3 py-2 mt-1 hover:bg-secondary hover:text-white duration-75"
                onClick={
                  isSaved
                    ? () => handleTrackSave('Saved')
                    : () => handleTrackSave('Add')
                }
              >
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          {/* Artists */}
          <div className=" w-full mx-auto my-8">
            <h1 className="font-semibold text-2xl">Artists</h1>
            <div className="flex mt-2 ">
              {/* Artist Images */}
              <div className="w-full flex">
                {!loading && selectedArtists.length > 0 ? (
                  selectedArtists.map((artist, key) => {
                    return (
                      <div key={key} className="mx-1">
                        <ArtistArt artist={artist} rounded={true} />
                      </div>
                    );
                  })
                ) : (
                  <ArtistLoader />
                )}
              </div>
            </div>
          </div>

          {/* Similar Music */}
          <div className="flex flex-col  items-center w-full mx-auto">
            <h1 className="font-semibold w-full lg:text-2xl ">
              Similar Tracks
            </h1>

            {/* Tracks container */}
            <div className="grid px-1 py-4 max-md:grid-cols-5 grid-cols-10 w-full  overflow-y-auto ">
              {recommendedTracks.length > 0 &&
                recommendedTracks.map((track, key) => (
                  <TrackArt key={key} track={track} />
                ))}
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    const { name, images, genres } = selected as Artist;
    let genresString = '';
    for (let i = 0; i < genres.length; i++) {
      genresString += genres[i] + ', ';
    }
    genresString = genresString.trim().slice(0, -1);

    return !loading ? (
      <section className="relative bg-white rounded-md px-3 py-7 ">
        <span
          className="absolute right-3 top-2 cursor-pointer border rounded-full border-black border-opacity-45 p-1 hover:bg-secondary hover:bg-opacity-85 hover:text-white duration-75"
          onClick={() => dispatch(setSelected(null))}
        >
          <IoCloseSharp className="" />
        </span>

        <div className="px-3 my-4">
          <div className="flex mx-auto my-10">
            <div className="relative w-28 h-28">
              <Image
                src={images[0].url}
                layout="fill"
                objectFit="cover"
                alt={`${name} cover `}
              />
            </div>

            <div className="px-2 mt-0.5">
              <h1 className="w-full font-bold">{name}</h1>
              <p>
                <strong>Genres: </strong>
                {genresString}
              </p>
              <button className="border-black border rounded-sm px-3 py-0.5 mt-2">
                {isSaved ? 'followed' : 'Follow'}
              </button>
            </div>
          </div>

          {/*    Artist's Top Tracks   */}
          <div className=" mx-auto my-4">
            <h1 className="font-semibold">Top Tracks from {name}</h1>
            <div className="flex">
              {/* Artist Images */}
              <div className="grid px-1 py-4 max-md:grid-cols-5 grid-cols-10  overflow-y-auto ">
                {artistTopTracks.length > 0 &&
                  artistTopTracks.map((track, key) => {
                    return <TrackArt track={track} key={key} />;
                  })}
              </div>
            </div>
          </div>

          {/* Artist's Albums */}
          <div className="mx-auto my-4">
            <h1 className="font-semibold">Albums by {name}</h1>
            <div className="flex">
              {/* Album Images */}
              <div className="grid px-1 py-4 max-md:grid-cols-5 grid-cols-10 overflow-y-auto ">
                {artistAlbums.length > 0 &&
                  artistAlbums
                    .filter((album) => album.album_type == 'album')
                    .map((album, key) => {
                      return <AlbumArt album={album} key={key} />;
                    })}
              </div>
            </div>
          </div>

          <div className="px-1  mx-auto">
            <h1 className="font-semibold">Artists related to {name}</h1>
            <div className="flex">
              {/* Artist Images */}
              <div className="grid px-1 py-4 max-md:grid-cols-5 grid-cols-10 overflow-y-auto ">
                {relatedArtists.length > 0 &&
                  relatedArtists.map((artist, key) => {
                    return <ArtistArt artist={artist} key={key} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    ) : null;
  }
}
