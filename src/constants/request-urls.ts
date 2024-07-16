export const topRatedMoviesUrl =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US";
export const searchMoviesUrl = "https://api.themoviedb.org/3/search/movie?";
export const genresUrl =
  "https://api.themoviedb.org/3/genre/movie/list?language=en";
export const movieDetailsUrl = "https://api.themoviedb.org/3/movie";
export const movieCreditsUrl = (id: number) =>
  `https://api.themoviedb.org/3/movie/${id}/credits`;
