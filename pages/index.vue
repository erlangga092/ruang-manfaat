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
import { HOSTNAME } from '~/constant';

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
	},
	head() {
    return {
      title: 'Blog',
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Blog',
            name: 'Ruang Manfaat',
            headline: 'A personal site of Ruang Manfaat',
            description: 'A personal site of Ruang Manfaat',
            about: 'A personal site of Ruang Manfaat',
            keywords: 'ruang manfaat, Ruang Manfaat',
            genre: ['Personal', 'Tutorial', 'Programming', 'Review', 'Science'],
            copyrightYear: new Date().getFullYear(),
            dateCreated: '2017-03-12',
            inLanguage: ['English', 'Bahasa Indonesia'],
            isAccessibleForFree: 'true',
            isFamilyFriendly: 'true',
            license: 'https://opensource.org/licenses/MIT',
            image: {
              '@type': 'imageObject',
              url: `${HOSTNAME}/icon.png`,
              width: '2739',
              height: '3102'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Ruang Manfaat',
              sameAs: 'https://www.facebook.com/nggacox',
              logo: {
                '@type': 'imageObject',
                url: `${HOSTNAME}/icon.png`,
                width: '2739',
                height: '3102'
              }
            },
            blogPosts: this.blogs.map((blog) => ({
              '@type': 'blogPosting',
              headline: blog.title,
              description: blog.description,
              datePublished: blog.postedDate,
              dateCreated: blog.postedDate,
              dateModified: blog.updatedDate,
              wordcount: blog.readingTime.words,
              image: {
                '@type': 'imageObject',
                url: `${HOSTNAME}${require(`~/assets/images${blog.img}`)}`,
                height: '1920',
                width: '614'
              },
              publisher: {
                '@type': 'Organization',
                name: 'Ruang Manfaat',
                sameAs: 'https://www.facebook.com/nggacox',
                logo: {
                  '@type': 'imageObject',
                  url: `${HOSTNAME}/icon.png`,
                  width: '2739',
                  height: '3102'
                }
              },
              author: {
                '@type': 'Person',
                name: 'Ruang Manfaat'
              }
            }))
          })
        }
      ]
    }
  }
}
</script>

<style lang="postcss">
.home {
	margin-top: 4rem;
}
</style>