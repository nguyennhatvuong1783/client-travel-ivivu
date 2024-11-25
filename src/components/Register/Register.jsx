import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './register.scss';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaUserEdit } from "react-icons/fa";
import { register } from '../../services/authService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Register = (props) => {
    const { t } = useTranslation();
    const MySwal = withReactContent(Swal);

    const [full_name, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordError, setPasswordError] = useState(false);
    const [msgPasswordError, setMsgPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [msgConfirmPasswordError, setMsgconfirmPasswordError] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [msgPhoneError, setMsgPhoneError] = useState('');

    const inputUsername = useRef();
    const inputPassword = useRef();
    const inputConfirmPassword = useRef();
    const inputPhone = useRef();

    const handleRegister = async (e) => {
        e.preventDefault();
        const passwordRegex = /^[A-Za-z0-9]{8,20}$/;
        const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        if (!regexPhoneNumber.test(phone_number)) {
            inputPhone.current.select();
            return;
        } else if (!passwordRegex.test(password)) {
            inputPassword.current.select();
            return;
        } else if (password !== confirmPassword) {
            inputConfirmPassword.current.select();
            return;
        }
        const Toast = MySwal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = MySwal.stopTimer;
                toast.onmouseleave = MySwal.resumeTimer;
            }
        });
        try {
            const response = await register({ username, password, email, full_name, phone_number });
            Toast.fire({
                icon: "success",
                title: t('Signed up successfully')
            });
        } catch (err) {
            if (err.response.data != null && err.response.data === "Username is already taken") {
                inputUsername.current.select();
                Toast.fire({
                    icon: "error",
                    title: t('UserError')
                });
            } else {
                Toast.fire({
                    icon: "error",
                    title: t('MsgError')
                });
            }
        }
    };

    useEffect(() => {
        const passwordRegex = /^[A-Za-z0-9]{8,20}$/;
        const isPasswordError = !passwordRegex.test(password) && password !== '';
        if (isPasswordError !== passwordError) {
            setPasswordError(isPasswordError);
            setMsgPasswordError(isPasswordError ? t('PasswordError') : '');
        }
    }, [password, passwordError]);

    useEffect(() => {
        const isConfirmPasswordError = password !== confirmPassword && confirmPassword !== '';
        if (isConfirmPasswordError !== confirmPasswordError) {
            setConfirmPasswordError(isConfirmPasswordError);
            setMsgconfirmPasswordError(isConfirmPasswordError ? t('ConfirmPasswordError') : '');
        }
    }, [password, confirmPassword, confirmPasswordError]);

    useEffect(() => {
        const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        const isPhoneError = !regexPhoneNumber.test(phone_number) && phone_number !== '';
        if (isPhoneError !== phoneError) {
            setPhoneError(isPhoneError);
            setMsgPhoneError(isPhoneError ? t('PhoneError') : '');
        }
    }, [phone_number, phoneError]);

    return (
        <form method="POST" className="sign-up-form" onSubmit={handleRegister}>
            <h2 className="title">{t('Sign Up')}</h2>
            <div className="input-field" id="error-field-sign-up-name">
                <FaUserEdit className='icon' />
                <input type="text" placeholder={t('name')} name="name" id="sign-up-name" required autoComplete="name" onChange={e => setFullname(e.target.value)} />
            </div>
            <p className="msg-sign-up-name" id="msg-error"></p>
            <div className="input-field" id="error-field-sign-up-username">
                <FaUser className='icon' />
                <input ref={inputUsername} type="text" placeholder={t('username')} name="username" id="sign-up-username" required autoComplete="username" onChange={e => setUsername(e.target.value)} />
            </div>
            <p className="msg-sign-up-username" id="msg-error"></p>
            <div className="input-field" id="error-field-sign-up-email">
                <FaEnvelope className='icon' />
                <input type="email" placeholder="Email" name="email" id="sign-up-email" required autoComplete="username" onChange={e => setEmail(e.target.value)} />
            </div>
            <p className="msg-sign-up-email" id="msg-error"></p>
            <div className={`input-field${phoneError ? " register-error" : ""}`} id="error-field-sign-up-phone">
                <FaPhone className='icon' />
                <input ref={inputPhone} type="tel" placeholder={t('phone')} name="phone" id="sign-up-phone" required autoComplete="tel" onChange={e => setPhone(e.target.value)} />
            </div>
            <p className="msg-sign-up-phone" id="msg-error">{msgPhoneError}</p>
            <div className={`input-field${passwordError ? " register-error" : ""}`} id="error-field-sign-up-password">
                <FaLock className='icon' />
                <input ref={inputPassword} type="password" placeholder={t('password')} name="password" id="sign-up-password" required autoComplete="new-password" onChange={e => setPassword(e.target.value)} />
            </div>
            <p className="msg-sign-up-password" id="msg-error">{msgPasswordError}</p>
            <div className={`input-field${confirmPasswordError ? " register-error" : ""}`} id="error-field-sign-up-confirm-password">
                <FaLock className='icon' />
                <input ref={inputConfirmPassword} type="password" placeholder={t('confirm password')} name="password_confirmation" id="sign-up-confirm-password" required autoComplete="new-password" onChange={e => setConfirmPassword(e.target.value)} />
            </div>
            <p className="msg-sign-up-confirm-password" id="msg-error">{msgConfirmPasswordError}</p>
            <button className='btn' type='submit' id='btn-register'>{t('SIGN UP')}</button>
            <p className="account-text">{t('have an account?')} <a href='#login' id="sign-in-btn2" onClick={() => { props.toggleSignUpMode(); props.changePath('/login'); }}>{t('Log In')}</a></p>
        </form>
    );
}

export default Register;