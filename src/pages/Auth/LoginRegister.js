import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/css/Auth.css';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginRegister = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSignUpMode, setIsSignUpMode] = useState(false);

    const changePath = (path) => {
        navigate(path, { replace: true })
    }

    const toggleSignUpMode = () => {
        setIsSignUpMode(!isSignUpMode);
    }

    useEffect(() => {
        if (location.pathname === '/signup') {
            setIsSignUpMode(true);
        }
    }, [location.pathname]);

    return (
        <div className="content">
            <div className={`container${isSignUpMode ? ' sign-up-mode sign-up-mode2' : ''}`}>
                <div className="signin-signup">
                    <Login toggleSignUpMode={toggleSignUpMode} changePath={changePath} />
                    <Register toggleSignUpMode={toggleSignUpMode} changePath={changePath} />
                </div>
                <div className="panels-container">
                    <div className="panel left-panel">
                        <h3>{t('have an account?')}</h3>
                        <button className="btn" id="sign-in-btn" onClick={() => { toggleSignUpMode(); changePath('/login'); }}>{t('LOG IN')}</button>
                    </div>
                    <div className="panel right-panel">
                        <h3>{t('don\'t have an account?')}</h3>
                        <button className="btn" id="sign-up-btn" onClick={() => { toggleSignUpMode(); changePath('/signup'); }}>{t('SIGN UP')}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginRegister;