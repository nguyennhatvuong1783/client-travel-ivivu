import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { updateUser } from "../../services/authService";
import { useTranslation } from "react-i18next";

const ProfileInfo = () => {
    const { user } = useAuth();
    const { t } = useTranslation();

    const formatDate = (isoDate) => {
        if (!isoDate) return ""; // Handle empty case
        return new Date(isoDate).toISOString().split("T")[0];
    };

    const [formData, setFormData] = useState({
        full_name: user?.full_name || "",
        username: user?.username || "",
        email: user?.email || "",
        phone_number: user?.phone_number || "",
        address: user?.address || "",
        date_of_birth: formatDate(user?.date_of_birth),
    });

    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(user.id, formData);
            setStatus("Profile updated successfully!");
            setErrors({});
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
        }
    };

    return (
        <div>
            <header>
                <h2 className="profile-title">{t("Profile Information")}</h2>
                <p className="profile-sub">{t("DescProfile")}</p>
            </header>

            {status && <p className="status-message">{status}</p>}

            <form className="update-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">{t("username")}</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="update-input"
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete="username"
                        readOnly={true}
                    />
                    {errors.username && (
                        <p className="msg-error-username">{errors.username}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="name">{t("name")}</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="update-input"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                        autoFocus
                        autoComplete="name"
                    />
                    {errors.name && (
                        <p className="msg-error-name">{errors.name}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="update-input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                    />
                    {errors.email && (
                        <p className="msg-error-email">{errors.email}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="phone">{t("phone")}</label>
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        className="update-input"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                        autoComplete="tel"
                    />
                    {errors.phone && (
                        <p className="msg-error-phone">{errors.phone}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="address">{t("address")}</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        className="update-input"
                        value={formData.address}
                        onChange={handleChange}
                        autoComplete="address"
                    />
                    {errors.address && (
                        <p className="msg-error-address">{errors.address}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="date_of_birth">{t("date of birth")}</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        id="date_of_birth"
                        className="update-input"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        autoComplete="bday"
                    />
                    {errors.date_of_birth && (
                        <p className="msg-error-date_of_birth">
                            {errors.date_of_birth}
                        </p>
                    )}
                </div>

                <button type="submit">SAVE</button>
            </form>
        </div>
    );
};

export default ProfileInfo;
