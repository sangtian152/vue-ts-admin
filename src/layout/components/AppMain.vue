<template>
	<section class="app-main-container">
		<transition
			name="fade-transform"
			mode="out-in"
		>
			<keep-alive :include="cachedRoutes">
				<router-view :key="key" />
			</keep-alive>
		</transition>
	</section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'AppMain'
})
export default class extends Vue {
	get cachedRoutes(){
		return []
	}
	get key() {
		return this.$route.path
	}
}
</script>
<style lang="scss" scoped>
	.app-main-container {
		// margin-left: $base-left-menu-width;
	}
</style>