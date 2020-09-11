<template>
	<div>
		<div class="app__header">
			<app-header />
		</div>
		<div class="app__content">
			<nuxt />
		</div>
	</div>
</template>

<script>
import AppHeader from '~/components/AppHeader';

export default {
	components: {
		AppHeader
	}
}
</script>

<style lang="postcss">
.app-header {
	@apply fixed top-0 left-0 z-30;
}

.app-content {
	background-color: #fff;
}
</style>