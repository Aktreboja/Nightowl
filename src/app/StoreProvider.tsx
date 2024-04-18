'use client';
import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/features/store';

export default function StoreProvder({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useRef<AppStore>();
  if (!store.current) store.current = makeStore();
  return <Provider store={store.current}>{children}</Provider>;
}
