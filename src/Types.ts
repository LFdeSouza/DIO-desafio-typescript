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
