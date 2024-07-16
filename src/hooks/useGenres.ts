import { useEffect, useState } from "react";
import { get } from "../api";
import { genresUrl } from "../constants/request-urls";

export const useGenres = () => {
  const [data, setData] = useState<GenresResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await get(genresUrl);
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

  return { data, isLoading, error };
};
