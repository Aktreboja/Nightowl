
'use client'
import { useEffect } from "react"
import currentToken from "@/utils/TokenService";
import Dashboard from "@/pages/Dashboard";
import { isValidTokenResponse, refreshToken } from "@/utils/Spotify/Spotify";
import { getToken } from "@/utils/Spotify/Spotify";
import { DashboardProvider } from "@/Context/DashboardProvider";
import { AuthContext } from "@/Context/AuthProvider/AuthContext";
import { useContext } from "react";
import Landing from "@/pages/Landing";

export default function AppContainer() {    
    const { auth, setAuth } = useContext(AuthContext);

    useEffect(() => {
        // todo: Potentially move this into a utility function
        const validateUser = async () => {
            const args = new URLSearchParams(window.location.search);
            const code = args.get("code");
            if (code) {
                const token = await getToken(code);
                if (isValidTokenResponse(token)){
                    currentToken.save(token);

                    // Remove code from URL so we can refresh correctly.
                    const url = new URL(window.location.href);
                    url.searchParams.delete("code");
                    const updatedUrl = url.search ? url.search : url.href.replace('?', '');
                    window.history.replaceState({}, document.title, updatedUrl);
                    setAuth(true)
                } else {
                    console.error("Invalid Token Response")
                }
            } else if (currentToken.access_token !== 'undefined') {
                // Update the access_token here if it has already expired
                let now = Math.floor(Date.now() / 1000);
                let tokenExp = Math.floor(new Date(currentToken.expires as string).getTime() / 1000);
                if (now >= tokenExp) {
                    console.log("Refreshing the Access token");
                    const refreshResponse = await refreshToken(currentToken.refresh_token as string);
                    currentToken.save(await refreshResponse);

                } else{
                    console.log("Access Token Still Good");
                }
                setAuth(true)
            }
        }
        validateUser();
    }, [setAuth])

    // check
    return (<DashboardProvider>
        <Landing />
            {/* <Dashboard /> */}
    </DashboardProvider>)
}