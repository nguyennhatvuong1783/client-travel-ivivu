import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import các file ngôn ngữ
import translationEN from './en/translation.json';
import translationVI from './vi/translation.json';

const resources = {
    en: { translation: translationEN },
    vi: { translation: translationVI }
};

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('language') || 'vi', // Lấy ngôn ngữ từ localStorage, nếu không có thì mặc định là 'vi'
    fallbackLng: 'en', // Ngôn ngữ dự phòng
    interpolation: {
        escapeValue: false // React đã tự động chống XSS
    }
});

// Lưu ngôn ngữ vào localStorage mỗi khi thay đổi
i18n.on('languageChanged', (lng) => {
    localStorage.setItem('language', lng);
});

export default i18n;
