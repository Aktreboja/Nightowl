import './globals.css';
import { Metadata } from 'next';
import { AuthProvider } from '@/Context/AuthProvider';
import Landing from '@/pages/Landing';
import AppContainer from '@/Containers/AppContainer';
export const metadata: Metadata = {
  title: "Nightowl",
  description: "A Spotify Based web application designed to have you listen to music all night." 
}

// Home base page. Remained as a Server component to modify Metadata content 
export default function Home() {
  return <AuthProvider>
    {/* <Landing /> */}
    <AppContainer />
  </AuthProvider>
  
}


