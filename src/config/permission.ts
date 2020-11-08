import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { Route } from 'vue-router'
import i18n from '@/lang'
import setting from './settings'
import { RoutesModule } from '@/store/modules/routes'
import { UserModule } from '@/store/modules/user'
NProgress.configure({ showSpinner: false });

const whiteList = ['/login'];

const getPageTitle = (key: string) => {
	const hasKey = i18n.te(`router.${key}`)
	if(hasKey) {
		const pageTitle = i18n.t(`router.${key}`)
		return `${pageTitle}-${setting.title}`
	}
	return `${setting.title}`
}
router.beforeEach(async (to: Route, from: Route, next: any)=>{
  NProgress.start();
  if (UserModule.token) {
    if (to.path === '/login') {
      // If is login, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      if (UserModule.roles.length === 0) {
        try {
          await UserModule.GetUserInfo()
          const roles = UserModule.roles
          // Generate accessible routes map based on role
          RoutesModule.GenerateRoutes(roles);
          // Dynamically add accessible routes
          router.addRoutes(RoutesModule.dynamicRoutes);
          console.log(to)
          next({ ...to, replace: true })
        } catch(err) {
          UserModule.ResetToken();
          Message.error(err || "error")
          next(`/login?redirect=${to.path}`);
          NProgress.done()
        }
      } else {
        console.log("next")
        next()
      }
    }
  } else {
    // Has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next()
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
router.afterEach((to: Route) => {
	NProgress.done();
	document.title = getPageTitle(to.meta.title);
})