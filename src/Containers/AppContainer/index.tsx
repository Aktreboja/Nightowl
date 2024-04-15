
'use client'
import { useEffect, useState } from "react"
import { checkTokenExp } from "@/utils/TokenService";
import Dashboard from "@/pages/Dashboard";
import { refreshToken } from "@/utils/Spotify/Spotify";
import { getToken } from "@/utils/Spotify/Spotify";
import { DashboardProvider } from "@/Context/DashboardProvider";
import Landing from "@/pages/Landing";
import LandingLoader from "@/components/Loaders/LandingLoader";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { checkAuth, setToken, setAuth, checkToken } from "@/features/reducers/AuthReducer";

export default function AppContainer() {
    const dispatch = useAppDispatch();

    const auth = useAppSelector(checkAuth);
    const token = useAppSelector(checkToken)

    const [startedLoading, setStartedLoading] = useState(false);
    const [loading, setLoading] = useState(true)
    
    // Loading useEffect, fully loads once 'startedLoading' is set to True
    useEffect(() => {
        if (startedLoading) {
            setTimeout(() => {
                setLoading(false);
            }, 1500)
        }
    }, [startedLoading])


    // useEffect for if the url contains a code.
    useEffect(() => {
        const validateUser = async (args: URLSearchParams) => {
            const code = args.get('code')
            const error = args.get('error')

            // Implement based on search query
            if (code) {
                const token = await getToken(code)
                if (token) {
                    dispatch(setToken(token))
                    dispatch(setAuth(true));
                }
            } else if (error) {
                console.error(error)
            }
        }

        const validateToken = async () => {
            // New Implementation (redux)
            if (token) {
                // Check to see if the access token has expired; if so Refresh and authenticated
                if (checkTokenExp(Date.now() / 1000, Math.floor(new Date(token.expires as string).getTime() / 1000))) {
                    const refreshResponse = await refreshToken(token.refresh_token);
                    dispatch(setToken(await refreshResponse));
                } 
                dispatch(setAuth(true))
            }
            
        }

        // Check for any code directs
        const args = new URLSearchParams(window.location.search);
        if (args.size > 0 ) {
            validateUser(args);
        }

        // Replace the url of the page to default route
        const url = new URL(window.location.href);
        url.searchParams.delete("code");
        const updatedUrl = url.search ? url.search : url.href.replace('?', '');
        window.history.replaceState({}, document.title, updatedUrl);

        validateToken();
        setStartedLoading(true);
    }, [dispatch, token])

    return (<DashboardProvider>
            <div className="relative w-full h-screen">
            <LandingLoader loading =  {loading}/>
                <div className={`absolute inset-0 transition-opacity duration-300 ${!loading ? 'opacity-100' : 'opacity-0'}`}>
                    {auth  ? <Dashboard /> : <Landing /> }
                </div>
            </div>
    </DashboardProvider>)
}