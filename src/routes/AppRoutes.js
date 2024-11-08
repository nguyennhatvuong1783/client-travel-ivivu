import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import Navbar from '../components/Navbar/Navbar';
import LoginRegister from '../pages/Auth/LoginRegister';
import Fillter from '../pages/Public/Fillter';
import { WithFooter } from '../components/Footer/Footer';
import TourDetailPage from '../pages/Public/TourDetailPage';

const AppRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<WithFooter><App /></WithFooter>} />
                <Route path='/login' element={<LoginRegister />} />
                <Route path='/signup' element={<LoginRegister />} />
                <Route path='/filter' element={<WithFooter><Fillter /></WithFooter>} />
                <Route path='/detail' element={<WithFooter><TourDetailPage /></WithFooter>} />
            </Routes>
        </>
    );
}

export default AppRoutes;