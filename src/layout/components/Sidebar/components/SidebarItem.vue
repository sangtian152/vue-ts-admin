<template>
	<div v-if="!item.meta || !item.meta.hidden">
		<template v-if="!alwaysShowRootMenu && onlyOneChild && !onlyOneChild.children">
			<sidebar-item-link :to="resolvePath(onlyOneChild.path)">
				<el-menu-item :index="resolvePath(onlyOneChild.path)">
          <i :class="onlyOneChild.meta.icon"></i>
					<svg-icon :icon-class="onlyOneChild.meta.icon"/>
          <span slot="title">{{ $t('route.' + onlyOneChild.meta.title) }}</span>
        </el-menu-item>
			</sidebar-item-link>
		</template>
		<el-submenu
      v-else
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
				<svg-icon v-if="item.meta && item.meta.icon" :icon-class="item.meta.icon"/>
        <span
          v-if="item.meta && item.meta.title"
          slot="title"
        >{{ $t('route.' + item.meta.title) }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-submenu>
	</div>
</template>
<script lang="ts">
	import path from 'path'
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { RouteConfig } from 'vue-router'
	import SidebarItemLink from './SidebarItemLink.vue'
	import { isExternal } from '@/utils/validate'
	@Component({
		name: "SidebarItem",
		components:{
			SidebarItemLink
		}
	})
	export default class extends Vue {
		@Prop({required: true}) private item!: RouteConfig
		@Prop({required: true}) private basePath!: string
		@Prop({ default: false }) private isCollapse!: boolean
		get alwaysShowRootMenu() {
			if (this.item.meta && this.item.meta.alwaysShow) {
				return true
			}
			return false
		}
		get showChildrenNumber() {
			if (this.item.children) {
				const children = this.item.children.filter(it => {
					if (it.meta && !it.meta.hidden) {
						return true
					} else {
						return false
					}
				})
				return children.length;
			}
			return 0
		}
		get onlyOneChild(){
			if(this.showChildrenNumber > 1) {
				return false
			}
			if (this.item.children) {
				for (const child of this.item.children) {
					if (child.meta && !child.meta.hidden) {
						return child
					}
				}
			}
			return {...this.item, path: ''}
		}
		private resolvePath(route: string) {
			if(isExternal(route)) {
				return route
			}
			if (isExternal(this.basePath)){
				return this.basePath
			}
			return path.resolve(this.basePath, route)
		}
	}
</script>