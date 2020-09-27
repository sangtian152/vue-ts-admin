import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import { asyncRoutes, constantRoutes } from '@/router'
import store from '@/store'

/**
* @description 判断当前路由是否包含权限
* @param roles
* @param route
* @returns {boolean|*}
*/
const hasPermission = (roles: string[], route: RouteConfig) => {
	if(route.meta && route.meta.roles) {
		roles.some(role => route.meta.roles.includes(role))
	} else {
		return true
	}
}

/**
* @description 判断当前路由是否包含权限
* @param roles
* @param route
* @returns {boolean|*}
*/
const filterAsyncRoutes = (roles: string[], routes: RouteConfig[]) => {
	const res: RouteConfig[] = [] 
	routes.forEach(route => {
		const item = {...route};
		if(hasPermission(roles, item)){
			if (item.children) {
				filterAsyncRoutes(roles, item.children);
			}
			res.push(item)
		}
	})
	return res;
}

export interface IRoutesState {
  routes: RouteConfig[]
  dynamicRoutes: RouteConfig[]
}
@Module({ dynamic: true, store, name: 'routes' })
class Routes extends VuexModule implements IRoutesState {
	public routes:RouteConfig[] = []
	public dynamicRoutes: RouteConfig[] = []

	@Mutation
	private SET_ROUTES(routes: RouteConfig[]) {
		this.routes = constantRoutes.concat(routes);
		this.dynamicRoutes = routes;
	}

	@Action
	public GenerateRoutes(roles: string[]) {
		let accessedRoutes = [];
    if (roles.includes("admin")) {
      accessedRoutes = asyncRoutes;
    } else {
      accessedRoutes = filterAsyncRoutes(roles, asyncRoutes);
    }
    this.SET_ROUTES(accessedRoutes)
	}
	
}
export const RoutesModule = getModule(Routes)