import React, {useEffect, useState} from 'react';

const useFetch = <T>(url: string, options?: any):[T | null, Error | null, boolean] => {
    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res: Response = await fetch(url, options);
          const json: T = await res.json();
          setResponse(json);
          setIsLoading(false)
        } catch (error) {
          setError(error);
        }
      };
      fetchData();
    }, []);

    return [response, error, isLoading];
};


export default useFetch;