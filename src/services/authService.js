import axiosInstance from "./axiosInstance";

export const login = (loginData) => {
    return axiosInstance.post('/api/auth/login', loginData);
};

export const logout = () => {
    return axiosInstance.post('/api/auth/logout');
};

export const register = (registerData) => {
    return axiosInstance.post('/api/auth/register', registerData);
};

export const myInfo = () => {
    return axiosInstance.get('/users', {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sInN1YiI6ImFkbWluIiwiaWF0IjoxNzMyMzUwNjgyLCJleHAiOjE3MzIzNTQyODIsImp0aSI6IjcxZjYxNjRiLWI1MWYtNGJjYy1iYzk3LTdiMmNkNjUzYzE3OSJ9.JyTXHf-x04mCSVt1OSc_3gPmRe2JxMTdVyRVwg2M6qpjRGHV9Hc3Nv9zkBge2FwftiYrVM-KIqp0x4l22l0p8A`,
        }
    });
};  