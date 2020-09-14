<template>
	<header>
		<div class="header">
			<section class="header__top">
				<div class="header__top__logo">
					<nuxt-link
						to="/"
						class="header__top__logo__link"
					>
						Ruang-Manfaat
					</nuxt-link>
				</div>
				<div class="header__top__search">
					<input type="text" placeholder="Cari artikel">
				</div>
				<div class="header__top__link">
					<ul>
						<li class="switch">
							<app-switch-theme v-model="isDark" />
						</li>
					</ul>
				</div>
			</section>
			<section class="header__bottom">
				<ul>
					<li>
						<nuxt-link
							to="/"
						>
							Home
						</nuxt-link>
					</li>
				</ul>
			</section>
		</div>
	</header>
</template>

<script>
import AppSwitchTheme from '~/components/AppSwitchTheme';

const Cookie = process.client ? require('js-cookie') : undefined;

export default {
	components: {
		AppSwitchTheme
	},
	data() {
		return {
			isDark: false,
			isLogo: 'Ruang-Manfaat'
		}
	},
	mounted() {
		this.initColorScheme();
		this.initLogo();
	},
	methods: {
		initColorScheme() {
			const isDark = Cookie.get('d');
			if (isDark) {
				if (parseInt(isDark)) {
					this.isDark = true;
				} else if (
					window.matchMedia('(prefers-color-scheme)').media !== 'not all'
				) {
					const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
					if (darkModeMediaQuery.matches) {
						this.isDark = true;
					} 
					darkModeMediaQuery.addListener((e) => {
						const darkModeOn = e.matches;
						this.isDark = darkModeOn;
					})
				}
			}
		},
		initLogo() {
			const logoMediaQuery = window.matchMedia('(max-width: 1224px)');
			logoMediaQuery.addListener((e) => {
				const logoQuery = e.matches;
				if (logoQuery) {
					document.querySelector('.header__top__logo__link')
						.innerText = 'RM'
				} else {
					document.querySelector('.header__top__logo__link')
						.innerText = 'Ruang-Manfaat'
				}
			})
		}
	},
	head() {
		return {
			bodyAttrs: {
				class: this.isDark ? 'dark' : 'light'
			}
		}
	}
}
</script>

<style lang="postcss">
header {
	@apply w-full top-0 left-0 mx-auto z-20 fixed;
	display: flex;
	align-items: center;
	justify-content: center;

	.header {
		@apply w-full shadow-lg px-12;
		height: 8rem;
		background: var(--bg-nav);
		display: grid;
		grid-template-rows: 2fr auto;

		@media screen and (max-width: 768px) {
			padding-left: 1.5rem;
			padding-right: 1.5rem;
		}

		&__top {
			@apply w-full;
			display: grid;
			grid-template-columns: 1fr 4fr 1fr;

			@media screen and (max-width: 992px) {
				grid-template-columns: 1fr 5fr 1fr;
			}

			&__logo {
				display: flex;
				align-items: center;
				height: 100%;

				&__link {
					@apply my-0 py-1 font-medium text-2xl border-b-4 border-yellow-500 no-underline;
					font-family: 'Righteous', cursive;
					color: var(--text-nav);
				}
			}

			&__search {
				display: flex;
				align-items: center;
				justify-content: center;

				> input {
					@apply w-11/12 py-2 px-6;
					background-color: var(--bg-disabled);
					border-radius: 1.1rem;
					border: 1px transparent var(--inline-code-border);
					outline: none;
					font-size: 1rem;
					font-family: 'Righteous', cursive;
				
					&:focus {
						background-color: var(--card-bg);
						outline: var(--inline-code-border);
						border: 1px solid var(--text-disabled);
					}

					&:visibled {
						border-radius: 1.2rem;
					}
				}
			}

			&__link {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;

				> ul {
					@apply my-0 py-0;
					display: flex;
					align-items: center;
					justify-content: space-evenly;
					list-style: none;
					width: 100%;

					> li {
						@apply my-0 py-0;
					}

					> li .switch {
						display: flex;
						align-items: center;
					}
				}
			}
		}

		&__bottom {
			@apply w-full;
			display: flex;
			align-items: center;
			justify-content: center;

			ul {
				@apply my-0 py-0 w-1/3;
				list-style: none;
				display: flex;
				align-items: center;
				justify-content: space-evenly;

				@media screen and (max-width: 768px) {
					width: 60%;
				}

				> li > a {
					@apply text-lg;
					font-family: 'Righteous', cursive;
					color: var(--text-nav);
				}
			}
		}
	}
}
</style>