import axios, { AxiosRequestConfig, AxiosError } from "axios";
import refreshTokenFn from "./refreshToken";
import { baseUrl } from "./constants";


axios.defaults.baseURL = baseUrl;

axios.interceptors.request.use(
    async (config:any) => {
        const localStorageSession:string| null=localStorage.getItem("session");
    let localSession ;
   if(localStorageSession!=null){
    localSession= JSON.parse(localStorageSession);
   }

        if (localSession?.accessToken) {
            config.headers= {
                ...config.headers,
                authorization: `Bearer ${localSession?.accessToken}`,
                
            };
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error?.config;

        if (error?.response?.status === 401 && !config?.sent) {
            config.sent = true;

            const result = await refreshTokenFn();

            if (result?.accessToken) {
                config.headers = {
                    ...config.headers,
                    authorization: `Bearer ${result?.accessToken}`,
                };
            }

            return axios(config);
        }
        return Promise.reject(error);
    }
);

export const axiosPrivate = axios;