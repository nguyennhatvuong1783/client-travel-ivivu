import React, { useState } from "react";
import { updatePassword } from "../../services/authService";
import { useAuth } from "../../context/authContext";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
    const { t } = useTranslation();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePassword(user.email, formData); // Call the updatePassword function passed as a prop
            setStatus("Password updated successfully!");
            setErrors({});
            setFormData({
                current_password: "",
                password: "",
                password_confirmation: "",
            });
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
        }
    };

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
                        type="password"
                        name="password_confirmation"
                        id="update_password_password_confirmation"
                        className="update-input"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                    />
                    {errors.password_confirmation && (
                        <p className="msg-error-password_confirmation">
                            {errors.password_confirmation}
                        </p>
                    )}
                </div>

                <button type="submit">SAVE</button>
            </form>
        </div>
    );
};

export default ChangePassword;
