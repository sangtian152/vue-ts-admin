<template>
  <el-color-picker
    class="theme-picker"
    :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d']"
    popper-class="theme-picker-dropdown"
    v-model="theme"
    :size="size">
  </el-color-picker>
</template>
<script lang="ts">
import { Component, Watch, Prop, Vue } from 'vue-property-decorator'
import variables from "@/styles/variables.scss";
const version = require('element-ui/package.json').version // element-ui version from node_modules
const ORIGINAL_THEME = variables['theme'] // default color
console.log(ORIGINAL_THEME)
@Component({
  name: "ThemePicker"
})
export default class extends Vue{
  @Prop({type: String, default: localStorage.getItem("tremePackers") }) private default!: string;
  @Prop({type: String, default: 'small'}) private size!: string;
  private chalk:string = '' // content of theme-chalk css
  private theme:string = ORIGINAL_THEME
  private showSuccess: boolean = true // 是否弹出换肤成功消息

  mounted() {
    if(this.default != null) {
      this.theme = this.default
      this.$emit('change', this.theme)
      this.showSuccess = false
    }
  }
  @Watch('theme')
  private async changeTheme(val: string, oldVal: string) {
    if (typeof val !== 'string') return
    const themeCluster = this.getThemeCluster(val.replace('#', ''))
    const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
    const getHandler = (variable: string, id: string) => {
      return () => {
        const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
        const newStyle = this.updateStyle((this as any)[variable], originalCluster, themeCluster)

        let styleTag = document.getElementById(id)
        if (!styleTag) {
          styleTag = document.createElement('style')
          styleTag.setAttribute('id', id)
          document.head.appendChild(styleTag)
        }
        styleTag.innerText = newStyle
      }
    }

    const chalkHandler = getHandler('chalk', 'chalk-style')

    if (!this.chalk) {
      const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
       await this.getCSSString(url, 'chalk')
    } else {
      chalkHandler()
    }

    let styles:HTMLElement[] = [].slice.call(document.querySelectorAll('style'))
    styles = styles.filter(style => {
        const text = style.innerText
        return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
      })
    styles.forEach(style => {
      const { innerText } = style
      if (typeof innerText !== 'string') return
      style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
    })

    // 响应外部操作
    this.$emit('change', val)

    if(this.showSuccess) {
      this.$message({
        message: '换肤成功',
        type: 'success'
      })
    } else {
      this.showSuccess = true
    }
  }
  private updateStyle(style: string, oldCluster: string[], newCluster: string[]) {
    let newStyle = style
    oldCluster.forEach((color, index) => {
      newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
    })
    return newStyle
  }

  private getCSSString(url: string,  variable: string) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          (this as any)[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
          resolve()
        }
      }
      xhr.open('GET', url)
      xhr.send()
    })
  }
  private getThemeCluster(theme: string) {
    const tintColor = (color: string, tint: number) => {
      let red = parseInt(color.slice(0, 2), 16)
      let green = parseInt(color.slice(2, 4), 16)
      let blue = parseInt(color.slice(4, 6), 16)

      if (tint === 0) { // when primary color is in its rgb space
        return [red, green, blue].join(',')
      } else {
        red += Math.round(tint * (255 - red))
        green += Math.round(tint * (255 - green))
        blue += Math.round(tint * (255 - blue))

        return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
      }
    }

    const shadeColor = (color: string, shade: number) => {
      let red = parseInt(color.slice(0, 2), 16)
      let green = parseInt(color.slice(2, 4), 16)
      let blue = parseInt(color.slice(4, 6), 16)

      red = Math.round((1 - shade) * red)
      green = Math.round((1 - shade) * green)
      blue = Math.round((1 - shade) * blue)

      return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
    }

    const clusters = [theme]
    for (let i = 0; i <= 9; i++) {
      clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
    }
    clusters.push(shadeColor(theme, 0.1))
    return clusters
  }
}
</script>

<style>
.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>