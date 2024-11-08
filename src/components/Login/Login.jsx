import React from 'react';
import { useTranslation } from 'react-i18next';
import './login.scss';
import { FaCircleXmark } from "react-icons/fa6";
import { FaLock, FaUser } from "react-icons/fa";

const Login = (props) => {
    const { t } = useTranslation();

    return (
        <form method="POST" className="sign-in-form">
            <h2 className="title">{t('Log In')}</h2>
            <div className="login-error" id="show-login-error">
                <FaCircleXmark className='icon' />
                <p className="msg-sign-in"></p>
            </div>
            <div className="input-field">
                <FaUser className='icon' />
                <input type="text" placeholder={t('username')} name="username" id="sign-in-username" required autoFocus autoComplete="username" />
            </div>
            <div className="input-field">
                <FaLock className='icon' />
                <input type="password" placeholder={t('password')} name="password" id="sign-in-password" required autoComplete="current-password" />
            </div>
            {/* Remember Me */}
            <div className="check-box-remember-me">
                <label htmlFor="remember_me">
                    <input id="remember_me" type="checkbox" name="remember" />
                    <span>{t('remember me')}</span>
                </label>
            </div>
            <button className='btn' type='submit'>{t('LOG IN')}</button>
            <a href="#forgotpassword" className='forgot-password'>{t('forgot your password?')}</a>
            <p className="account-text">{t('don\'t have an account?')} <a href='#signup' id="sign-up-btn2" onClick={() => { props.toggleSignUpMode(); props.changePath('/signup'); }}>{t('Sign Up')}</a></p>
        </form>
    );
}

export default Login;