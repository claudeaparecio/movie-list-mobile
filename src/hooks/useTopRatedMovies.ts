import { useEffect, useState } from "react";
import { get } from "../api";
import { topRatedMoviesUrl } from "../constants/request-urls";

export const useTopRatedMovies = (page?: number) => {
  const [data, setData] = useState<ApiResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchData = async (page?: number) => {
    setIsLoading(true);
    try {
      const response = await get(`${topRatedMoviesUrl}&page=${page}`);
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  const nextPage = (page?: number) => {
    fetchData(page);
  };

  useEffect(() => {
    fetchData(page);
  }, []);

  return { data, isLoading, error, nextPage };
};
