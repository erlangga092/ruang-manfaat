<template>
  <div class="switch">
    <button
      aria-label="Toggle dark or light theme"
      class="switch__btn"
      @click="$emit('input', !value)"
    >
      <a v-if="value">Light</a>
      <a v-else="">Dark</a>
    </button>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
	props: {
		value: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		value(value) {
			Cookie.set('d', Number(this.value), {
				expires: 365
			})
		}
	}
}
</script>

<style lang="postcss">
/* purgecss start ignore */
.switch {
	border-color: transparent;

	&__btn {
		border-color: transparent;

		> a {
			color: var(--text-nav);
			font-family: 'Righteous', cursive;
		}
	}
}
/* purgecss end ignore */
</style>