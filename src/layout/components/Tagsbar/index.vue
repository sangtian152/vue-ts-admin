<template>
  <div class="tags-bar-container">
    <el-tabs
    v-model="tabActive"
    type="card"
    class="tags-content"
    @tab-click="handleTabClick"
    @tab-remove="removeTab">
      <el-tab-pane 
        v-for="tag in visitedRoutes"
        :key="tag.path"
        :label="$t('route.' + tag.meta.title)"
        :name="tag.path"
        :closable="!isAffix(tag)"
      ></el-tab-pane>
    </el-tabs>
    <el-dropdown trigger="hover" @command="handleCommand">
      <span class="el-dropdown-link">
        更多操作<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-refresh" command="refresh">刷新</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-close" command="closeLeft">关闭左侧</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-close" command="closeRight">关闭右侧</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-close" command="closeOther">关闭其他</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-close" command="closeAll">关闭全部</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
  import path from 'path'
  import { Component, Watch, Vue } from 'vue-property-decorator'
  import { TagsModule, ITagView } from '@/store/modules/tagsbar'
  import { RoutesModule } from '@/store/modules/routes'
  import { RouteConfig } from 'vue-router'
  @Component({
    name: "Tagsbar"
  })
  export default class extends Vue {
    private tabActive:string = ""
    private affixTags: ITagView[] = []
    pub: string="pub"
    private pri: string = "pri"
    get visitedRoutes() {
      return TagsModule.visitedRoutes
    }
    get routes() {
      return RoutesModule.routes
    }
    @Watch('$route')
    private onRouteChange(){
      this.addTags()
      this.tabActive = this.$route.path;
    }
    mounted() {
      this.tabActive = this.$route.path;
      this.initTags()
      this.addTags()
    }
    private isAffix(tag: ITagView) {
      return tag.meta && tag.meta.affix;
    }
    private isActive(route: ITagView){
      return route.path === this.$route.path;
    }
    private handleTabClick(tab: any){
      const route = this.visitedRoutes.filter((it, index) => {
        return tab.index == index
      })[0];
      if (this.$route.path !== route.path) {
        this.$router.push({
          path: route.path,
          query: route.query,
          // fullPath: route.fullPath
        })
      } else {
        return false
      }
    }
    private removeTab(name: string) {
      let view: ITagView;
      this.visitedRoutes.forEach(item => {
        if(item.path === name) {
          view = item;
          TagsModule.delVisitedRoute(view);
          if (this.isActive(view)){
            this.toLastTag(this.visitedRoutes, view);
          }
        }
      })
    }
    private filterAffixTags(routes: RouteConfig[], basePath = "/") {
      let tags: ITagView[] = [];
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
          });
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags;
    }
    private initTags() {
      this.affixTags = this.filterAffixTags(this.routes);
      for (const tag of this.affixTags) {
        if (tag.name) {
          TagsModule.addVisitedRoute(tag)
        }
      }
    }
    private addTags() {
      const { name } = this.$route;
      if(name) {
        TagsModule.addRoute(this.$route)
      }
    }
    private toLastTag(routes: ITagView[], view: ITagView) {
      const lastView = routes.slice(-1)[0];
      if (lastView && lastView.fullPath) {
        this.$router.push(lastView.fullPath)
      } else {
        this.$router.push("/")
      }
    }
    private toThisTag() {
      const view = this.visitedRoutes.filter(item => {
        return item.path === this.$route.path
      })[0]
      return view;
    }
    private handleCommand(command: string){
      if( command=== 'refresh') {
        this.refreshRoute(this.$route)
      } else if (command === 'closeOther') {
        this.closeOtherRoutes()
      } else if(command === 'closeLeft'){
        this.closeLeftRoutes()
      } else if (command === 'closeRight') {
        this.closeRightRoutes()
      } else if (command === 'closeAll') {
        this.closeAllRoutes()
      }
    }
    private refreshRoute(route: ITagView){
      TagsModule.delCacheRoute(route);
      const { fullPath } = route
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      })
    }
    private closeLeftRoutes(){
      const route = this.toThisTag();
      TagsModule.delLeftVisitedRoutes(route);
    }
    private closeRightRoutes(){
      const route = this.toThisTag();
      TagsModule.delRightVisitedRoutes(route)
    }
    private closeOtherRoutes() {
      const route = this.toThisTag();
      TagsModule.delOtherRoute(route);
    }
    private closeAllRoutes() {
      TagsModule.delAllVisitedRoutes();
      if (this.affixTags.some(tag => tag.path === this.$route.path)) {
        return
      }
      this.$router.push("/")
    }
  }
</script>
<style lang="scss" scoped>
  .tags-bar-container {
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $base-tags-bar-height;
    background: $base-color-white;
    user-select: none;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
    .tags-content {
      width: calc(100% - 90px);
      height: $base-tag-item-height;
      ::v-deep {
        .el-tabs__nav-next,
        .el-tabs__nav-prev {
          height: $base-tag-item-height;
          line-height: $base-tag-item-height;
        }
        .el-tabs__header {
          border-bottom: 0;
          .el-tabs__nav {
            border: 0;
          }
          .el-tabs__item {
            box-sizing: border-box;
            height: $base-tag-item-height;
            margin-right: 5px;
            line-height: $base-tag-item-height;
            border: 1px solid $base-border-color;
            border-radius: $base-border-radius;

            &.is-active {
              color: $base-color-white;
              background: $base-color-blue;
              border: 1px solid $base-color-blue;
            }

            .el-icon-close {
              position: relative;
              top: -1px;
              right: -2px;
              width: 0;
              height: 14px;
              overflow: hidden;
              font-size: 12px;
              line-height: 14px;
              vertical-align: middle;
              transform-origin: 100% 50%;
            }
          }
        }
      }
    }
    .el-dropdown-link {
      cursor: pointer;
    }
  }
</style>