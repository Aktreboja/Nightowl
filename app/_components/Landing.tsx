'use client';

const Landing = () => {
  const handleLogin = async () => {
    try {
      // Auth0 will handle the redirect and callback
      window.location.href = '/api/auth/login?returnTo=/registration';
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold">Nightowl</h1>
      <button
        onClick={handleLogin}
        className="border border-black px-4 py-3 rounded-md"
      >
        Click to get started
      </button>
    </div>
  );
};

export default Landing;
