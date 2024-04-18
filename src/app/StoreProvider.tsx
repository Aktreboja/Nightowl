'use client';
import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/features/store';

export default function StoreProvder({
  children,
}: {
  children: React.ReactNode;
}) {
  // const store = useRef<AppStore>()
  // // Create the store if it's the first time of rendering
  // store.current = makeStore();

  const store = makeStore();

  return <Provider store={store}>{children}</Provider>;
}
