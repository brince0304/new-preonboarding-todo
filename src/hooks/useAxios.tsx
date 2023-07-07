import { useState } from 'react';

const useAxios = ({ api, errorCallback, successCallback }: IUseAxiosProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const request = async (data?: any) => {
    try {
      setLoading(true);
      const response = await api(data);
      if (response) {
        setData(response);
      }
      setError(null);
      setLoading(false);
      successCallback && successCallback();
    } catch (error) {
      setError(error);
      setLoading(false);
      errorCallback && errorCallback();
    }
  };
  return { loading, error, data, request };
};

interface IUseAxiosProps {
  api: (data?: any) => Promise<any>;
  errorCallback?: () => void;
  successCallback?: () => void;
}

export default useAxios;
