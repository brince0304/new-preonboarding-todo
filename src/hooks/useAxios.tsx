import { useState } from 'react';

const useAxios = (api: (data?: any) => Promise<any>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const request = async (data?: any) => {
    try {
      setLoading(true);
      const response = await api(data);
      setLoading(false);
      if (response?.data) {
        setData(response?.data);
        setError(null);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  return { loading, error, data, request };
};

export default useAxios;
