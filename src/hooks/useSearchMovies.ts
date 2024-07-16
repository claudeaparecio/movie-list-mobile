import { useState } from "react";
import { get } from "../api";
import { searchMoviesUrl } from "../constants/request-urls";
import { defaultResponseState } from "../constants/values";

export const useSearchMovies = () => {
  const [data, setData] = useState<ApiResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<any>(null);

  const submitQuery = async (query?: string, page?: number) => {
    if (page && page > 1) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }

    if (!query) {
      setTimeout(() => {
        setData(defaultResponseState);
        setIsLoading(false);
        setIsLoadingMore(false);
      }, 100);
      return;
    }

    try {
      const response = await get(
        `${searchMoviesUrl}&query=${query}&page=${page}`
      );
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      setError(error);
    }
    if (page && page > 1) {
      setIsLoadingMore(false);
    } else {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, submitQuery, isLoadingMore };
};
