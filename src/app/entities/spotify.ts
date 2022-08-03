export type TokenT = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

export type HydratedTokenT = TokenT & {
  expedition_time: number;
};

export enum SpotifySearchTypesE {
  artist = 'artist',
  album = 'album',
  playlist = 'playlist',
  track = 'track',
  show = 'show',
  episode = 'episode',
}

export enum SpotifySearchPluralTypesE {
  artists = 'artists',
  albums = 'albums',
  playlists = 'playlists',
  tracks = 'tracks',
  shows = 'shows',
  episodes = 'episodes',
}

export type ImageT = {
  height: number;
  url: string;
};

export type BaseItemT<T extends SpotifySearchTypesE> = {
  external_urls: Record<string, string>;
  href: string;
  id: string;
  name: string;
  type: T;
  uri: string;
};

export type ArtistItemT = BaseItemT<SpotifySearchTypesE.artist> & {
  followers: {
    href: null | string;
    total: number;
  };
  genres: string[];
  images: ImageT[];
  popularity: number;
};

export type AlbumItemT = BaseItemT<SpotifySearchTypesE.album> & {
  album_group: string;
  album_type: string;
  artists: BaseItemT<SpotifySearchTypesE.artist>[];
  images: ImageT[];
  release_date: string;
  release_date_precision: string;
  total_tracks: 13;
};

export type TrackItemT = BaseItemT<SpotifySearchTypesE.track> & {
  artists: BaseItemT<SpotifySearchTypesE.artist>[];
  disc_number: number;
  duration_ms: number;
  explicit: true;
  is_local: boolean;
  is_playable: boolean;
  preview_url: string;
  track_number: string;
};

export type SearchResultRecordT<ItemT> = {
  href: string;
  items: ItemT[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

export type SearchResultT = {
  [SpotifySearchPluralTypesE.artists]?: SearchResultRecordT<ArtistItemT>;
  [SpotifySearchPluralTypesE.albums]?: SearchResultRecordT<AlbumItemT>;
  [SpotifySearchPluralTypesE.tracks]?: SearchResultRecordT<TrackItemT>;
};
