import Link from 'next/link';
import { SpotifyUser } from '@/app/_types/Spotify';

type UserCardProps = {
  user: SpotifyUser;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <div className="flex items-center space-x-6">
        {user.images && user.images.length > 0 ? (
          <img
            src={user.images[0].url}
            alt={user.display_name}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        <div>
          <Link href={user.external_urls.spotify} target="_blank">
            <h2 className="text-2xl font-bold">{user.display_name}</h2>
          </Link>
          <p className="text-gray-400">{user.email}</p>
          <p className="text-sm text-gray-500">User ID: {user.id}</p>
          <p className="text-sm text-gray-500">
            Followers: {user.followers.total}
          </p>
          <p className="text-sm text-gray-500">Country: {user.country}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
