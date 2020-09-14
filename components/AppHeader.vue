<template>
	<header>
		<div class="header">
			<section class="header__top">
				<div class="header__top__logo">
					<nuxt-link
						to="/"
						class="header__top__logo__link"
					>
						{{ isLogo }}
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
				logoQuery ? this.isLogo = 'RM' : this.isLogo = 'Ruang-Manfaat';
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
	@apply z-20;
	width: 100%;
	top: 0;
	left: 0;
	position: fixed;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	align-items: center;
	justify-content: center;

	.header {
		@apply shadow-xl px-12;
		width: 100%;
		background-color: var(--bg-nav);
		height: 5rem;
		display: grid;
		grid-template-rows: 1fr;

		@media screen and (max-width: 768px) {
			padding-left: 1.5rem;
			padding-right: 1.5rem;
		}

		@media screen and (max-width: 768px) {
			padding-left: 1.25rem;
			padding-right: 1.25rem;
		}

		&__top {
			width: 100%;
			display: grid;
			grid-template-columns: 1fr 1fr;

			@media screen and (max-width: 768px) {
				grid-template-columns: 3fr 1fr;
			}

			&__logo {
				display: flex;
				align-items: center;
				height: 100%;

				&__link {
					@apply my-0 py-0 px-0 font-medium text-2xl no-underline;
					font-family: 'Righteous', cursive;
					color: var(--text-nav);

					@media screen and (max-width: 576px) {
						font-size: 1.25rem;
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
					place-content: flex-end;
					list-style: none;
					width: 100%;

					> li {
						@apply my-0 py-0 ml-6;

						@media screen and (max-width: 576px) {
							font-size: 1rem;
							margin-left: 1rem;
						}

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