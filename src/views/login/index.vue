<template>
	<div class="login-container">
		<el-form ref="loginForm" size="medium" :model="loginForm">
			<el-form-item prop="username">
				<el-input v-model="loginForm.username">
					<svg-icon slot="prefix" icon-class="user"/>
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input v-model="loginForm.password">
					<svg-icon slot="prefix" icon-class="password"/>
				</el-input>
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
	import { isValidUsername } from '@/utils/validate'
	import { UserModule } from '@/store/modules/user'
	import { Route } from 'vue-router'
	import { Dictionary } from 'vue-router/types/router'
	export default class extends Vue {
		private validateUsername = (rule: any, value: string, callback: Function) => {
			if (!isValidUsername(value)) {
			callback(new Error('Please enter the correct user name'))
			} else {
			callback()
			}
		}

		private validatePassword = (rule: any, value: string, callback: Function) => {
			if (value.length < 6) {
			callback(new Error('The password can not be less than 6 digits'))
			} else {
			callback()
			}
		}
		private loginForm = {
			username: "admin",
			password: "admin"
		}
		private loginRules = {
			username: [{ validator: this.validateUsername, trigger: 'blur' }],
			password: [{ validator: this.validatePassword, trigger: 'blur' }]
		}
		private loading = false
		private redirect?: string = ""
		private otherQuery: Dictionary<string> = {}
		private onRouteChange(route: Route) {
			// TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
			// See https://github.com/vuejs/vue-router/pull/2050 for details
			const query = route.query as Dictionary<string>
			if (query) {
			this.redirect = query.redirect
			this.otherQuery = this.getOtherQuery(query)
			}
		}
		private getOtherQuery(query: Dictionary<string>) {
			return Object.keys(query).reduce((acc, cur) => {
			if (cur !== 'redirect') {
				acc[cur] = query[cur]
			}
			return acc
			}, {} as Dictionary<string>)
		}
		private	handleLogin(){
			(this.$refs.loginForm as ElForm).validate(async(valid: boolean) => {
				if (valid) {
					this.loading = true
					await UserModule.Login(this.loginForm)
					this.$router.push({
						path: this.redirect || '/',
        				query: this.otherQuery
					})
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
<style lang="scss" scoped>
  .login-container {
    height: 100%;
	background-color: #2d3a4b;
	.el-form {
		width: 520px;
		margin: 0 auto;
		padding: 160px 30px 0;
		.svg-icon{
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}
	}
  }
</style>