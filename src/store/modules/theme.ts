import { VuexModule, Module, Mutation, Action, getModule, } from 'vuex-module-decorators'
import store from '@/store'
export interface IThemeState {
  color: string
  showLogo: boolean
  showTags: boolean
}
@Module({name:"theme", dynamic: true, store})
class Theme extends VuexModule implements IThemeState {
  public color = ''
  public showLogo = true
  public showTags = true
  @Mutation
  private CHANGE_THEME(payload:{ key: string, value: any}) {
    const { key, value } = payload;
    if (Object.prototype.hasOwnProperty.call(this, key)){
      (this as any)[key] = value;
    }
  }
  @Action
  public changeTheme(payload:{ key: string, value: any}){
    this.CHANGE_THEME(payload);
  }
}
export const ThemeModule = getModule(Theme)