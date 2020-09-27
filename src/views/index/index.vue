<template>
  <div>
    <span>首页</span>
    <svg-icon class="logo" :icon-class="'360-logo-colour'" />
  </div>
	
</template>
<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	@Component({
		name: "Index"
	})
	export default class extends Vue {

	}
</script>