require('dotenv').config();
import { HOSTNAME } from '../constant';

export default [
	'@nuxtjs/sitemap',
	[
		'nuxt-responsive-loader', {
			size: 1920,
			placeholder: true,
			quality: 60,
			adapter: require('responsive-loader/sharp')
		}
	],
	[
		'@nuxtjs/robots',
		{
			Sitemap: `${HOSTNAME}/sitemap.xml`
		}
	]
]