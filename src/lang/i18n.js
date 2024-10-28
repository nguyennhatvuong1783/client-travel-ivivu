import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import các file ngôn ngữ
import translationEN from './en/translation.json';
import translationVI from './vi/translation.json';

const resources = {
    en: {
        translation: translationEN
    },
    vi: {
        translation: translationVI
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'vi', // Ngôn ngữ mặc định
        fallbackLng: 'en', // Ngôn ngữ dự phòng
        interpolation: {
            escapeValue: false // React đã tự động chống XSS
        }
    });

export default i18n;
