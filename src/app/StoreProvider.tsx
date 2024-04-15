'use client'
import { useRef } from "react"
import{ Provider } from 'react-redux'
import { makeStore, AppStore } from "@/features/store"

export default function StoreProvder({
    children
}: {
    children: React.ReactNode
}) {
    const store = useRef<AppStore>()
    // Create the store if it's the first time of rendering
    if (!store.current) {
        store.current = makeStore();
    }
    return (
        <Provider store={store.current}>{children}</Provider>
    )
}