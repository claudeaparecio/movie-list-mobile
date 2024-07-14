import { useEffect, useState } from "react";
import { get } from "../api";

export const useTopRatedMovies = (url: string) => {
  const [data, setData] = useState<TopRatedMovies>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await get(url);
      const responseData = await response.json();
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

  return { data, isLoading, error };
};
