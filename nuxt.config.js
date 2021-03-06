import {
	build,
	modules,
	head,
	sitemap
} from './config'

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head,
	/*
	 ** Loading
	 */
	loading: {
		color: 'var(--text-normal)'
	},
	/*
	** GLOBAL CSS
	*/
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
		'~/plugins/component.client',
		'~/plugins/components',
		'~/plugins/vue-lazyload'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
	modules,
	sitemap,
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build
}
