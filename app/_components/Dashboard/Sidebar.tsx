'use client';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      {/* Add your sidebar content here */}
      <nav className="space-y-4 flex flex-col justify-between h-full">
        <div className="text-xl font-bold mb-6">Nightowl</div>
        <ul className="space-y-2">
          <li>Dashboard</li>
          <li>Playlists</li>
          {/* Add more navigation items as needed */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
