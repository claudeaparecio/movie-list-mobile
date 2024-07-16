import { useEffect, useState } from "react";
import { get } from "../api";
import { movieDetailsUrl } from "../constants/request-urls";

export const useMovieDetails = (id: number) => {
  const [data, setData] = useState<MovieDetails>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await get(`${movieDetailsUrl}/${id}`);
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error, setData };
};
