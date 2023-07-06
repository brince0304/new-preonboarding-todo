import axios, { AxiosInstance } from 'axios';

const client = (options?: any) => {
  return axios.create({
    baseURL: baseURL,
    ...options,
  });
};

const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('token');
      config.headers.Authorization = token ? `Bearer ${token}` : '';
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function (response) {
      return response;
    },

    function (error) {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
      }
      return Promise.reject(error);
    },
  );
  return instance;
};

const baseURL = 'https://www.pre-onboarding-selection-task.shop/';

export default setInterceptors(client());