<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$listeners"
  ></div>
  <svg v-else aria-hidden="true" :class="svgClass" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { isExternal } from "@/utils/validate";
  @Component({
    name: "SvgIcon"
  })
  export default class extends Vue {
    @Prop({required: true}) private iconClass!: string
    @Prop() private className!: string
    get isExternal(){
      return isExternal(this.iconClass)
    }
    get styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        "-webkit-mask": `url(${this.iconClass}) no-repeat 50% 50%`,
      };
    }
    get iconName() {
      return `#svg-icon-${this.iconClass}`;
    }
    get svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    }
  }
</script>
<style lang="scss" scoped>
  .svg-icon {
    width: 1.125em;
    height: 1.125em;
    overflow: hidden;
    fill: currentColor;

    &:hover {
      opacity: 0.8;
    }
  }
</style>