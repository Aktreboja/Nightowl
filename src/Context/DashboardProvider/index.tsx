'use client'
import { useState } from "react";
import { DashboardContext, DashboardContextProps } from "./DashboardContext";
import { Track, Artist } from "@spotify/web-api-ts-sdk";

interface DashboardProviderProps {
    children: React.ReactNode
}

export const DashboardProvider : React.FC<DashboardProviderProps> = ({ children }) => {
    const [clickedWelcome, setClickedWelcome] = useState(false)
    const [loading, setLoading] = useState(false)
    const [autoplay, setAutoplay] = useState(true)

    const [topTracks, setTopTracks] = useState<Track[]>([]);
    const [topArtists, setTopArtists] = useState<Artist[]>([]);
    const [ preview, setPreview ] = useState<Track | Artist | undefined >();
    const [ selected, setSelected ] = useState<Track | Artist | undefined>();

    const authContextValue : DashboardContextProps = {
        clickedWelcome,
        loading,
        autoplay,
        topTracks,
        topArtists,
        preview,
        selected,
        setClickedWelcome,
        setLoading,
        setAutoplay,
        setTopTracks,
        setTopArtists,
        setPreview,
        setSelected
    }

    return (
        <DashboardContext.Provider value = {authContextValue}>
            {children}
        </DashboardContext.Provider>
    )
}