
import axios from 'axios';
import { getStorage, setStorage } from './utils';

const customAxios = axios.create({});

// Step-2: Create request, response & error handlers
const requestHandler = request => {
    // Token will be dynamic so we can use any app-specific way to always   
    // fetch the new token before making the call
    const token = getStorage('token');
    request.headers.token = token;

    return request;
};

const responseHandler = response => {
    if (response.status === 401) {
        window.location = '/login';
        setStorage('token','');
        setStorage('lIn',0);
    }

    return response;
};

const errorHandler = error => {
    // console.log(`Error ${error.message}`)
    return Promise.reject(error);
};

// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);


// Step-4: Export the newly created Axios instance to be used in different locations.
export default customAxios;