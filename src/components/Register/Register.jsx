import React from 'react';
import { useTranslation } from 'react-i18next';
import './register.scss';
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";

const Register = (props) => {
    const { t } = useTranslation();

    return (
        <form method="POST" className="sign-up-form">
            <h2 className="title">{t('Sign Up')}</h2>
            <div className="input-field" id="error-field-sign-up-name">
                <FaUser className='icon' />
                <input type="text" placeholder={t('name')} name="name" id="sign-up-name" required autoComplete="name" />
            </div>
            <p className="msg-sign-up-name" id="msg-error"></p>
            <div className="input-field" id="error-field-sign-up-email">
                <FaEnvelope className='icon' />
                <input type="email" placeholder="Email" name="email" id="sign-up-email" required autoComplete="username" />
            </div>
            <p className="msg-sign-up-email" id="msg-error"></p>
            <div className="input-field" id="error-field-sign-up-phone">
                <FaPhone className='icon' />
                <input type="tel" placeholder={t('phone')} name="phone" id="sign-up-phone" required autoComplete="tel" />
            </div>
            <p className="msg-sign-up-phone" id="msg-error"></p>
            <div className="input-field" id="error-field-sign-up-password">
                <FaLock className='icon' />
                <input type="password" placeholder={t('password')} name="password" id="sign-up-password" required autoComplete="new-password" />
            </div>
            <p className="msg-sign-up-password" id="msg-error"></p>
            <div className="input-field" id="error-field-sign-up-confirm-password">
                <FaLock className='icon' />
                <input type="password" placeholder={t('confirm password')} name="password_confirmation" id="sign-up-confirm-password" required autoComplete="new-password" />
            </div>
            <p className="msg-sign-up-confirm-password" id="msg-error"></p>
            <button className='btn' type='submit' id='btn-register'>{t('SIGN UP')}</button>
            <p className="account-text">{t('have an account?')} <a href='#login' id="sign-in-btn2" onClick={() => { props.toggleSignUpMode(); props.changePath('/login'); }}>{t('Log In')}</a></p>
        </form>
    );
}

export default Register;