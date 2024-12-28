export interface Following {
  artists: Artists;
}

export interface Artists {
  href:    string;
  limit:   number;
  next:    null;
  cursors: Cursors;
  total:   number;
  items:   Item[];
}

export interface Cursors {
  after: null;
}

export interface Item {
  external_urls: ExternalUrls;
  followers:     Followers;
  genres:        string[];
  href:          string;
  id:            string;
  images:        Image[];
  name:          string;
  popularity:    number;
  type:          string;
  uri:           string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href:  null;
  total: number;
}

export interface Image {
  url:    string;
  height: number;
  width:  number;
}
