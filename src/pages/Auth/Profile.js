import React from "react";
import "../../assets/css/profile.css";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import ChangePassword from "../../components/Profile/ChangePassword";
import { useTranslation } from "react-i18next";

const Profile = () => {
    const { t } = useTranslation();

    return (
        <div className="profile-container">
            <h1>{t("My Profile Information")}</h1>
            <div className="profile-content">
                <div className="profile-section">
                    <ProfileInfo />
                </div>
                <div className="profile-section">
                    <ChangePassword />
                </div>
            </div>
        </div>
    );
};

export default Profile;
