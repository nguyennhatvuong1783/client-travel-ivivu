import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import Navbar from '../components/Navbar/Navbar';
import LoginRegister from '../pages/Auth/LoginRegister';

const AppRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/login' element={<LoginRegister />} />
                <Route path='/signup' element={<LoginRegister />} />
            </Routes>
        </>
    );
}

export default AppRoutes;