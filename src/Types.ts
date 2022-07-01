export interface QueryResponse {
  page: Number;
  results: Film[];
  total_pages: number;
  total_results: number;
}

export interface Film {
  adult: boolean;
  backdrop_path: "/g9ROrZey0JYp7kf8DoAyZtKnObj.jpg";
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface List {
  description: string;
  favorite_count: number;
  id: number;
  items: Film[];
  item_count: number;
  iso_639_1: string;
  list_type: string;
  name: string;
  poster_path: null;
}

export interface ReqTokenRes {
  success?: boolean;
  expires_at?: string;
  request_token?: string;
  status_message?: string;
  status_code?: number;
}

export interface CreateSessionRes {
  success?: boolean;
  session_id?: string;
  status_message?: string;
  status_code?: number;
}

export interface AccountDetailsRes {
  avatar?: any;
  id?: number;
  iso_639_1?: string;
  iso_3166_1?: string;
  name?: string;
  include_adult?: boolean;
  username?: string;
}

export interface ListRes {
  page: number;
  results: List[];
  total_pages: number;
  total_results: number;
  status_code: number;
  status_message: string;
}

export enum ListIndexOperation {
  increment = "increment",
  decrement = "decrement",
}
