import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <>
            <Sidebar />
            <div style={{
                margin: "13vh 30px 0 350px",
            }}>
                <Outlet />
            </div>
        </>
    );
};

export default Dashboard;