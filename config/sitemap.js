import fm from 'front-matter';

import { HOSTNAME } from '../constant';
import blogPaths from '../contents/blogs';
import { readFileAsync, flattenDeep } from '../utils';

export default {
	hostname: `${HOSTNAME}`,
	gzip: true,
	async routes() {
		let routes = await Promise.all(
			blogPaths.map(async (blogPath) => {
				let blogs = null;
				blogs = await readFileAsync(
					`./contents/blogs/${blogPath}/index.md`
				)
				const { attributes } = fm(blogs.toString());
				return {
					url: `/blog/${blogPath}/`,
					changefreq: 'daily',
					priority: 1,
					lastmodISO: new Date(attributes.updatedDate).toISOString()
				}
			})
		)
		routes = flattenDeep(routes)
		return routes
	}
}
