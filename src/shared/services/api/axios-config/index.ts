import axios from 'axios';

import { responseInterceptor, errorInterceptor } from './interceptors';
import { Enviroment } from './../../../enviroment/index';

const Api = axios.create({
  baseURL:Enviroment.URL_BASE,
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('APP_ACCESS_TOKEN') || '')}`,
  }
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { Api };