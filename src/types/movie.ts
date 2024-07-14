interface TopRatedMovie {
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
};

type Genre = {
  id: number;
  name: string;
};

type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

interface MovieDetails extends TopRatedMovie {
  budget: number;
  genres: Genre[];
  imdb_id: string;
  origin_country: string[];
  production_companies: ProductionCompany[];
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
};

interface TopRatedMovies {
  page?: number;
  results?: TopRatedMovie[];
  total_pages?: number;
  total_results?: number;
};
