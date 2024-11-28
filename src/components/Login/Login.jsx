import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./login.scss";
import { FaCircleXmark } from "react-icons/fa6";
import { FaLock, FaUser } from "react-icons/fa";
import { login, myInfo } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Login = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [msgError, setMsgError] = useState("");

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
            <a href="#forgotpassword" className="forgot-password">
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
        </form>
    );
};

export default Login;
