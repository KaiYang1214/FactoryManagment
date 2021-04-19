import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enUS from './en-US.json';
import zhTW from './zh-TW.json';
import zhCN from './zh-CN.json';
// the translations
// (tip move them in a JSON file and import them)
const resources = {
  'en-US': {
    translations: enUS,
  },
  'zh-TW': {
    translations: zhTW,
  },
  'zh-CN': {
    translations: zhCN,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en-US', // 預設語言

    // have a common namespace used around the full app
    ns: ['translations'], // 要加載的名稱空間(string or array)
    defaultNS: 'translations', // 默認名稱空間，如果未傳遞給函數，則使用默認名稱空間 translation

    // keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // 是否要讓字詞 escaped 來防止 xss 攻擊，這裡因為 React.js 已經做了，就設成 false即可
      formatSeparator: ',', // used to separate format from interpolation value
    },

    react: {
      wait: true,
    },
  });

export default i18n;
