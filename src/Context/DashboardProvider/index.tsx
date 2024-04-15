'use client'
import { useState } from "react";
import { DashboardContext, DashboardContextProps } from "./DashboardContext";
import { Track, Artist, User } from "@spotify/web-api-ts-sdk";

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
    const [ previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [ selected, setSelected ] = useState<Track | Artist | undefined>();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [currentView, setCurrentView] = useState<'Top Stats' | 'Playlists' | 'Generator'>('Top Stats');

    const authContextValue : DashboardContextProps = {
        clickedWelcome,
        loading,
        autoplay,
        topTracks,
        topArtists,
        preview,
        previewUrl,
        selected,
        currentUser,
        currentView,
        setClickedWelcome,
        setLoading,
        setAutoplay,
        setTopTracks,
        setTopArtists,
        setPreview,
        setPreviewUrl,
        setSelected,
        setCurrentUser,
        setCurrentView
    }

    return (
        <DashboardContext.Provider value = {authContextValue}>
            {children}
        </DashboardContext.Provider>
    )
}