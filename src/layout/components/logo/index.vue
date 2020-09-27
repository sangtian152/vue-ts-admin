<template>
  <div class="logo-contanier">
    <router-link to="/">
      <svg-icon v-if="logo" class="logo" :icon-class="logo"/>
      <span class="title" :style="{color: titleColor}">
        {{title}}
      </span>
    </router-link>
  </div>
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import setting from '@/config/settings'
  @Component({
    name: "Logo"
  })
  export default class extends Vue {
    private logo = setting.logo
    private title: string = "Vue-ts-admin"
    private titleColor: string = "#fff"
  }
</script>
<style lang=scss scoped>
.logo-contanier {
  height: $base-top-bar-height;
  line-height: $base-top-bar-height;
  .logo {
    width: 32px;
    height: 32px;
    display: inline-block;
    vertical-align: middle;
  }
  .title {
    display: inline-block;
    font-size: 20px;
    font-weight: 600;
    vertical-align: middle;
  }
}
</style>