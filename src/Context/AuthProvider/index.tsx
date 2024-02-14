'use client'
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "./AuthContext";

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider : React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState(false)

    const authContextValue : AuthContextType = {
        auth,
        setAuth
    }

    return (
        <AuthContext.Provider value = {authContextValue}>
            {children}
        </AuthContext.Provider>
    )
}