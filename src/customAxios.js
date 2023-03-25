
import axios from 'axios';
import { getStorage, setStorage } from './utils';

const customAxios = axios.create({});

const requestHandler = request => {
    // Token will be dynamic so we can use any app-specific way to always   
    // fetch the new token before making the call
    const token = getStorage('token');
    request.headers.token = token;

    return request;
};

const responseHandler = response => {
    if (response.status === 401) {
        setStorage("DD_isLoggedIn", false);
        window.location = '/login';
    }

    return response;
};

const errorHandler = error => {
    // console.log(`Error ${error.message}`)
    return Promise.reject(error);
};

customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);

export default customAxios;