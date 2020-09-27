<template>
	<el-scrollbar  :class="{'side-bar-container':true, 'is-collapse': isCollapse }">
    <logo v-show="showLogo" />
    <!--       :background-color="variables['menuBackground']"
      :text-color="variables['menuColor']"
      :active-text-color="variables['menuColorActive']" -->
		<el-menu 
      :collapse="isCollapse"
      :default-active="activeMenu"
      :collapse-transition="false"
      >
      <sidebar-item 
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :is-collapse="isCollapse"
        :base-path="route.path"
      />
    </el-menu>
	</el-scrollbar>
</template>
<script lang="ts">
	import { Component, Watch, Vue } from 'vue-property-decorator'
  import { AppModule } from '@/store/modules/app'
  import { RoutesModule } from '@/store/modules/routes'
  import { ThemeModule } from '@/store/modules/theme'
  import Logo from '@/layout/components/logo/index.vue'
  import SidebarItem from './components/SidebarItem.vue'
  import variables from "@/styles/variables.scss";
	@Component({
		name: "Sidebar",
    components:{
      Logo,
      SidebarItem
    }
	})
	export default class extends Vue {
    get sidebar() {
      return AppModule.sidebar;
    }
    get showLogo(){
      return ThemeModule.showLogo;
    }
    get variables(){
      return variables;
    }
    get routes() {
      return RoutesModule.routes;
    }
    get isCollapse() {
      return !this.sidebar.opened;
    }
    get activeMenu() {
      return this.$route.path
    }
    @Watch('routes')
    getRoutes(newVal: any, oldVal: any){
      console.log(newVal)
    }
    created(){
      // RoutesModule.GenerateRoutes(['admin'])
    }
	}
</script>
<style lang="scss" scoped>
  @mixin active {
    &:hover {
      color: $base-menu-background-active;
      // background-color: $base-menu-background-active !important;
    }

    &.is-active {
      color: $base-color-white;
      background-color: $base-menu-background-active !important;
    }
  }
	.side-bar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: $base-z-index;
    height: 100vh;
    overflow: hidden;
    background: $base-menu-background;
    width: $base-left-menu-width;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    transition: width $base-transition-time;
    ::v-deep {
      .el-scrollbar__wrap {
        overflow-x:hidden;
      }
      .el-menu {
        border: 0;
        text-align: left;
        background-color: transparent;
      }
      .el-menu-item,
      .el-submenu__title {
        color: #fff;
        height: $base-menu-item-height;
        overflow: hidden;
        font-size: 14px !important;
        line-height: $base-menu-item-height;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }
      .el-submenu__title {
        &:hover {
          color: $base-menu-background-active !important;
        }
      }
      .el-menu-item {
        @include active;
      }
      .svg-icon {
        padding-right: 5px;
      }
    }
  }
  .hideSidebar {
    .side-bar-container {
      width: $base-left-menu-width-min
    }
  }
</style>