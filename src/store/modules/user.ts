import {VuexModule, Module, Mutation, Action, getModule} from 'vuex-module-decorators'
import store from '@/store'
import { setAccessToken, getAccessToken, removeToken } from '@/utils/locStr'
import { login, getUserInfo, logout } from '@/api/users'
import router, { resetRouter } from '@/router'
import { TagsModule } from './tagsbar'
export interface IUserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
  email: string
}

@Module({name:"user", dynamic: true, namespaced: true, store})
class User extends VuexModule implements IUserState {
	public token = getAccessToken() || ""
	public name: string = ''
  public avatar: string = ''
  public introduction = ''
  public roles: string[] = []
  public email = ''

	@Mutation
	private SET_TOKEN(token: string) {
		this.token = token
	}
  @Mutation
  private SET_ROLES(roles: string[]){
    this.roles = roles
  }
	@Action
	public async Login(userInfo: {username: string, password: string}) {
		const { username, password} = userInfo
		const { data } = await login({username, password})
		setAccessToken(data.accessToken)
    this.SET_TOKEN(data.accessToken)
  }
  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    await logout()
    removeToken()
    resetRouter()

    // Reset visited views and cached views
    TagsModule.delAllViews()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }
  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }
  @Action
  public async GetUserInfo() {
    /*if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }*/
    const { data } = await getUserInfo({});
    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    const { roles, name, avatar, introduction, email } = data.user
    this.SET_ROLES(roles);
  }
}
export const UserModule = getModule(User)