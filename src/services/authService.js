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
    return axiosInstance.get('/myInfo');
};

export const getUsers = () => {
    return axiosInstance.get('/users');
};

export const deleteUser = (id) => {
    return axiosInstance.delete(`/user/${id}`);
};