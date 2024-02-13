
//  Notes on client and server components in next
//  https://nextjs.org/docs/app/building-your-application/rendering/client-components
import './globals.css';
import AppContainer from '@/Containers/AppContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Nightowl",
  description: "A Spotify Based web application designed to have you listen to music all night." 
}

export default function Home() {
  // useEffect(() => {
    
  //   const checkToken = async () => {
  //     const args = new URLSearchParams(window.location.search);
  //     const code = args.get('code');
  //     if (code) {
  //       const token = await getToken(code)

  //       if (isValidTokenResponse(token)) {
  //         currentToken.save(token);

  //         // Remove code from URL so we can refresh correctly.
  //         const url = new URL(window.location.href);
  //         url.searchParams.delete("code");
      
  //         const updatedUrl = url.search ? url.search : url.href.replace('?', '');
  //         window.history.replaceState({}, document.title, updatedUrl);
  //         setAuth(true);
  //       } else {
  //         console.error("Invalid token Response");
  //       }

  //     }
  //   }
  //   checkToken();
  // }, [])
  
  return <>
    <AppContainer />
  </>
  
}


