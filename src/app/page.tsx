import './globals.css';
import AppContainer from '@/Containers/AppContainer';
import { Metadata } from 'next';
import { AuthProvider } from '@/Context/AuthProvider';

export const metadata: Metadata = {
  title: "Nightowl",
  description: "A Spotify Based web application designed to have you listen to music all night." 
}

// Home base page. Remained as a Server component to modify Metadata content 
export default function Home() {

  return <AuthProvider>
    <AppContainer />
  </AuthProvider>
  
}


