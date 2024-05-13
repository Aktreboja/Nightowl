'use client';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { clearToastMessage } from '@/features/reducers/UIReducer';
import { useAppDispatch } from '@/features/hooks';

export default function NotificationToast({
  message,
  duration = 6000,
}: {
  message: string;
  duration?: number;
}) {
  const [progress, setProgress] = useState(100);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(0);
    }, duration);

    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        Math.max(0, prevProgress - (100 / duration) * 100),
      );
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [duration]);

  const closeHandler = () => {
    dispatch(clearToastMessage());
    setProgress(0);
  };

  if (progress === 0) {
    dispatch(clearToastMessage());
    return null;
  }
  return (
    <div className="min-w-[350px] max-w-[500px] absolute bottom-4 right-1/2 transform translate-x-1/2 md:-translate-x-0 md:right-4 bg-white px-10 py-6 md:py-7 rounded-sm flex justify-center">
      <IoMdCloseCircleOutline
        className="absolute top-1 text-xl right-1 cursor-pointer"
        onClick={() => closeHandler()}
      />
      <p className="font-semibold">{message}</p>
      <div className="w-full h-2  mt-2 rounded-md absolute bottom-0">
        <div
          className="h-2 bg-secondary "
          style={{ width: `${progress}%`, transition: 'width 0.1s ease-out' }}
        ></div>
      </div>
    </div>
  );
}
