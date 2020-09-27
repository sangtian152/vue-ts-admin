<template>
	<div class="navber">
		<hamburger class="hamburger-container" @toggleClick="toggleSideBar"/>
		<breadcrumb class="breadcrumb-container" />
		<div class="navbar-right">
			<avatar />
		</div>
	</div>
</template>
<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import { AppModule } from '@/store/modules/app'
	import Avatar from '../Avatar/index.vue'
	import Hamburger from '@/components/Hamburger/index.vue'
	import Breadcrumb from '@/components/Breadcrumb/index.vue'
	@Component({
		name: "Navbar",
		components:{
			Hamburger,
			Breadcrumb,
			Avatar
		}
	})
	export default class extends Vue {
		private toggleSideBar() {
			AppModule.ToggleSideBar(false)
		}
	}
</script>
<style lang="scss" scoped>
.navber {
	height: 50px;
	background: #fff;
	position: relative;
	z-index: 1;
	box-shadow: 0 1px 4px rgba(0,21,41,.08);
	padding: 0 20px;
	.hamburger-container {
		float: left;
		font-size: 20px;
		line-height: 50px;
		padding-right: 15px;
		cursor: pointer;
	}
	.breadcrumb-container {
		float: left
	}
	.navbar-right {
		float: right;
	}
}

</style>