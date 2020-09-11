<template>
	<div class="home">
		<div class="home__content">
			<app-content 
				v-for="blog in blogs"
				:key="blog.id"
				:img="blog.img"
				:title="blog.title"
				:summary="blog.summary"
				:posted-date="blog.postedDate"
				:updated-date="blog.updatedDate"
				:readingTime="blog.readingTime"
				:slug="blog.slug"
			/>
		</div>
	</div>
</template>

<script>
import readingTime from 'reading-time';
import slugs from '~/contents/blogs';
import AppContent from '~/components/AppContent';

export default {
	components: {
		AppContent
	},
	data() {
		return {
			blogs: []
		}
	},
	async asyncData({ app, redirect }) {
		async function asyncImport(slug) {
			let blog = null;
			blog = await import(`~/contents/blogs/${slug}/index.md`);
			return {
				...blog.attributes,
				readingTime: readingTime(blog.html)
			}
		}

		const blogs = await Promise.all(slugs.map(slug => asyncImport(slug)));
		return {
			blogs
		}
	}
}
</script>

<style lang="postcss">
.home {
	margin-top: 4rem;
}
</style>