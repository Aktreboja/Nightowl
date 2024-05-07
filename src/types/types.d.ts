// Create Playlist API route props
export interface CreatePlaylistProps {
  name: string;
  public?: boolean;
  collaborative?: boolean;
  description?: string;
}
