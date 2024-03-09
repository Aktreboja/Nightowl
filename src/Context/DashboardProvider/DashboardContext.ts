'use client'
import { Track, Artist, User } from "@spotify/web-api-ts-sdk";
import { Dispatch, SetStateAction, createContext } from "react"

export interface DashboardContextProps {
    clickedWelcome: boolean;
    loading: boolean;
    autoplay: boolean;
    topTracks: Track[];
    topArtists: Artist[];
    preview: Track | Artist | undefined;
    previewUrl: string | null;
    selected: Track | Artist | undefined;
    currentUser: User | null;
    currentView: 'Top Stats' | 'Playlists' | 'Generator';
    setClickedWelcome: Dispatch<SetStateAction<boolean>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setAutoplay: Dispatch<SetStateAction<boolean>>;
    setTopTracks: Dispatch<SetStateAction<Track[]>>;
    setTopArtists: Dispatch<SetStateAction<Artist[]>>;
    setPreview: Dispatch<SetStateAction<Track | Artist | undefined>>;
    setPreviewUrl : Dispatch<SetStateAction<string | null>>;
    setSelected: Dispatch<SetStateAction<Track | Artist | undefined>>;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
    setCurrentView: Dispatch<SetStateAction<'Top Stats' | 'Playlists' | 'Generator'>>;
}

export const DashboardContext = createContext<DashboardContextProps>({
    clickedWelcome: false,
    loading: false,
    autoplay: true,
    topTracks: [],
    topArtists: [],
    preview: undefined,
    previewUrl: null,
    selected: undefined,
    currentUser: null,
    currentView: 'Top Stats',
    setClickedWelcome: () => {},
    setLoading: () => {},
    setAutoplay: () => {},
    setTopTracks: () => {},
    setTopArtists: () => {},
    setPreview: () => {},
    setPreviewUrl: () => {},
    setSelected: () => {},
    setCurrentUser: () => {},
    setCurrentView: () => {}
});