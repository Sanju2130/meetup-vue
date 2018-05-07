<template>
	<v-container>
		<v-layout row v-if="error">
			<v-flex xs12 sm6 offset-sm3>
				<app-alert @dismiss="onDismiss" :text="error.message"></app-alert>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<v-card>
					<v-card-text>
						<v-container>
							<form @submit.prevent="onSignUp">
								<v-layout row>
									<v-flex xs12>
										<v-text-field name="email" label="Mail" id="email" v-model="email" type="email" required></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex xs12>
										<v-text-field name="password" label="Password" id="password" v-model="password" type="password" required></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex xs12>
										<v-text-field name="confirm-password" label="Confirm Password" id="confirm-password" v-model="confirmPassword" type="password" :rules="[comparePwd]"></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex xs12>
										<v-btn type="submit" :disabled="loading" :loading="loading">Sign Up
											 <span slot="loader" class="custom-loader">
												<v-icon light>cached</v-icon>
											</span>
										</v-btn>
									</v-flex>
								</v-layout>
							</form>
						</v-container>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	export default {
		data () {
			return {
				email: '',
				password: '',
				confirmPassword: ''
			}
		},
		computed: {
			comparePwd () {
				return this.password !== this.confirmPassword ? 'Password do not match' : ''
			},
			user () {
				return this.$store.getters.user
			},
			error () {
				return this.$store.getters.error
			},
			loading () {
				return this.$store.getters.loading
			}
		},
		watch: {
			user (value) {
				if (value !== null && value !== undefined) {
					this.$router.push('/')
				}
			}
		},
		methods: {
			onSignUp () {
				this.$store.dispatch('signUp', {email: this.email, password: this.password})
			},
			onDismiss () {
				console.log('dismiss alert')
				this.$store.dispatch('clearError')
			}
		}
	}
</script>
