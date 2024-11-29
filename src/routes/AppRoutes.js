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
import Statistical from "../components/Dashboard/Statistical/Statistical";
import Booking from "../components/Dashboard/Booking/Booking";
import Destinations from "../components/Dashboard/Destinations/Destinations";
import TourDates from "../components/Dashboard/TourDates/TourDates";
import Promotions from "../components/Dashboard/Promotions/Promotions";
import Activities from "../components/Dashboard/Activities/Activities";
import Accommodations from "../components/Dashboard/Accommodations/Accommodations";
import Reviews from "../components/Dashboard/Reviews/Reviews";
import TourGuides from "../components/Dashboard/TourGuides/TourGuides";
import Vehicles from "../components/Dashboard/Vehicles/Vehicles";
import Companies from "../components/Dashboard/Companies/Companies";

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
                        <Route index element={<Statistical />} />
                        <Route path="statistical" element={<Statistical />} />
                        <Route path="booking" element={<Booking />} />
                        <Route
                            path="tour_package"
                            element={<>tour_package</>}
                        />
                        <Route path="destination" element={<Destinations />} />
                        <Route path="tour_date" element={<TourDates />} />
                        <Route path="users" element={<Users />} />
                        <Route path="promotion" element={<Promotions />} />
                        <Route path="review" element={<Reviews />} />
                        <Route path="activity" element={<Activities />} />
                        <Route path="tour_guide" element={<TourGuides />} />
                        <Route
                            path="accommodation"
                            element={<Accommodations />}
                        />
                        <Route path="vehicle" element={<Vehicles />} />
                        <Route path="company" element={<Companies />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
};

export default AppRoutes;
