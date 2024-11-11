import { useState, useEffect, useCallback } from "react";

export const fetchAPI = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}, URL: ${url}`);
      const errorText = await response.text();
      console.error("Error Response Text:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    try {
      return await response.json();
    } catch (jsonError) {
      console.error("JSON Parse Error: Unexpected response format");
      const errorText = await response.text();
      console.error("Response Text:", errorText);
      throw new SyntaxError("JSON Parse error");
    }
  } catch (error) {
    console.error("Fetch error at:", error.stack);
    throw error;
  }
};

export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchAPI(url, options);
      setData(result.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
