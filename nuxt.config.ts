import messages from './messages';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		// The private keys which are only available server-side
		apiSecret: '123',
		// Keys within public are also exposed client-side
		public: {
			apiBase: '/api',
			motion: {
				directives: {
					test: {
						initial: {
							opacity: 0,
						},
						visible: {
							opacity: 1,
							transition: {
								duration: 600,
								type: 'keyframes',
								ease: 'easeOut',
							},
						},
					},
				},
			},
		},
	},
	ssr: false,
	pages: true,

	experimental: {
		payloadExtraction: false,
	},
	css: ['~/assets/css/main.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	// devServer: {
	// 	https: {
	// 		key: "./server.key",
	// 		cert: "./server.crt",
	// 	},
	// },

	modules: ['nuxt-icon', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@vueuse/motion/nuxt', '@nuxtjs/i18n'],
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
			link: [{ rel: 'icon', type: 'image/svg', href: '/logo.ico' }],
		},
		baseURL: '/app',
		
	},
	components: ['~/components/cards', '~/components'],
});
