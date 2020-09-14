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
				<div class="header__top__link">
					<ul>
						<li>
							<nuxt-link to="/"
							class="header__top__link__home">
								Home
							</nuxt-link>
						</li>
						<li class="switch">
							<app-switch-theme v-model="isDark" />
						</li>
					</ul>
				</div>
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
		@apply w-full shadow-xl px-12;
		background-color: var(--bg-nav);
		height: 5rem;
		display: grid;
		grid-template-rows: 1fr;

		@media screen and (max-width: 768px) {
			padding-left: 1.5rem;
			padding-right: 1.5rem;
		}

		&__top {
			@apply w-full;
			display: grid;
			grid-template-columns: 1fr 1fr;

			&__logo {
				display: flex;
				align-items: center;
				height: 100%;

				&__link {
					@apply my-0 py-0 px-3 font-medium text-2xl no-underline border-l-4 border-yellow-600;
					font-family: 'Righteous', cursive;
					color: var(--text-nav);
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
					place-content: flex-end;
					list-style: none;
					width: 100%;

					> li {
						@apply my-0 py-0 ml-6;

						> .header__top__link__home {
							color: var(--text-nav);
							font-family: 'Righteous', cursive;
						}
					}

					> li .switch {
						display: flex;
						align-items: center;
					}
				}
			}
		}
	}
}
</style>