import React, { useState, useEffect, useRef } from "react";
import { updatePassword } from "../../services/authService";
import { useAuth } from "../../context/authContext";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ChangePassword = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const inputPassword = useRef();
    const inputConfirmPassword = useRef();
    const MySwal = withReactContent(Swal);

    const [formData, setFormData] = useState({
        current_password: "",
        password: "",
        repeatPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwordRegex = /^[A-Za-z0-9]{8,20}$/;
        if (!passwordRegex.test(formData.password)) {
            inputPassword.current.select();
            return;
        } else if (formData.password !== formData.repeatPassword) {
            inputConfirmPassword.current.select();
            return;
        }
        const Toast = MySwal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = MySwal.stopTimer;
                toast.onmouseleave = MySwal.resumeTimer;
                toast.onclick = MySwal.close;
            },
        });
        try {
            await updatePassword(user.email, formData);
            setStatus("Password updated successfully!");
            setErrors({});
            setFormData({
                current_password: "",
                password: "",
                repeatPassword: "",
            });
            Toast.fire({
                icon: "success",
                title: t("Password updated successfully!"),
            });
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
            Toast.fire({
                icon: "error",
                title: t("MsgError"),
            });
        }
    };

    useEffect(() => {
        const passwordRegex = /^[A-Za-z0-9]{8,20}$/;
        const isPasswordError =
            !passwordRegex.test(formData.password) && formData.password !== "";

        setErrors((prevErrors) => ({
            ...prevErrors,
            password: isPasswordError ? t("PasswordError") : "",
        }));
    }, [formData.password]);

    useEffect(() => {
        const isConfirmPasswordError =
            formData.password !== formData.repeatPassword &&
            formData.repeatPassword !== "";
        setErrors((prevErrors) => ({
            ...prevErrors,
            repeatPassword: isConfirmPasswordError
                ? t("ConfirmPasswordError")
                : "",
        }));
    }, [formData.password, formData.repeatPassword]);

    return (
        <div>
            <header>
                <h2 className="profile-title">{t("Update Password")}</h2>
                <p className="profile-sub">{t("DescUpdatePassword")}</p>
            </header>

            {status && <p className="status-message">{status}</p>}

            <form
                className="update-form"
                id="update-password-form"
                onSubmit={handleSubmit}
            >
                <div>
                    <label htmlFor="update_password_current_password">
                        {t("Current Password")}
                    </label>
                    <input
                        type="password"
                        name="current_password"
                        id="update_password_current_password"
                        className="update-input"
                        value={formData.current_password}
                        onChange={handleChange}
                        required
                        autoComplete="current-password"
                    />
                    {errors.current_password && (
                        <p className="msg-error-current_password">
                            {errors.current_password}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="update_password_password">
                        {t("New Password")}
                    </label>
                    <input
                        ref={inputPassword}
                        type="password"
                        name="password"
                        id="update_password_password"
                        className="update-input"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                    />
                    {errors.password && (
                        <p className="msg-error-password">{errors.password}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="update_password_password_confirmation">
                        {t("confirm password")}
                    </label>
                    <input
                        ref={inputConfirmPassword}
                        type="password"
                        name="repeatPassword"
                        id="update_password_password_confirmation"
                        className="update-input"
                        value={formData.repeatPassword}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                    />
                    {errors.repeatPassword && (
                        <p className="msg-error-repeatPassword">
                            {errors.repeatPassword}
                        </p>
                    )}
                </div>

                <button type="submit">SAVE</button>
            </form>
        </div>
    );
};

export default ChangePassword;
