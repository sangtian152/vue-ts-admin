<template>
  <div class="drawer-container">
    <el-button 
    type="primary"
    size="medium"
    class="theme-button"
    :class="{'is-open': drawer}"
    icon="el-icon-setting"
    @click="drawer = true"></el-button>
    <drawer
      :visible.sync="drawer"
      @open="openDrawer">
      <div class="theme-drawer">
        <div class="header">
          <i class="el-icon-close" @click="drawer = false"></i>
        </div>
        <h4 class="title">系统布局设置</h4>
        <div class="theme-drawer-body">
          <div class="theme-item">
            <span class="label">主题色</span>
            <theme-picker @change="themeChange"></theme-picker>
          </div>
          <div class="theme-item">
            <span class="label">开启Tagsbar</span>
            <el-switch
              v-model="showTags">
            </el-switch>
          </div>
          <div class="theme-item">
            <span class="label">显示Logo</span>
            <el-switch
              v-model="showLogo">
            </el-switch>
          </div>
        </div>
        <div class="footer">
          <el-button type="primary" @click="handleSubmit">保存</el-button>
        </div>
      </div>
    </drawer>
  </div>
</template>
<script lang="ts">
  import { Component, Watch, Vue } from 'vue-property-decorator'
  import Drawer from '@/components/Drawer/index.vue'
  import { ThemeModule } from '@/store/modules/theme'
  import ThemePicker from '@/components/ThemePicker/index.vue'
  @Component({
    name: "Theme",
    components:{
      ThemePicker,
      Drawer
    }
  })
  export default class extends Vue {
    private drawer: boolean = false;
    private showTags: boolean = false;
    private showLogo: boolean = false;
    private color: string = '#ff4500';
    private predefineColors: string[] = [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585'
        ];
    get logoState(){
      return ThemeModule.showLogo
    }
    get tagState() {
      return ThemeModule.showTags
    }
    created(){
      this.showLogo = this.logoState;
      this.showTags = this.tagState;
    }
    private openDrawer(){
      this.showLogo = this.logoState;
      this.showTags = this.tagState;
    }
    private themeChange(value: string) {
      this.color = value;
    }
    private handleSubmit(){
      localStorage.setItem('tremePackers', this.color);
      ThemeModule.changeTheme({key:'color', value: this.color});
      ThemeModule.changeTheme({key:'showLogo', value: this.showLogo});
      ThemeModule.changeTheme({key:'showTags', value: this.showTags});
      this.drawer = false;
    }
  }
</script>
<style lang="scss" scoped>
  .theme-button {
    font-size: 24px;
    padding: 10px;
    position: fixed;
    top: 30%;
    right:0;
    transition: right 0.3s;
  }
  .theme-drawer {
    padding: 0 10px;
    text-align: left;
    .title {
      margin: 0;
    }
    .header, .footer {
      padding:10px;
      text-align: right;
      .el-icon-close {
        cursor: pointer;
        font-size: 18px;
      }
    }
    .theme-drawer-body {
      padding: 10px;
      .theme-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
      }
    }
  }
</style>