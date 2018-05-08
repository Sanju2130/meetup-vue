<template>
	<v-dialog width="350px" persistent v-model="closeDialog">
		<v-btn  accent slot="activator">
            Edit Date
		</v-btn>
		<v-card>
			<v-container>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-title>Edit Meetup Date</v-card-title>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout row wrap>
					<v-flex xs12>
						<v-date-picker v-model="editableDate" style="width: 100%" actions>
                            <template>
                                <v-btn class="blue--text dark" flat @click.native="closeDialog = false">Close</v-btn>
                                <v-btn class="blue--text dark" flat @click.native="onSaveChanges">Save</v-btn>
                            </template>
                        </v-date-picker>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
    export default {
        props: ['meetup'],
        data () {
            return {
                closeDialog: false,
                editableDate: null
            }
        },
        methods: {
            onSaveChanges () {
                const newDate = new Date(this.meetup.date)
                const newDay = new Date(this.editableDate).getUTCDay()
                const newMonth = new Date(this.editableDate).getUTCMonth()
                const newYear = new Date(this.editableDate).getUTCFullYear()
                newDate.setUTCDay(newDay)
                newDate.setUTCMonth(newMonth)
                newDate.setUTCFullYear(newYear)
                this.$store.dispatch('updateMeetup', {
                    id: this.meetup.id,
                    date: newDate
                })
            }
        },
        created () {
            this.editableDate = new Date(this.meetup.date)
        }
    }
</script>
