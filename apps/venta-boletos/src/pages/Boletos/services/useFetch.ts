import { useState, useEffect, useCallback } from 'react';

// Ahora el hook acepta un query (string) y hace la petición cuando cambia
const useFetch = (query?: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData  = useCallback(async (q: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log("fetching url query: ", q);
      const response = await fetch(`http://localhost:3002/api/precio?${q}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("response: ", response);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const jsonData = await response.json();
      console.log("data: ", jsonData);
      setData(jsonData);
      

    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Ejecuta la petición automáticamente cuando cambia `query`
  useEffect(() => {
    if (query && query.length > 0) {
      fetchData(query);
    } else {
      // Si no hay query, resetea estados
      setData(null);
      setError(null);
      setLoading(false);
    }
  }, [query, fetchData]);

  return { data, loading, error, fetchData };
};

export default useFetch;
