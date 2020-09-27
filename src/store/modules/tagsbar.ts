import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { Route } from 'vue-router'
import store from '@/store'
export interface ITagView extends Partial<Route> {
  title?: string
}
export interface ITagsbarState {
  visitedRoutes: ITagView[]
  cacheRoutes: (string | null | undefined)[]
}
@Module({dynamic: true, store, name: 'tags'})
class Tagsbar extends VuexModule implements ITagsbarState {
  public visitedRoutes: ITagView[] = []
  public cacheRoutes: (string | null | undefined)[] = []
  @Mutation
  private ADD_VISITED_ROUTE(view: ITagView){
    if (this.visitedRoutes.some(item => item.path === view.path)) return
    this.visitedRoutes.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  }
  @Mutation
  private ADD_CACHE_ROUTE(view: ITagView) {
    if(view.name === null) return
    if(this.cacheRoutes.includes(view.name)) return
    if(!view.meta.noCache){
      this.cacheRoutes.push(view.name)
    }
  }
  @Mutation
  private DEL_VISITED_ROUTE(view: ITagView) {
    for( let i = 0, len = this.visitedRoutes.length; i < len; i++) {
      if (this.visitedRoutes[i].path === view.path) {
        this.visitedRoutes.splice(i, 1)
        break;
      }
    }
  }
  @Mutation
  private DEL_CACHE_ROUTE(view: ITagView) {
    if(!view.name) return;
    const index = this.cacheRoutes.indexOf(view.name);
    index!==-1 && this.cacheRoutes.splice(index, 1);
  }
  @Mutation
  private DEL_OTHER_VISITED_ROUTES(view: ITagView){
    this.visitedRoutes = this.visitedRoutes.filter(item => {
      return item.meta.affix || item.path === view.path;
    })
  }
  @Mutation
  private DEL_OTHER_CACHE_ROUTES(view: ITagView){
    if (view.name === null) return
    const index = this.cacheRoutes.indexOf(view.name);
    if(index !== -1){
      this.cacheRoutes = this.cacheRoutes.slice(index, index + 1);
    } else {
      this.cacheRoutes = [];
    }
  }
  @Mutation
  private DEL_LEFT_VISITED_ROUTES(view: ITagView){
    let viewIndex = this.visitedRoutes.length;
    this.visitedRoutes = this.visitedRoutes.filter((item, index) => {
      if (view.path === item.path) {
        viewIndex = index;
      }
      return item.meta.affix || viewIndex <= index;
    })
  }
  @Mutation
  private DEL_RIGHT_VISITED_ROUTES(view: ITagView){
    let viewIndex = 0;
    this.visitedRoutes = this.visitedRoutes.filter((item, index) => {
      if (view.path === item.path) {
        viewIndex = index;
      }
      return item.meta.affix || viewIndex >= index;
    })
  }
  @Mutation
  private RESET_CACHE_ROUTES(){
    const caches = this.visitedRoutes.map(item => {
      if(!item.meta.noCache) {
        return item.name;
      }
    })
    this.cacheRoutes = caches;
  }
  @Mutation
  private DEL_ALL_VISITED_ROUTES(){
    let viewIndex = 0;
    this.visitedRoutes = this.visitedRoutes.filter((item, index) => {
      return item.meta && item.meta.affix;
    })
  }
  @Action
  public addRoute(view: ITagView) {
    this.ADD_CACHE_ROUTE(view)
    this.ADD_VISITED_ROUTE(view)
  }
  @Action
  public addVisitedRoute(view: ITagView){
    this.ADD_VISITED_ROUTE(view)
  }
  @Action
  public delVisitedRoute(view: ITagView){
    this.DEL_VISITED_ROUTE(view)
  }
  @Action
  public delCacheRoute(view: ITagView){
    this.DEL_CACHE_ROUTE(view)
  }
  @Action
  public delOtherRoute(view: ITagView) {
    this.DEL_OTHER_VISITED_ROUTES(view)
    this.DEL_OTHER_CACHE_ROUTES(view)
  }
  @Action
  public delLeftVisitedRoutes(view: ITagView){
    this.DEL_LEFT_VISITED_ROUTES(view);
    this.RESET_CACHE_ROUTES();
  }
  @Action
  public delRightVisitedRoutes(view: ITagView){
    this.DEL_RIGHT_VISITED_ROUTES(view);
    this.RESET_CACHE_ROUTES();
  }
  @Action
  public delAllVisitedRoutes(){
    this.DEL_ALL_VISITED_ROUTES()
    this.RESET_CACHE_ROUTES()
  }
}
export const TagsModule = getModule(Tagsbar)