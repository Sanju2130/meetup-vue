<template>
	<v-dialog persistent v-model="registerDialog">
		<v-btn dark slot="activator">
            {{ userIsRegistered ? 'Unregister' : 'Register' }}
		</v-btn>
		<v-card>
			<v-container>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-title v-if="userIsRegistered">Unregister from Meetup?</v-card-title>
						<v-card-title v-else>Register for Meetup?</v-card-title>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-text>You can always change your decision later.</v-card-text>
					</v-flex>
				</v-layout>
                <v-layout row wrap>
					<v-flex xs12>
						<v-card-actions>
                            <v-btn class="red--text dark" flat @click="registerDialog = false">Cancel</v-btn>
                            <v-btn class="green--text dark" flat @click="onAgree">Confirm</v-btn>
                        </v-card-actions>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
    export default {
        props: ['meetupId'],
        data () {
            return {
                registerDialog: false
            }
        },
        computed: {
            userIsRegistered () {
                return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
                    return meetupId === this.meetupId
                }) >= 0
            }
        },
        methods: {
            onAgree () {
                if (this.userIsRegistered) {
                    this.$store.dispatch('unregisterUserMeetup', this.meetupId)
                } else {
                    this.$store.dispatch('registerUserMeetup', this.meetupId)
                }
            }
        }
    }
</script>
