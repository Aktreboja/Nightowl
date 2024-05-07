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
} from '@/features/reducers/MusicReducer';
import { useAppDispatch } from '@/features/hooks';
import { checkToken } from '@/features/reducers/AuthReducer';
import {
  checkForSaved,
  fetchSimilarTracks,
  saveTrack,
  unsaveTrack,
} from '@/features/actions/track';
import { fetchSelectedArtists } from '@/features/actions/artist';

export default function MetadataContainer() {
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  const token = useAppSelector(checkToken);
  const selected = useAppSelector(getSelected);
  const isSaved = useAppSelector(getIsSaved);
  const selectedArtists = useAppSelector(getSelectedArtists);
  const recommendedTracks = useAppSelector(getSimilarTracks);

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
      }
      setLoading(false);
    }
  }, [selected, setLoading, dispatch, token?.access_token]);

  // onClick handler to handle saving or unsaving a track
  const handleTrackSave = (mode: string) => {
    const access_token = token?.access_token;
    if (access_token && selected) {
      switch (mode) {
        case 'Add':
          dispatch(saveTrack({ access_token, id: selected.id }));
          break;
        case 'Saved':
          dispatch(unsaveTrack({ access_token, id: selected.id }));
          break;
      }
    }
  };

  // Conditional for Track
  if (selected && 'preview_url' in selected) {
    const { name, artists, album } = selected as Track;
    const { images } = album;

    // Remove the last comma from the string
    const artistsString = artists.map((artist) => artist.name).join(', ');
    return (
      <section className=" bg-white rounded-md  py-7 w-full relative">
        <span
          className="absolute right-3 top-2 cursor-pointer"
          onClick={() => dispatch(setSelected(null))}
        >
          X
        </span>
        <div className="flex w-[90%]  mx-auto mt-3">
          <div className="relative w-20 h-20 ml-3">
            <Image
              src={images[0].url}
              layout="fill"
              objectFit="cover"
              alt={`${name} cover `}
            />
          </div>

          <div className="px-4">
            <h1 className="w-full font-bold">{name}</h1>
            <p>{artistsString}</p>
            <button
              className="border-black border rounded-sm px-4 py-0.5"
              onClick={
                isSaved
                  ? () => handleTrackSave('Saved')
                  : () => handleTrackSave('Add')
              }
            >
              {isSaved ? 'Saved' : 'Add'}
            </button>
          </div>
        </div>
        <hr className="my-4 text-primary w-4/5 mx-auto" />

        {/* Artists */}
        <div className="px-3 w-[90%] mx-auto">
          <h1 className="font-semibold ml-1">Artists</h1>
          <div className="flex mt-2">
            {/* Artist Images */}
            <div className="w-full flex">
              {!loading && selectedArtists.length > 0 ? (
                selectedArtists.map((artist, key) => {
                  return (
                    <div
                      key={key}
                      className="relative w-14 h-14 rounded-full mx-1 cursor-pointer"
                    >
                      <Image
                        src={artist.images[0].url}
                        fill={true}
                        alt="artist"
                        loading="eager"
                        objectFit="cover"
                        className="w-full h-full object-cover rounded-full"
                        title={`${artist.name}`}
                      />
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
        <hr className="my-4 text-primary  mx-auto w-4/5" />
        <div className="flex flex-col px-3 items-center w-[90%] mx-auto">
          <h1 className="font-semibold w-full lg:w-[90%] ">Similar Tracks</h1>

          {/* Tracks container */}
          <div className="grid px-1 py-4 max-md:grid-cols-5 grid-cols-10  w-fit overflow-y-auto ">
            {recommendedTracks.length > 0 &&
              recommendedTracks.map((track, key) => (
                <TrackArt key={key} track={track} />
              ))}
          </div>
        </div>
      </section>
    );
  } else {
    const { name, images } = selected as Artist;
    return (
      <section className=" bg-white rounded-md px-3 py-7 ">
        <span
          className="absolute right-3 top-2 cursor-pointer"
          onClick={() => dispatch(setSelected(null))}
        >
          X
        </span>
        <div className="flex">
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
            <button className="border-black border rounded-sm px-3 py-0.5 mt-2">
              Add
            </button>
          </div>
        </div>
        <hr className="my-4" />
        {/* Artists */}
        <div>
          <h1 className="font-semibold">Artists</h1>
          <div className="flex">
            {/* Artist Images */}
            <div>
              {!loading &&
                selectedArtists.length > 0 &&
                selectedArtists.map((artist, key) => {
                  return <div key={key}>{artist.name}</div>;
                })}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
