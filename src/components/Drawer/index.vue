<template>
  <div>
    <div 
      v-show="visible"
      class="drawer-mask"
      @click="closeDrawer"
    ></div>
    <transition mode="out-in">
      <div v-show="visible" class="drawer-body">
        <slot />
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Watch, Prop, Vue } from 'vue-property-decorator'
@Component({
  name: "Drawer"
})
export default class extends Vue {
  @Prop({required: true}) private visible!: boolean;
  @Watch('visible')
  private changeVisible(){
    this.$emit('open')
  }
  private closeDrawer(){
    this.$emit('update:visible', false)
  }
}
</script>
<style lang="scss" scoped>
  .drawer-mask {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
    z-index: 1011;
  }
  .drawer-body {
    width: 300px;
    background: #fff;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1012;
  }
</style>