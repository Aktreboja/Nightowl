'use client';
import RegistrationModal from '@/app/_components/(onboarding)/RegistrationModal';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Registration = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-2xl font-medium pb-4">
        Tell us about yourself to get started
      </p>
      <RegistrationModal />
    </div>
  );
};

export default Registration;
