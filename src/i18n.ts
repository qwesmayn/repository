import en from './trans/eu.json';
import uk from './trans/uk.json';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

const resources = {
    en: {
        translation: en,
    },
    uk:{
        translation:uk,
    }
}

i18n
.use(initReactI18next)
.init({
    resources,
    lng: localStorage.getItem('language') as string || 'uk',
    fallbackLng:'uk'
})

export default i18n;
