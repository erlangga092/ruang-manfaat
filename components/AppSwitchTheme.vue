<template>
  <div class="switch">
    <button
      aria-label="Toggle dark or light theme"
      class="switch__btn"
      @click="$emit('input', !value)"
    >
      <span v-if="value">Light</span>
      <span v-else="">Dark</span>
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

		> span {
			color: var(--text-nav);
			font-family: 'Righteous', cursive;
		}
	}
}
/* purgecss end ignore */
</style>