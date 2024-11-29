import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./login.scss";
import { FcGoogle } from "react-icons/fc";
import { FaCircleXmark } from "react-icons/fa6";
import { FaLock, FaUser, FaFacebook } from "react-icons/fa";
import {
    login,
    myInfo,
    sendOTP,
    socialLogin,
    socialLoginCallback,
    checkOTP,
    updatePassword,
} from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Swal from "sweetalert2";

const Login = (props) => {
    const Swal = require("sweetalert2");
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [msgError, setMsgError] = useState("");
    const [isCorrectOTP, setIsCorrectOTP] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);

        const state = queryParams.get("state");
        const code = queryParams.get("code");

        if (state === "google") {
            LoginCallback(code, state);
        }

        console.log({ state, code });
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ username, password });
            console.log(response);
            const userInfo = await myInfo();
            setUser(userInfo.data.data);
            navigate("/dashboard");
        } catch (err) {
            setError(true);
            if (
                err.response.data != null &&
                err.response.data === "Incorrect username or password"
            ) {
                setMsgError(t("LoginError"));
            } else {
                setMsgError(t("MsgError"));
            }
            console.log(err);
        }
    };

    const LoginCallback = async (code, type) => {
        try {
            const response = await socialLoginCallback(code, type);
            console.log(response);
            const userInfo = await myInfo();
            setUser(userInfo.data.data);
            navigate("/");
        } catch (err) {
            setError(true);
            console.log(err);
        }
    };

    const handleSocialLogin = async (e, type) => {
        e.preventDefault();
        console.log(type);
        try {
            const response = await socialLogin(type);
            console.log(response);
            // const userInfo = await myInfo();
            // setUser(userInfo.data.data);
            window.location.href = response.data;
        } catch (err) {
            setError(true);
            console.log(err);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const { value: email } = await Swal.fire({
                title: "Input email address",
                input: "email",
                inputLabel: "Your email address",
                inputPlaceholder: "Enter your email address",
            });
            if (email) {
                try {
                    await sendOTP(email);
                    const inputValue = "";
                    const { value: otpCode } = await Swal.fire({
                        title: "Enter OTP Code",
                        input: "text",
                        inputLabel: `OTP code has been sent to ${email}`,
                        inputValue,
                        showCancelButton: true,
                        inputValidator: async (value) => {
                            if (!value) {
                                return "You need to write OTP code!";
                            } else {
                                try {
                                    await checkOTP(value, email);
                                    setIsCorrectOTP(true);
                                } catch (err) {
                                    console.error(err);
                                    return "Incorrect OTP code!";
                                }
                            }
                        },
                    });
                    if (otpCode && isCorrectOTP) {
                        const { value: formValues } = await Swal.fire({
                            title: "Create a new password",
                            html: `
    <input type="password" id="swal-input1" class="swal2-input" placeholder=${t(
        "password"
    )}>
    <input type="password" id="swal-input2" class="swal2-input" placeholder=${t(
        "confirm password"
    )}>
  `,
                            focusConfirm: false,
                            preConfirm: () => {
                                const password =
                                    document.getElementById(
                                        "swal-input1"
                                    ).value;
                                const confirmPassword =
                                    document.getElementById(
                                        "swal-input2"
                                    ).value;

                                if (!password) {
                                    Swal.showValidationMessage(
                                        "You need to write password!"
                                    );
                                    return;
                                }

                                if (!confirmPassword) {
                                    Swal.showValidationMessage(
                                        "You need to write confirm password!"
                                    );
                                    return;
                                }

                                if (password !== confirmPassword) {
                                    Swal.showValidationMessage(
                                        "Confirm password incorrect!"
                                    );
                                    return;
                                }

                                // Trả về giá trị hợp lệ
                                return [password, confirmPassword];
                            },
                        });
                        if (formValues && formValues[0] === formValues[1]) {
                            try {
                                const value = {
                                    password: formValues[0],
                                    repeatPassword: formValues[1],
                                };
                                await updatePassword(email, value);
                            } catch (err) {
                                console.error(err);
                            }
                        }
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire({
                        position: "top",
                        title: "Oops!",
                        text: `Account is not exist!`,
                        icon: "error",
                    });
                }
            }
        } catch (err) {
            setError(true);
            console.log(err);
        }
    };

    return (
        <form method="POST" className="sign-in-form" onSubmit={handleLogin}>
            <h2 className="title">{t("Log In")}</h2>
            <div
                className={`login-error ${
                    error === true ? "active-error" : ""
                }`}
                id="show-login-error"
            >
                <FaCircleXmark className="icon" />
                <p className="msg-sign-in">{msgError}</p>
            </div>
            <div className="input-field">
                <FaUser className="icon" />
                <input
                    type="text"
                    placeholder={t("username")}
                    name="username"
                    id="sign-in-username"
                    required
                    autoFocus
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="input-field">
                <FaLock className="icon" />
                <input
                    type="password"
                    placeholder={t("password")}
                    name="password"
                    id="sign-in-password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {/* Remember Me */}
            <div className="check-box-remember-me">
                <label htmlFor="remember_me">
                    <input id="remember_me" type="checkbox" name="remember" />
                    <span>{t("remember me")}</span>
                </label>
            </div>
            <button className="btn" type="submit">
                {t("LOG IN")}
            </button>
            <a
                href="#forgotpassword"
                className="forgot-password"
                onClick={handleForgotPassword}
            >
                {t("forgot your password?")}
            </a>
            <p className="account-text">
                {t("don't have an account?")}{" "}
                <a
                    href="#signup"
                    id="sign-up-btn2"
                    onClick={() => {
                        props.toggleSignUpMode();
                        props.changePath("/signup");
                    }}
                >
                    {t("Sign Up")}
                </a>
            </p>
            <div className="socialLogin">
                <FaFacebook
                    className="icon"
                    onClick={(e) => handleSocialLogin(e, "facebook")}
                />
                <FcGoogle
                    className="icon"
                    onClick={(e) => handleSocialLogin(e, "google")}
                />
            </div>
        </form>
    );
};

export default Login;
