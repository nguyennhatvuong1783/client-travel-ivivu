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
import { useLoading } from "../../context/loadingContext";

const Login = (props) => {
    const Swal = require("sweetalert2");
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const { setPageLoading } = useLoading();

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
            setPageLoading(true);
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
        } finally {
            setPageLoading(false);
        }
    };

    const LoginCallback = async (code, type) => {
        try {
            setPageLoading(true);
            const response = await socialLoginCallback(code, type);
            console.log(response);
            const userInfo = await myInfo();
            setUser(userInfo.data.data);
            navigate("/");
        } catch (err) {
            setError(true);
            console.log(err);
        } finally {
            setPageLoading(false);
        }
    };

    const handleSocialLogin = async (e, type) => {
        e.preventDefault();
        console.log(type);
        try {
            setPageLoading(true);
            const response = await socialLogin(type);
            console.log(response);
            window.location.href = response.data;
        } catch (err) {
            setError(true);
            console.log(err);
        } finally {
            setPageLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            const email = await getEmailInput();
            if (!email) return;

            setPageLoading(true);
            await sendOTP(email); // Gửi OTP
            setPageLoading(false);

            const isOTPVerified = await verifyOTP(email);
            if (!isOTPVerified) return;

            const newPassword = await getNewPassword();
            if (!newPassword) return;

            await updateUserPassword(email, newPassword);
            Swal.fire({
                position: "top",
                title: "Success!",
                text: "Password updated successfully.",
                icon: "success",
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                position: "top",
                title: "Error",
                text: "An error occurred. Please try again later.",
                icon: "error",
            });
        } finally {
            setPageLoading(false);
        }
    };

    // Hàm nhập email
    const getEmailInput = async () => {
        const { value: email } = await Swal.fire({
            title: "Input email address",
            input: "email",
            inputLabel: "Your email address",
            inputPlaceholder: "Enter your email address",
            showCancelButton: true,
        });
        return email || null;
    };

    // Hàm kiểm tra OTP
    const verifyOTP = async (email) => {
        try {
            const { value: otpCode } = await Swal.fire({
                title: "Enter OTP Code",
                input: "text",
                inputLabel: `OTP code has been sent to ${email}`,
                inputPlaceholder: "Enter your OTP code",
                showCancelButton: true,
                inputValidator: async (value) => {
                    if (!value) return "You need to write OTP code!";
                    try {
                        setPageLoading(true);
                        await checkOTP(value, email); // Gọi API kiểm tra OTP
                        return null;
                    } catch {
                        return "Incorrect OTP code!";
                    } finally {
                        setPageLoading(false);
                    }
                },
            });
            return !!otpCode;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    // Hàm nhập mật khẩu mới
    const getNewPassword = async () => {
        const { value: formValues } = await Swal.fire({
            title: "Create a new password",
            html: `
            <input type="password" id="swal-input1" class="swal2-input" placeholder="Enter new password">
            <input type="password" id="swal-input2" class="swal2-input" placeholder="Confirm new password">
        `,
            focusConfirm: false,
            preConfirm: () => {
                const password = document.getElementById("swal-input1").value;
                const confirmPassword =
                    document.getElementById("swal-input2").value;

                // Kiểm tra mật khẩu
                if (!password)
                    return Swal.showValidationMessage(
                        "You need to write password!"
                    );
                if (password.length < 8 || password.length > 20)
                    return Swal.showValidationMessage(
                        "Password must be between 8 and 20 characters!"
                    );

                // Kiểm tra xác nhận mật khẩu
                if (!confirmPassword)
                    return Swal.showValidationMessage(
                        "You need to write confirm password!"
                    );
                if (password !== confirmPassword)
                    return Swal.showValidationMessage(
                        "Passwords do not match!"
                    );

                return { password, confirmPassword };
            },
        });

        return formValues || null;
    };

    // Hàm cập nhật mật khẩu
    const updateUserPassword = async (email, { password, confirmPassword }) => {
        try {
            setPageLoading(true);
            await updatePassword(email, {
                password,
                repeatPassword: confirmPassword,
            });
        } catch (err) {
            console.error(err);
            throw new Error("Failed to update password");
        } finally {
            setPageLoading(false);
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
