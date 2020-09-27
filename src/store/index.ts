import Vue from 'vue'
import Vuex from 'vuex'
import { IUserState } from './modules/user'
import { IAppState } from './modules/app'
import { IRoutesState } from './modules/routes'
import { ITagsbarState } from './modules/tagsbar'
import { IThemeState } from './modules/theme'
Vue.use(Vuex)

export interface IRootState {
  user: IUserState
  app: IAppState
  routes: IRoutesState
  tags: ITagsbarState
  theme: IThemeState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
