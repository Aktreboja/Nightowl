
import './globals.css';
import AppContainer from '@/Containers/AppContainer';
import { Metadata } from 'next';
import { AuthProvider } from '@/Context/AuthProvider';
import {Merriweather_Sans} from 'next/font/google'
import Link from 'next/link';
import Landing from '@/pages/Landing';

const merriweather = Merriweather_Sans({
  subsets: ['latin'],
  weight: 'variable'
})

export const metadata: Metadata = {
  title: "Nightowl",
  description: "A Spotify Based web application designed to have you listen to music all night." 
}


const landingText = [
  {
    title: "Personalized Music Insights",
    description: "Nightowl empowers users to dive into their music preferences like never before. With its integration of the Spotify Web API, users can effortlessly explore their top tracks and artists over specific time frames, whether it's the past month, year, or their all-time favorites. Gain valuable insights into your music listening habits and discover new trends within your own library."
  },
  {
    title: "Discover New Favorites",
    description: "Say goodbye to endless searching for new music. Nightowl's intelligent recommendation engine analyzes your favorite artists and tracks, providing you with tailored suggestions for similar content you're likely to enjoy. Whether you're exploring a beloved artist or a newfound track, Nightowl makes it easy to expand your musical horizons and unearth hidden gems."
  },
  {
    title: "Effortless Playlist Curation",
    description: "Crafting the perfect playlist has never been simpler. With Nightowl's seamless integration with Spotify's recommendation algorithm, users can effortlessly generate playlists curated from a selection of tracks. Simply choose your favorite songs, sit back, and let Nightowl do the rest. Whether you're setting the mood for a party or seeking the perfect soundtrack for your daily commute, Nightowl ensures your playlists are always fresh and engaging."
  }
]


// Home base page. Remained as a Server component to modify Metadata content 
export default function Home() {
  return <AuthProvider>
    <Landing />
    
    {/* <AppContainer /> */}
  </AuthProvider>
  
}


