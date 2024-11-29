import axiosInstance from "./axiosInstance";

export const login = (loginData) => {
    return axiosInstance.post("/api/auth/login", loginData);
};

export const logout = () => {
    return axiosInstance.post("/api/auth/logout");
};

export const register = (registerData) => {
    return axiosInstance.post("/api/auth/register", registerData);
};

export const myInfo = () => {
    return axiosInstance.get("/myInfo");
};

export const getUsers = () => {
    return axiosInstance.get("/users");
};

export const deleteUser = (id) => {
    return axiosInstance.delete(`/user/${id}`);
};

export const updateUser = (userId, values) => {
    return axiosInstance.put(`/user/${userId}`, values);
};

export const updatePassword = (email, values) => {
    return axiosInstance.post(
        `/forgotPassword/changePassword/${email}`,
        values
    );
};

export const getBooking = () => {
    return axiosInstance.get(`/booking/`);
};

export const getDestinations = () => {
    return axiosInstance.get(`/destination/`);
};

export const getTourDates = () => {
    return axiosInstance.get(`/tour-date/`);
};

export const getPromotions = () => {
    return axiosInstance.get(`/promotion/`);
};

export const getActivities = () => {
    return axiosInstance.get(`/activity/`);
};

export const getAccommodations = () => {
    return axiosInstance.get(`/accommodation/`);
};

export const getReviews = () => {
    return axiosInstance.get(`/review/package/0`);
};

export const getTourGuides = () => {
    return axiosInstance.get(`/tour-guide/`);
};

export const getVehicles = () => {
    return axiosInstance.get(`/vehicle/`);
};

export const getCompanies = () => {
    return axiosInstance.get(`/company/`);
};
