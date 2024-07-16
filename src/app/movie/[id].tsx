import BackButton from "@/src/components/common/back-button.component";
import Loading from "@/src/components/common/loading.modal";
import ScreenContainer from "@/src/components/common/screen-container.component";
import MovieDetails from "@/src/components/movie-details";
import { defaultColors } from "@/src/constants/styles";
import { useMovieCredits } from "@/src/hooks/useMovieCredits";
import { useMovieDetails } from "@/src/hooks/useMovieDetails";
import { useLocalSearchParams } from "expo-router";

const MovieDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const movieId = Number(id);
  const { data: movie, isLoading: isFetchingMovie } = useMovieDetails(movieId);
  const { data: credits, isLoading: isFetchingCredits } = useMovieCredits(
    movieId
  );

  if (isFetchingMovie || isFetchingCredits) {
    return <Loading />;
  }

  return (
    <ScreenContainer backgroundColor={defaultColors.tristesse} safeView={false}>
      <BackButton />
      {movie && credits && <MovieDetails cast={credits?.cast} movie={movie} />}
    </ScreenContainer>
  );
};

export default MovieDetailsScreen;
