<template>
  <el-dropdown>
    <div class="avatar-dropdown">
      <div class="user-avatar">
        <img :src="avatarUrl" alt="">
      </div>
      <div class="user-name">{{userName}}</div>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>个人中心</el-dropdown-item>
      <el-dropdown-item command="layout" divided>退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Avatar from '@/assets/user.gif'
@Component({
  name: "Avatar"
})
export default class extends Vue {
  private avatarUrl = Avatar
  get userName() {
    return 'admin'
  }
}
</script>
<style lang="scss" scoped>
  .avatar-dropdown {
    display: flex;
    height: 50px;
    align-items: center;
    .user-avatar, .user-name {
      cursor: pointer;
    }
    .user-avatar{
      width: 36px;
      height: 36px;
      border-radius: 4px;
      margin-right: 4px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    } 
  }
</style>