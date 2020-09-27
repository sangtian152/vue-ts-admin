<template>
	<div class="login-container">
		<el-form ref="loginForm" :model="loginForm" label-width="80px">
			<el-form-item label="用户名">
				<el-input v-model="loginForm.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="loginForm.password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button
					:loading="loading"
					type="primary"
					style="width:100%; margin-bottom:30px;"
					@click.native.prevent="handleLogin"
				>
					{{ $t('login.logIn') }}
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script lang="ts">
	import { Vue } from 'vue-property-decorator'
	import { Form as ElForm, Input } from 'element-ui'
	import { UserModule } from '@/store/modules/user'
	export default class extends Vue {
		private loginForm = {
			username: "admin",
			password: "admin"
		}
		private loading = false
		private	handleLogin(){
			(this.$refs.loginForm as ElForm).validate(async(valid: boolean) => {
				if (valid) {
					this.loading = true
					await UserModule.Login(this.loginForm)
					// Just to simulate the time of the request
	        setTimeout(() => {
	          this.loading = false
	        }, 0.5 * 1000)
				} else {
					return false
				}
			})
		}
	}
</script>