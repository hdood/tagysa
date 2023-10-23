import messages from "./messages";

export default defineI18nConfig(() =>
	process.server
		? {}
		: {
				legacy: false, // you must set `false`, to use Composition API
				locale: localStorage.getItem('vkey-locale') != 'ar' ? 'en' : 'ar',
				fallbackLocale: 'ar',
				messages, // set locale messages
				// If you need to specify other options, you can set other options
				// ...
		  },
);
