import TopTracks from './TopTracks';
import TopArtists from './TopArtists';
import { Track, Artist } from '@spotify/web-api-ts-sdk';
interface UserTopStatsContentProps {
  setHoveredTrack: (track: Track | null) => void;
  setHoveredArtist: (artist: Artist | null) => void;
  setSelectedItem: (item: Track | Artist | null) => void;
}

const UserTopStatsContent = ({
  setHoveredTrack,
  setHoveredArtist,
  setSelectedItem,
}: UserTopStatsContentProps) => {
  return (
    <div className="flex flex-col justify-center gap-4 w-full h-full ">
      <TopTracks
        setHoveredTrack={setHoveredTrack}
        setSelectedItem={setSelectedItem}
      />
      {/* <TopArtists setHoveredArtist={setHoveredArtist} /> */}
    </div>
  );
};

export default UserTopStatsContent;
