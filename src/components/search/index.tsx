import styled from "styled-components/native";
import SearchBar from "./search-bar.component";
import MovieCard from "./movie-card.component";
import { defaultColors } from "@/src/constants/styles";
import { useEffect, useRef, useState } from "react";
import ScrollButton from "../common/scroll-button.component";
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import LoadingComponent from "../common/loading.component";

const Container = styled.View`
  flex: 1;
`;

const ListFooterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
`;

const LoadMoreButton = styled.TouchableOpacity`
  background-color: ${defaultColors.tristesse};
  border-radius: 7px;
  align-items: center;
  justify-content: center;
  width: 60%;
  padding: 7px;
  height: 40px;
`;

const LoadMoreText = styled.Text`
  color: ${defaultColors.electronBlue};
  font-size: 14px;
  font-family: RobotoMedium;
`;

const FooterText = styled.Text`
  font-size: 14px;
  font-family: RobotoMedium;
  color: ${defaultColors.kodamaWhite};
  margin: 0px 6px;
`;

const Line = styled.View`
  width: 40px;
  height: 1px;
  background-color: ${defaultColors.kodamaWhite};
`;

const ResultsList = styled(ScrollView)`
  margin-top: 16px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  flex: 1;
  text-decoration: underline;
`;

const Separator = styled.View`
  height: 0.5px;
  width: 100%;
  background-color: ${defaultColors.electronBlue};
`;

const ResultLabel = styled.Text`
  font-size: 16px;
  font-family: RobotoMedium;
  color: ${defaultColors.kodamaWhite};
  margin-left: 16px;
`;

const NoResultLabel = styled.Text`
  font-size: 16px;
  text-align: center;
  font-family: RobotoMedium;
  color: ${defaultColors.kodamaWhite};
  margin-left: 16px;
  margin: 16px 0px;
`;

const LoadingContainer = styled.View`
  flex: 1;
`;

interface SearchProps {
  submitQuery: (value: string, page?: number) => void;
  clearSearch: () => void;
  isLoadingMore: boolean;
  isEndOfResult: boolean;
  initialSearch: boolean;
  noResult: boolean;
  hasResult: boolean;
  page: number;
  movieResults?: Movie[];
  suggestedMovies?: Movie[];
  isFetching: boolean;
}

const Search = ({
  submitQuery,
  page,
  isLoadingMore,
  movieResults,
  isEndOfResult,
  hasResult,
  suggestedMovies,
  clearSearch,
  initialSearch,
  isFetching,
  noResult,
}: SearchProps) => {
  const [scrollPosition, setScrollPosition] = useState(-1);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [query, setQuery] = useState("");
  const movies = noResult || initialSearch ? suggestedMovies : movieResults;
  const resultLabel =
    noResult || initialSearch
      ? "Suggested Movies"
      : `Matched results for "${query}"`;
  const noResultLabel = `No matched result for "${query}"`;

  const scrollRef = useRef<any>(null);

  const _clearSearch = () => {
    clearSearch();
    setQuery("");
  };

  const loadMore = () => {
    submitQuery(query, page + 1);
  };

  const triggerQuery = (value: string) => {
    setQuery(value);
    submitQuery(value, 1);
  };

  useEffect(() => {
    if (scrollPosition > 200) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  }, [scrollPosition]);

  const getScrollPosition = (e: any) => {
    const y = e.nativeEvent.contentOffset.y;
    setScrollPosition(y);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const renderLoading = () => (
    <LoadingContainer>
      <LoadingComponent transparent />
    </LoadingContainer>
  );
  const renderResults = () => {
    if (isFetching) return renderLoading();
    return (
      <ResultsList
        ref={scrollRef}
        onScroll={getScrollPosition}
        scrollEventThrottle={16}
      >
        {movies?.map((movie, index) => {
          const isLastIndex = index === movies.length - 1;
          return (
            <View key={`search.result.${movie.id}`}>
              <MovieCard movie={movie} />
              {!isLastIndex && (
                <Separator key={`movie.${movie.id}.separator.${index}`} />
              )}
            </View>
          );
        })}
        {renderListFooter()}
      </ResultsList>
    );
  };

  const renderButton = () => {
    return (
      <LoadMoreButton onPress={loadMore}>
        {isLoadingMore ? (
          <ActivityIndicator size={10} />
        ) : (
          <LoadMoreText>LOAD MORE</LoadMoreText>
        )}
      </LoadMoreButton>
    );
  };

  const renderListFooter = () => {
    if (!hasResult) return null;

    return (
      <ListFooterContainer>
        {isEndOfResult ? (
          <>
            <Line />
            <FooterText>End of Result</FooterText>
            <Line />
          </>
        ) : (
          renderButton()
        )}
      </ListFooterContainer>
    );
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <SearchBar
          clearSearch={_clearSearch}
          query={query}
          triggerQuery={triggerQuery}
        />
        {noResult && !isFetching && <NoResultLabel>{noResultLabel}</NoResultLabel>}
        {!isFetching && <ResultLabel>{resultLabel}</ResultLabel>}
        {renderResults()}
        {showScrollToTop && <ScrollButton scrollToTop={scrollToTop} />}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Search;
