import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold">Nightowl</h1>
      <button className="border border-black px-4 py-3 rounded-md">
        Click to get started
      </button>
    </div>
  );
}
