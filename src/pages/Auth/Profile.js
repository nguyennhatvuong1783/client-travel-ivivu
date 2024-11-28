import React from "react";
import "../../assets/css/profile.css";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import ChangePassword from "../../components/Profile/ChangePassword";
import { useTranslation } from "react-i18next";

const Profile = () => {
    const { t } = useTranslation();

    return (
        <div class="profile-container">
            <h1>{t("My Profile Information")}</h1>
            <div class="profile-content">
                <div class="profile-section">
                    <ProfileInfo />
                </div>
                <div class="profile-section">
                    <ChangePassword />
                </div>
            </div>
        </div>
    );
};

export default Profile;
