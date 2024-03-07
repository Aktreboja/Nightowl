
'use client'
import { useEffect, useState } from "react"
import currentToken from "@/utils/TokenService";
import Dashboard from "@/pages/Dashboard";
import { isValidTokenResponse, refreshToken } from "@/utils/Spotify/Spotify";
import { getToken } from "@/utils/Spotify/Spotify";
import { DashboardProvider } from "@/Context/DashboardProvider";
import { AuthContext } from "@/Context/AuthProvider/AuthContext";
import { useContext } from "react";
import Landing from "@/pages/Landing";
import { Merriweather_Sans } from "next/font/google";
import LandingLoader from "@/components/Loaders/LandingLoader";

const merriweather = Merriweather_Sans({
    subsets: ['latin'],
    weight: 'variable'
})

export default function AppContainer() {    
    const { auth, setAuth } = useContext(AuthContext);
    const [startedLoading, setStartedLoading] = useState(false);
    const [loading, setLoading] = useState(true)
    
    // Loading useEffect
    useEffect(() => {
        if (startedLoading) {
            setTimeout(() => {
                setLoading(false);
            }, 1500)
        }
    }, [startedLoading])

    // Use Effect for when an access code is present within the localStorage
    useEffect(() => {
        const validateToken = async () => {
            console.log("Validating")
            let access_token = currentToken.access_token;
            let expiration = currentToken.expires;
            let refresh_token = currentToken.refresh_token
            if (access_token && expiration && refresh_token) {
                // Check to see if the access token has expired; if so Refresh and authenticated
                if (currentToken.validateToken(Date.now() / 1000, Math.floor(new Date(currentToken.expires as string).getTime() / 1000))) {
                    const refreshResponse = await refreshToken(refresh_token);
                    currentToken.save(await refreshResponse);
                    setStartedLoading(true)
                    setAuth(true)
                } else {
                    // Token is still valid, continue to
                    setStartedLoading(true)
                    setAuth(true)
                }  
            } else {
                setStartedLoading(true)
            }
        }
        validateToken();

    }, [setAuth])

    // useEffect for if the url contains a code.
    useEffect(() => {
        const validateUser = async (args: URLSearchParams) => {
            const code = args.get('code')
            const error = args.get('error')

            // Implement based on search query
            if (code) {
                const token = await getToken(code)
                if (token) {
                    currentToken.save(token);
                    setAuth(true);
                }
            } else {
                console.error(error)
            }
        }

        // Check for any code directs
        const args = new URLSearchParams(window.location.search);
        if (args.size > 0 ) {
            validateUser(args);
        }

        // Replace the url of the page to default index
        const url = new URL(window.location.href);
        url.searchParams.delete("code");
        const updatedUrl = url.search ? url.search : url.href.replace('?', '');
        window.history.replaceState({}, document.title, updatedUrl);
    }, [setAuth])

    // check
    return (<DashboardProvider>
            <div className="relative w-full h-screen">
            <LandingLoader loading =  {loading}/>
                <div className={`absolute inset-0 transition-opacity duration-300 ${!loading ? 'opacity-100' : 'opacity-0'}`}>
                    {auth ? <Dashboard /> : <Landing /> }
                </div>
            </div>
        {/* {auth ? <Dashboard /> : <Landing /> } */}
            {/* <Dashboard /> */}
    </DashboardProvider>)
}