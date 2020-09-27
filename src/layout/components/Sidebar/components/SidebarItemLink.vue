<template>
	<component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>
<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { isExternal } from '@/utils/validate'
	@Component({
		name: "SidebarItemLink"
	})
	export default class extends Vue {
		@Prop({required: true}) private to!: string
		get type() {
			if(this.isExternal) {
				return 'a'
			}
			return 'router-link'
		}
		get isExternal(){
			return isExternal(this.to)
		}
		private linkProps(to: string) {
			if(this.isExternal) {
				return {
					href: to,
					target: '_blank',
					rel: 'noopener'
				}
			}
			return {
				to: to
			}
		}
	}
</script>