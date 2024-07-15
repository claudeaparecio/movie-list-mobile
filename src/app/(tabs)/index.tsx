import { useContext, useEffect, useState } from "react";

import ScreenContainer from "@/src/components/common/screen-container.component";
import { StateContext } from "@/src/context/state-context";
import Home from "@/src/components/home/home.component";
import { useTopRatedMovies } from "@/src/hooks/useTopRatedMovies";

const HomeScreen = () => {
  const { topRatedMovies, setState } = useContext(StateContext);
  const topTenMovies = topRatedMovies?.results?.slice(0, 10) ?? [];
  const movies = topRatedMovies?.results?.slice(10);
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
        loadMore={loadMore}
        loadingMore={isLoading}
        movies={movies}
        topTenMovies={topTenMovies}
      />
    </ScreenContainer>
  );
};

export default HomeScreen;
