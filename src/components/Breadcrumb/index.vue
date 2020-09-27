<template>
	<el-breadcrumb 
		class="app-breadcrumb"
	 	separator-class="el-icon-arrow-right"
	 >
		<transition-group name="breadcrumb">
		  <el-breadcrumb-item
		  	v-for="(item, index) in breadcrumbs"
		  	:key="item.path"
		  >
		  	<span 
		  		v-if="item.redirect === 'noRedirect' || index === breadcrumbs.length - 1"
		  		class="no-redirecct">{{ $t('route.' + item.meta.title) }}</span>
		  		<a v-else @click="handleLink(item)">{{ $t('route.' + item.meta.title) }}</a>
		  </el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>
<script lang="ts">
	import { Component, Vue, Watch } from 'vue-property-decorator'
	import { Route, RouteRecord } from 'vue-router'
	import { compile } from 'path-to-regexp'
	@Component({
		name: "Breadcrumb"
	})
	export default class extends Vue{
		private breadcrumbs: RouteRecord[] = [];

		@Watch('$route')
		private onRouteChange(route: Route) {
			if (route.path.startsWith('/redirect/')) {
				return
			}
			this.getBreadcrumb()
		}

		created(){
			this.getBreadcrumb()
		}
		private getBreadcrumb() {
			let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
			const first = matched[0];
			if (!this.isIndex(first)) {
				matched = [{path: '/index', meta: {title: 'index'}} as RouteRecord].concat(matched);
			}
			this.breadcrumbs = matched.filter(item => {
				return item.meta && item.meta.title && item.meta.breadcrumb !== false;
			})
		}
		private isIndex(route: RouteRecord) {
			const name = route && route.name
			if (!name) {
				return false
			}
			return name.trim().toLocaleLowerCase() === 'Index'.toLocaleLowerCase();
		}
		private pathCompile(path: string) {
			const params = this.$route;
			return compile(path)(params);
		}
		private handleLink(item: any) {
			const { redirect, path } = item;
			if (redirect) {
				this.$router.push(redirect).catch(err=>{
					console.warn(err)
				})
			}
			this.$router.push(this.pathCompile(path)).catch(err => {
				console.warn(err)
			})
		}
	}
</script>
<style lang="scss" scoped>
	.app-breadcrumb {
		line-height: 50px;
		margin-left: 8px;
	}
</style>