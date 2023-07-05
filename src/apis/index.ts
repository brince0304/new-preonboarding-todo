import axios, { AxiosInstance } from 'axios';


const axiosInstance = (url: string, options:any) => {
    return axios.create({
        baseURL: url,
        ...options
    })
}

const setInterceptors = (instance: AxiosInstance) => {
    instance.interceptors.request.use(
        function (config) {
            const token = localStorage.getItem('accessToken');
            config.headers.Authorization = token ? `Bearer ${token}` : '';
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        function (response) {
        
            return response;
        },

        function (error) {
            if(error.response.status === 401) {
                localStorage.removeItem('accessToken');
            return Promise.reject(error);
        }
    }
    );
};

const baseURL = 'https://www.pre-onboarding-selection-task.shop/';

export default setInterceptors(axiosInstance(baseURL, { timeout: 10000 }));
