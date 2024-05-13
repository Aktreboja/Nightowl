'use client';
import { loginWithSpotifyClick } from '@/utils/Spotify/Spotify';
import { Merriweather_Sans } from 'next/font/google';
import { Audio } from 'react-loader-spinner';
import useSpotify from '@/utils/Spotify/hooks/useSpotify';

const merriweather = Merriweather_Sans({
  subsets: ['latin'],
  weight: 'variable',
});

const landingText = [
  {
    title: 'Personalized Music Insights',
    description:
      "Nightowl empowers users to dive into their music preferences like never before. With its integration of the Spotify Web API, users can effortlessly explore their top tracks and artists over specific time frames, whether it's the past month, year, or their all-time favorites. Gain valuable insights into your music listening habits and discover new trends within your own library.",
  },
  {
    title: 'Discover New Favorites',
    description:
      "Say goodbye to endless searching for new music. Nightowl's intelligent recommendation engine analyzes your favorite artists and tracks, providing you with tailored suggestions for similar content you're likely to enjoy. Whether you're exploring a beloved artist or a newfound track, Nightowl makes it easy to expand your musical horizons and unearth hidden gems.",
  },
  {
    title: 'Effortless Playlist Curation',
    description:
      "Crafting the perfect playlist has never been simpler. With Nightowl's seamless integration with Spotify's recommendation algorithm, users can effortlessly generate playlists curated from a selection of tracks. Simply choose your favorite songs, sit back, and let Nightowl do the rest. Whether you're setting the mood for a party or seeking the perfect soundtrack for your daily commute, Nightowl ensures your playlists are always fresh and engaging.",
  },
];

// Index page component for first / unauthenticated visit
const Landing = () => {
  const { redirectToSpotifyAuthorize } = useSpotify();

  return (
    <main
      className={` relative w-screen h-full  bg-white ${merriweather.className}`}
    >
      <div className="w-full h-fit  min-h-[400px] bg-primary flex flex-col justify-end items-center">
        <div className="w-96 h-80 bg-secondary absolute flex items-end justify-end">
          <Audio
            height="120"
            width="120"
            color="#394032"
            ariaLabel="audio"
            visible={true}
          />
        </div>
        <div className="my-7 text-white z-50">
          <h1 className="font-bold text-7xl w-fit h-fit  text-center text-white">
            Nightowl
          </h1>
          <p className="mt-2">A platform for the adventurous</p>
        </div>
      </div>

      <div className="w-4/5 mx-auto h-fit flex flex-col xl:flex-row pt-10">
        {landingText.map((text, key) => (
          <div className="px-5 mb-6" key={key}>
            <h1 className="text-xl font-bold mb-3">{text.title}</h1>
            <p className="max-lg:text-sm max-lg:leading-relaxed">
              {text.description}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col flex-grow items-center py-5">
        <button
          className="border-[#858786] bg-primary hover:bg-button-primary hover:text-white duration-75 text-white w-44 lg:w-56 text-lg lg:text-xl px-4 py-3 mt-3 rounded-sm"
          onClick={async () => redirectToSpotifyAuthorize()}
        >
          Get Started
        </button>
      </div>
    </main>
  );
};

export default Landing;
