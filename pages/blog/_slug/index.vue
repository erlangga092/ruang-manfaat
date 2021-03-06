<template>
	<div id="blog">
		<div v-if="blog !== null && typeof blog !== 'undefined'" class="blog">
			<section class="img">
				<app-img :src="blog.img" alt="title" />
			</section>
			<section class="blog__wrap">
				<div class="blog__wrap__meta">
					<h1 class="text-2xl">{{ blog.title }}</h1>
				</div>
				<component :is="blog.component" />
			</section>
		</div>
		<client-only>
			<vue-scroll-indicator 
				height="2.2px"
				color="var(--text-normal)"
				background="var(--bg)"
			/>
		</client-only>
		<app-to-top />
	</div>
</template>

<script>
import readingTime from 'reading-time';
import { isExist } from '~/utils';
import { formatDate } from '~/mixins';
import { HOSTNAME } from '~/constant';

import AppToTop from '~/components/AppToTop';

export default {
	mixins: [formatDate],
	components: {
		AppToTop
	},
	data() {
		return {
			blog: null
		}
	},
	created() {
		const slug = this.$route && this.$route.params && this.$route.params.slug;
		let blog = null;
		try {
			blog = require(`~/contents/blogs/${slug}/index.md`);
			
			this.blog = {
				img: blog.attributes.img,
				title: blog.attributes.title,
				description: blog.attributes.description,
				postedDate: blog.attributes.postedDate,
				updatedDate: blog.attributes.updatedDate,
				slug: blog.attributes.slug,
				readingTime: readingTime(blog.html),
				component: blog.vue.component,
			}
		} catch (err) {
			this.$router.replace('/');
		}
	},
	mounted() {
		const hash = window.location.hash;
		if (hash) {
			const element = document.querySelector(hash);
			element.toScrollIntoView({ behavior: 'smooth' });
		}
	},
  head() {
    return {
      title: this.blog && this.blog.title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.blog && this.blog.title
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${HOSTNAME}${
            this.blog && require(`~/assets/images${this.blog.img}`)
          }`
        },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: '1920'
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: '1280'
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.blog && this.blog.title
        },
        {
          hid: 'description',
          name: 'description',
          content: this.blog && this.blog.description
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.blog && this.blog.description
        }
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'blogPosting',
            headline: this.blog && this.blog.title,
            description: this.blog && this.blog.description,
            datePublished: this.blog && this.blog.postedDate,
            dateCreated: this.blog && this.blog.postedDate,
            dateModified: this.blog && this.blog.updatedDate,
            wordcount: this.blog && this.blog.readingTime.words,
            articleBody: this.blog && this.blog.content,
            image: {
              '@type': 'imageObject',
              url: `${HOSTNAME}${
                this.blog && require(`~/assets/images${this.blog.img}`)
              }`,
              height: '1920',
              width: '1080'
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
          })
        }
      ]
    }
  }
}
</script>

<style lang="postcss">
#blog {
	display: flex;
	justify-content: center;
	flex-direction: column;
	width: 100%;

	.nav {
		@apply z-30;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
	}

	.blog {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-family: 'Merriweather sans', sans-serif;

		> .img {
			@apply w-screen overflow-hidden;
			margin-top: -5rem;
			height: 42rem;
			border-bottom: transparent;

			@media screen and (max-width: 576px) {
				margin-top: 3rem;
			}

			> img {
				@apply w-screen object-cover;
			}
		}

		&__wrap {
			@apply mb-12 px-16 rounded-md overflow-hidden shadow-xl z-10;
			background-color: var(--card-bg);
			width: 75%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-top: -17rem;
			/* box-shadow: 0 2px 0 rgba(54, 45, 89, .15),
				-0.1875rem -0.1875rem 0 0.1875rem #f2b712,
				0 0 0 0.375rem #e1567c; */

			@media screen and (max-width: 992px) {
				width: 85%;
				margin-top: -21rem;
			}

			@media screen and (max-width: 768px) {
				width: 90%;
				margin-top: -24rem;
				padding-right: 2.75rem;
				padding-left: 2.75rem;
			}

			@media screen and (max-width: 576px) {
				width: 95%;
				margin-top: -31.5rem;
				padding-right: 1.75rem;
				padding-left: 1.75rem;
			}

			&__meta {
				width: 100%;
				
				> h1 {
					font-family: 'Bitter', serif;

					@media screen and (max-width: 576px) {
						margin-top: 1.5rem;
					}
				}
			}

			> h1, h2, h3, h4, h5, h6 {
				font-family: 'Bitter', serif;
			}
		}
	}

	> .switch__lang__slug {
		display: none;

		@media screen and (max-width: 976px) {
			display: block;
		}
	}
}

.dynamic-markdown {
	width: 100%;
	box-sizing: border-box;
}
</style>