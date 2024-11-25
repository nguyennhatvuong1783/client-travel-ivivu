import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <>
            <Sidebar />
            <div style={{
                margin: "10vh 0 0 320px",
            }}>
                <Outlet />
            </div>
        </>
    );
};

export default Dashboard;