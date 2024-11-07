import { Merriweather_Sans } from 'next/font/google';
import { Audio } from 'react-loader-spinner';
import useSpotify from '@/utils/Spotify/hooks/useSpotify';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';

const merriweather = Merriweather_Sans({
  subsets: ['latin'],
  weight: 'variable',
});

const NAME_QUERY = gql`
  {
    name
  }
`;

// Index page component for first / unauthenticated visit
const Landing = () => {
  const { redirectToSpotifyAuthorize } = useSpotify();
  const { data, error } = useQuery(NAME_QUERY);
  if (error) console.log(error.message);
  return (
    <main
      className={` relative w-screen h-full   bg-white ${merriweather.className}`}
    >
      <div className="w-full h-max min-h-[400px] bg-secondary flex flex-col justify-end items-center">
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
          <h1 className="font-bold max-lg:text-6xl text-8xl w-fit h-fit  text-center text-white italic">
            Nightowl
          </h1>
          <p className="mt-2">A Spotify Music Discovery Tool</p>
          {data ? <div>{data.name}</div> : null}
        </div>
      </div>
      <div className="w-full flex flex-col flex-grow items-center py-5 ">
        <Link href="/api/auth/login?returnTo=/registration">
          <button className="border-[#858786] bg-primary hover:bg-button-primary hover:text-white duration-75 text-white w-44 lg:w-56 text-xl lg:text-xl px-3 py-4 mt-3 mb-10 rounded-sm">
            Get Started
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Landing;

/**
 * Photo by <a href="https://unsplash.com/@jhjowen?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">James Owen</a> on <a href="https://unsplash.com/photos/turned-on-electronic-keyboard-c-NBiJrhwdM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  
 */
