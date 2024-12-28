export interface Playlists {
  href:     string;
  limit:    number;
  next:     null;
  offset:   number;
  previous: null;
  total:    number;
  items:    Item[];
}

export interface Item {
  collaborative: boolean;
  description:   string;
  external_urls: ExternalUrls;
  href:          string;
  id:            string;
  images:        Image[];
  name:          string;
  owner:         Owner;
  public:        boolean;
  snapshot_id:   string;
  tracks:        Tracks;
  type:          ItemType;
  uri:           string;
  primary_color: null;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  url:    string;
  height: number | null;
  width:  number | null;
}

export interface Owner {
  external_urls: ExternalUrls;
  href:          string;
  id:            string;
  type:          OwnerType;
  uri:           string;
  display_name:  string;
}

export enum OwnerType {
  User = "user",
}

export interface Tracks {
  href:  string;
  total: number;
}

export enum ItemType {
  Playlist = "playlist",
}
