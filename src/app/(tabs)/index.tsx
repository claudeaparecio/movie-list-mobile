import { useContext, useEffect } from "react";

import ScreenContainer from "@/src/components/common/screen-container.component";
import { StateContext } from "@/src/context/state-context";
import Home from "@/src/components/home";
import { useTopRatedMovies } from "@/src/hooks/useTopRatedMovies";

const HomeScreen = () => {
  const { topRatedMovies, setState, genres } = useContext(StateContext);
  const topTenMovies = topRatedMovies?.results?.slice(0, 10) ?? [];
  const movies = topRatedMovies?.results?.slice(10);
  const currentPage = topRatedMovies?.page ?? 0;
  const isEndOfResult = currentPage === topRatedMovies?.total_pages;
  const { nextPage, isLoading, data } = useTopRatedMovies();

  const loadMore = () => {
    const page = topRatedMovies?.page ?? 1;
    nextPage(page + 1);
  };

  useEffect(() => {
    if (!isLoading) {
      if (
        setState &&
        topRatedMovies?.results &&
        topRatedMovies?.results?.length > 0 &&
        data?.results &&
        data?.results?.length > 0
      ) {
        setState({
          topRatedMovies: {
            ...data,
            results: [...topRatedMovies?.results, ...data?.results],
          },
        });
      }
    }
  }, [isLoading]);

  return (
    <ScreenContainer>
      <Home
        genres={genres}
        loadMore={loadMore}
        loadingMore={isLoading}
        movies={movies}
        topTenMovies={topTenMovies}
        isEndOfResult={isEndOfResult}
      />
    </ScreenContainer>
  );
};

export default HomeScreen;
