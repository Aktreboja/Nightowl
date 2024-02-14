'use client'
import { Track, Artist } from "@spotify/web-api-ts-sdk";
import { Dispatch, SetStateAction, createContext } from "react"

export interface DashboardContextProps {
    clickedWelcome: boolean;
    loading: boolean;
    autoplay: boolean;
    topTracks: Track[];
    topArtists: Artist[];
    preview: Track | Artist | undefined;
    selected: Track | Artist | undefined;
    setClickedWelcome: Dispatch<SetStateAction<boolean>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setAutoplay: Dispatch<SetStateAction<boolean>>;
    setTopTracks: Dispatch<SetStateAction<Track[]>>;
    setTopArtists: Dispatch<SetStateAction<Artist[]>>;
    setPreview: Dispatch<SetStateAction<Track | Artist | undefined>>;
    setSelected: Dispatch<SetStateAction<Track | Artist | undefined>>;
}

export const DashboardContext = createContext<DashboardContextProps>({
    clickedWelcome: false,
    loading: false,
    autoplay: true,
    topTracks: [],
    topArtists: [],
    preview: undefined,
    selected: undefined,
    setClickedWelcome: () => {},
    setLoading: () => {},
    setAutoplay: () => {},
    setTopTracks: () => {},
    setTopArtists: () => {},
    setPreview: () => {},
    setSelected: () => {}
});