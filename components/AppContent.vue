<template>
	<main class="main">
		<section class="main__title">
			<div class="main__title__terbaru">
				<p>Artikel</p>
			</div>
		</section>
		<section class="main__content">
			<article class="main__content__article">
				<div class="main__content__article__img">
					<app-img src="/cover/2017/08/halo-dunia-image-by-marcelo-quinan.jpg" alt="title" />
				</div>
				<div class="main__content__article__meta">
					<div class="main__content__article__meta__title">
						<h1>{{ title }}</h1>
					</div>
					<div class="main__content__article__meta__summary">
						<p>{{ sliceSummary(summary) }}</p>
					</div>
					<div class="main__content__article__meta__author">
						<span>{{ formatDate(postedDate) }}</span>
					</div>
				</div>
			</article>
			<article class="main__content__article">
				<div class="main__content__article__img">
					<app-img src="/cover/2017/08/halo-dunia-image-by-marcelo-quinan.jpg" alt="title" />
				</div>
				<div class="main__content__article__meta">
					<div class="main__content__article__meta__title">
						<h1>{{ title }}</h1>
					</div>
					<div class="main__content__article__meta__summary">
						<p>{{ sliceSummary(summary) }}</p>
					</div>
					<div class="main__content__article__meta__author">
						<span>{{ formatDate(postedDate) }}</span>
					</div>
				</div>
			</article>
			<article class="main__content__article">
				<div class="main__content__article__img">
					<app-img src="/cover/2017/08/halo-dunia-image-by-marcelo-quinan.jpg" alt="title" />
				</div>
				<div class="main__content__article__meta">
					<div class="main__content__article__meta__title">
						<h1>{{ title }}</h1>
					</div>
					<div class="main__content__article__meta__summary">
						<p>{{ sliceSummary(summary) }}</p>
					</div>
					<div class="main__content__article__meta__author">
						<span>{{ formatDate(postedDate) }}</span>
					</div>
				</div>
			</article>
		</section>
	</main>
</template>

<script>
import { formatDate } from '~/mixins';

export default {
	mixins: [formatDate],
	props: {
		img: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
		summary: {
			type: String,
			default: ''
		},
		postedDate: {
			type: String,
			default: ''
		},
		updatedDate: {
			type: String,
			default: ''
		},
		readingTime: {
			type: Object,
			default() {
				return null
			}
		},
		slug: {
			type: String,
			required: true
		}
	},
	computed: {
		sliceSummary() {
			return (val) => {
				let i = val.split(' ');
				if (parseInt(i.length) > 14) {
					return `${i.slice(0,15).join(' ').toString()}...`;
				} else {
					return val;
				}
			}
		}
	}
}
</script>

<style lang="postcss">
@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

.main {
	@apply px-12 py-16;
	width: 100%;
	display: flex;
	flex-direction: column;
	font-family: 'Righteous', cursive;
	
	&__title {
		@apply my-8 w-full;
		display: flex;
		align-items: center;
		justify-content: center;

		&__terbaru {
			display: flex;
			align-items: center;
			justify-content: center;

			> p {
				@apply text-3xl font-medium my-0 py-1 border-b-4 border-yellow-500;
				font-family: 'Righteous', cursive;
			}
		}
	}

	&__content {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 2rem;
		justify-content: center;

		&__article {
			@apply shadow-xl overflow-hidden;
			background-color: var(--card-bg);
			border-radius: .375rem;

			&:hover {
				box-shadow: 0 2px 0 rgba(54, 45, 89, .15),
				-0.1875rem -0.1875rem 0 0.1875rem #f2b712,
				0 0 0 0.375rem #e1567c;
			}
			
			&__img {
				@apply rounded shadow-lg;
				height: 11rem;
				overflow: hidden;
			}

			&__meta {
				@apply p-4;

				&__title {
					> h1 {
						@apply mt-0 mb-1 font-medium text-2xl;
						font-family: 'Righteous', cursive;
					}
				}

				&__summary {
					> p {
						@apply mt-0 mb-2 py-0 leading-normal;
					} 
				}

				&__author {
					> span {
						@apply mt-0 text-sm;
						color: var(--text-link);
					}
				}
			}
		}
	}
}
</style>