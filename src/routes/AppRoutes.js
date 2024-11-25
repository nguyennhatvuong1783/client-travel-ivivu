import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import Navbar from '../components/Navbar/Navbar';
import LoginRegister from '../pages/Auth/LoginRegister';
import Fillter from '../pages/Public/Fillter';
import { WithFooter } from '../components/Footer/Footer';
import TourDetailPage from '../pages/Public/TourDetailPage';
import Dashboard from '../pages/Admin/Dashboard';

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
                <Route path='/dashboard' element={<Dashboard />}>
                    <Route index element={<>statistical</>} />
                    <Route path='statistical' element={<>statistical</>} />
                    <Route path='booking' element={<>booking</>} />
                    <Route path='tour_package' element={<>tour_package</>} />
                    <Route path='destination' element={<>destination</>} />
                    <Route path='tour_date' element={<>tour_date</>} />
                    <Route path='users' element={<>users</>} />
                    <Route path='promotion' element={<>promotion</>} />
                    <Route path='review' element={<>review</>} />
                    <Route path='activity' element={<>activity</>} />
                    <Route path='tour_guide' element={<>tour_guide</>} />
                    <Route path='accommodation' element={<>accommodation</>} />
                    <Route path='vehicle' element={<>vehicle</>} />
                    <Route path='company' element={<>company</>} />
                </Route>
            </Routes>
        </>
    );
}

export default AppRoutes;