import { useContext, useEffect } from "react";

import ScreenContainer from "@/src/components/common/screen-container.component";
import Search from "@/src/components/search";
import { StateContext } from "@/src/context/state-context";
import { useSearchMovies } from "@/src/hooks/useSearchMovies";

const SearchScreen = () => {
  const { searchResults, setState, topRatedMovies } = useContext(StateContext);
  const { data, isFetching, submitQuery, isLoadingMore } = useSearchMovies();
  const topTenMovies = topRatedMovies?.results?.slice(0, 10);
  const currentPage = searchResults?.page ?? 0;
  const movieResults = searchResults?.results ?? [];
  const hasResult = movieResults.length > 0;
  const totalPages = searchResults?.total_pages ?? 0;
  const isEndOfResult = currentPage === totalPages;
  const page = searchResults?.page ?? 0;
  const totalResult = searchResults?.total_results ?? 0;
  const noResult = totalPages === 1 && totalResult === 0;
  const initialSearch = totalPages === 0 && totalResult === 0;

  useEffect(() => {
    if (!isFetching && setState) {
      setState({
        searchResults: data,
      });
    }
  }, [isFetching]);

  const clearSearch = () => {
    submitQuery("");
  };

  useEffect(() => {
    if (
      !isLoadingMore &&
      setState &&
      searchResults?.results &&
      searchResults?.results?.length > 0 &&
      data?.results &&
      data?.results?.length > 0
    ) {
      setState({
        searchResults: {
          ...data,
          results: [...searchResults?.results, ...data?.results],
        },
      });
    }
  }, [isLoadingMore]);

  return (
    <ScreenContainer>
      <Search
        clearSearch={clearSearch}
        isEndOfResult={isEndOfResult}
        isLoadingMore={isLoadingMore}
        isFetching={isFetching}
        submitQuery={submitQuery}
        movieResults={movieResults}
        page={page}
        hasResult={hasResult}
        suggestedMovies={topTenMovies}
        initialSearch={initialSearch}
        noResult={noResult}
      />
    </ScreenContainer>
  );
};

export default SearchScreen;
