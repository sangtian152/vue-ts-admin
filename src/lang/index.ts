import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { getLanguage } from '@/utils/locStr'
// element-ui built-in lang
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import elementEsLocale from 'element-ui/lib/locale/lang/es'
import elementJaLocale from 'element-ui/lib/locale/lang/ja'
import elementKoLocale from 'element-ui/lib/locale/lang/ko'

// User defined lang
import enLocale from './en'
import zhLocale from './zh'
import esLocale from './es'
import jaLocale from './ja'
import koLocale from './ko'

Vue.use(VueI18n)

const messages = {
	en: {
		...enLocale,
		...elementEnLocale
	},
	zh: {
		...zhLocale,
		...elementZhLocale
	},
	es: {
		...esLocale,
		...elementEsLocale
	},
	ja: {
		...jaLocale,
		...elementJaLocale,
	},
	ko: {
		...koLocale,
		...elementKoLocale
	}
}

export const getLocale = () => {
	const localLanguage = getLanguage();
	if (localLanguage) {
		return localLanguage
	}
	const language = navigator.language.toLowerCase();
	const locales = Object.keys(messages);
	for (const locale in locales) {
		if (language.includes(locale)) {
			return locale;
		}
	}
	return 'en'
}

const i18n = new VueI18n({
	locale: getLocale(),
	messages
})
export default i18n;