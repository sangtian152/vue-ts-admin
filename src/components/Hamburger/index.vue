<template>
	<div class="hamburger" @click="toggleClick">
		<i class="el-icon-s-fold"></i>
	</div>
</template>
<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	@Component({
		name: "Hamburger"
	})
	export default class extends Vue {
		private toggleClick() {
			this.$emit('toggleClick')
		}
	}
</script>