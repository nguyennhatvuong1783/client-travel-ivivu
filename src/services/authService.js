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

export const getTourPackages = () => {
    return axiosInstance.get(`/tour_package/?size=100`);
};

export const getMyBooking = (user_id) => {
    return axiosInstance.get(`/booking/user/${user_id}`);
};

export const socialLogin = (type) => {
    return axiosInstance.get(`/api/auth/social-login?login-type=${type}`);
};

export const socialLoginCallback = (code, type) => {
    return axiosInstance.get(
        `/api/auth/social/callback?code=${code}&login-type=${type}`
    );
};

export const getTourPackagesById = (id) => {
    return axiosInstance.get(`/tour_package/${id}`);
};

export const getTourDatesByPackageId = (id) => {
    return axiosInstance.get(`/tour-date/package/${id}`);
};

export const createBooking = (value) => {
    return axiosInstance.post(`/booking/create`, value);
};

export const sendOTP = (email) => {
    return axiosInstance.post(`/forgotPassword/verifyMail/${email}`);
};

export const checkOTP = (otp, email) => {
    return axiosInstance.post(`/forgotPassword/verifyOtp/${otp}/${email}`);
};

export const vnpay = (paymentRequest) => {
    return axiosInstance.post(`/api/auth/payment/vnpay`, paymentRequest);
};

export const zalopay = (value) => {
    return axiosInstance.post(`/api/auth/payment/zalopay`, value);
};

export const updateStatusBooking = (status, id) => {
    return axiosInstance.put(`/booking/${status}/${id}`);
};

export const vnpayConfirm = (bookingId, vnp_TransactionNo) => {
    return axiosInstance.put(
        `/api/auth/payment/confirm/${bookingId}`,
        vnp_TransactionNo
    );
};
