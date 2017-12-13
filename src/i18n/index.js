import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { LANGS } from './lang'

Vue.use(VueI18n)

//below is v5.x.x
// Vue.config.lang = 'zh-CN';	//set lang
Object.keys(LANGS).forEach(function (lang) {
	Vue.locale(lang, LANGS[lang])				// set locales
})

//below is v6.xx or later, ElementUI do NOT fit it well
// export default new VueI18n({
// 	locale: 'zh-CN', // set locale
// 	messages: LANGS, // set locale messages
// 	// silentTranslationWarn: true
// })