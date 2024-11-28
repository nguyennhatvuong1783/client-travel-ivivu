import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../App";
import Navbar from "../components/Navbar/Navbar";
import LoginRegister from "../pages/Auth/LoginRegister";
import Fillter from "../pages/Public/Fillter";
import { WithFooter } from "../components/Footer/Footer";
import TourDetailPage from "../pages/Public/TourDetailPage";
import Dashboard from "../pages/Admin/Dashboard";
import Users from "../components/Dashboard/Users/Users";
import {
    PrivateAdminRoute,
    AuthRedirectRoute,
    PrivateUserRoute,
} from "../components/PrivateRoute/PrivateRoute";
import Profile from "../pages/Auth/Profile";
import MyBooking from "../pages/Auth/MyBooking/MyBooking";

const AppRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route element={<WithFooter />}>
                    <Route path="/" element={<App />} />
                    <Route path="/filter" element={<Fillter />} />
                    <Route path="/detail" element={<TourDetailPage />} />
                </Route>
                <Route element={<PrivateUserRoute />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/my_booking" element={<MyBooking />} />
                </Route>
                <Route element={<AuthRedirectRoute />}>
                    <Route path="/login" element={<LoginRegister />} />
                    <Route path="/signup" element={<LoginRegister />} />
                </Route>
                <Route element={<PrivateAdminRoute />}>
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route index element={<>statistical</>} />
                        <Route path="statistical" element={<>statistical</>} />
                        <Route path="booking" element={<>booking</>} />
                        <Route
                            path="tour_package"
                            element={<>tour_package</>}
                        />
                        <Route path="destination" element={<>destination</>} />
                        <Route path="tour_date" element={<>tour_date</>} />
                        <Route path="users" element={<Users />} />
                        <Route path="promotion" element={<>promotion</>} />
                        <Route path="review" element={<>review</>} />
                        <Route path="activity" element={<>activity</>} />
                        <Route path="tour_guide" element={<>tour_guide</>} />
                        <Route
                            path="accommodation"
                            element={<>accommodation</>}
                        />
                        <Route path="vehicle" element={<>vehicle</>} />
                        <Route path="company" element={<>company</>} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
};

export default AppRoutes;
