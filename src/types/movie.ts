interface Movie {
  adult: boolean;
  backdrop_path: string;
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
  genre_ids: number[];
}

type Genre = {
  id?: number;
  name?: string;
};

type SpokenLangues = {
  name: string;
};

interface MovieDetails extends Movie {
  budget: number;
  genres: Genre[];
  imdb_id: string;
  origin_country: string[];
  production_companies: ProductionCompany[];
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  spoken_languages: SpokenLangues[];
  homepage: string;
}

type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

interface ApiResponse {
  page?: number;
  results?: Movie[];
  total_pages?: number;
  total_results?: number;
}

interface GenresResponse {
  genres: Genre[];
}

interface Cast {
  name: string;
  profile_path: string;
  character: string;
  id: string;
}

interface CreditsApiResponse {
  id: number;
  cast: Cast[];
}
