import { useEffect, useState } from "react";
import { get } from "../api";
import { movieCreditsUrl } from "../constants/request-urls";

export const useMovieCredits = (id: number) => {
  const [data, setData] = useState<CreditsApiResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await get(movieCreditsUrl(id));
      const responseData = await response.json();
      console.log(id, responseData.cast[0]);
      setData(responseData);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error, setData };
};
