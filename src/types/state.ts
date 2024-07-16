interface State {
  page?: number;
  topRatedMovies?: ApiResponse;
  favoritesMovies?: any[];
  searchResults?: ApiResponse;
  genres?: Genre[]
}
