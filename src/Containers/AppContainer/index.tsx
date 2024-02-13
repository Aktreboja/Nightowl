
'use client'
import { useEffect, useState } from "react"
import currentToken from "@/utils/TokenService";
import Dashboard from "@/pages/Dashboard";
import Landing from "@/pages/Landing";

export default function AppContainer() {
    const [auth, setAuth] = useState(false);

    // Checks if there's an access token available / needs refreshing
    // useEffect(() => {
    //     const token = currentToken.access_token;
    //     if (token) {
    //         console.log("Token available, welcome back")
    //         setAuth(true);
    //     }
    // }, [])


    return (<main>
        <Dashboard authenticated = {auth}/>
    </main>)
}