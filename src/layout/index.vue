<template>
	<div class="vue-ts-wraper" :class="classObj">
		<template v-if="classObj.mobile">
			<div v-show="sidebar.opened" class="drawer-bg" @click="handleCloseSidebar"></div>
		</template>
		<sidebar />
		<div class="app-main">
			<div class="fixed-header">
				<navbar />
				<tagsbar v-show="showTags" ref="tagsbar"></tagsbar>
			</div>
			<app-main :class="{hiddenTags: !showTags,}" />
			<theme />
		</div>
	</div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { DeviceType, AppModule } from '@/store/modules/app'
import { ThemeModule } from  '@/store/modules/theme'
import { AppMain, Sidebar, Navbar, Tagsbar, Theme } from './components'
import mixin from '@/layout/mixin'
@Component({
	name: "Layout",
	components: {
		AppMain,
		Sidebar,
		Navbar,
		Tagsbar,
		Theme
	}
})
export default class extends mixins(mixin) {
	get sidebar() {
		return AppModule.sidebar
	}
	get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
			openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === DeviceType.Mobile
    }
	}
	get showTags(){
		return ThemeModule.showTags;
	}
	private handleCloseSidebar(){
		AppModule.CloseSideBar(true);
	}
}
</script>
<style lang="scss" scoped>
.vue-ts-wraper {
	height: 100%;
	.drawer-bg {
		background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
	}
	.app-main {
		height: 100%;
		margin-left: $base-left-menu-width;
	}
	.fixed-header {
		position: fixed;
	  top: 0;
	  right: 0;
	  z-index: 9;
	  width: calc(100% - #{$base-left-menu-width});
		transition: width 0.28s;
		&+.app-main-container {
			padding-top: $base-tags-bar-height + $base-tags-bar-height;
			&.hiddenTags {
				padding-top: $base-tags-bar-height;
			}
		}
	}
	&.hideSidebar {
	  .app-main {
	    margin-left: 64px;
	  }
	  ::v-deep .el-menu--collapse .el-submenu>.el-submenu__title{
	  	.el-submenu__icon-arrow{
	  		display: none;
	  	}
	  	&>span {
		    height: 0;
		    width: 0;
		    overflow: hidden;
		    visibility: hidden;
		    display: inline-block;
			}
	  }

	  .fixed-header {
	    width: calc(100% - 64px)
	  }
	}
}
.mobile {
	&.vue-ts-wraper{
		width: 100%;
		.app-main {
			width: 100%;
			margin-left:0;
		}
		.fixed-header {
			left: 0 !important;
			width: 100% !important;
		}
		.side-bar-container.is-collapse {
			width: 0;
		}
	}
	&.openSidebar {
    position: fixed;
    top: 0;
  }
}
</style>