<template>
	<v-dialog width="350px" persistent v-model="closeDialog">
		<v-btn fab accent slot="activator">
			<v-icon>edit</v-icon>
		</v-btn>
		<v-card>
			<v-container>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-title>Edit Meetup</v-card-title>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-text>
							<v-text-field name="title" label="Title" id="title" v-model="editedTitle" required></v-text-field>
							<v-text-field name="description" label="Description" id="description" v-model="editedDesc" multi-line required></v-text-field>
						</v-card-text>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-actions>
							<v-btn flat class="info--text dark" @click.prevent="closeDialog = !closeDialog">Close</v-btn>
							<v-btn flat class="info--text dark" @click.prevent="saveChanges">Save</v-btn>
						</v-card-actions>
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
				editedTitle: this.meetup.title,
				editedDesc: this.meetup.description
			}
		},
		methods: {
			saveChanges () {
				if (this.editedTitle.trim() === '' || this.editedDesc.trim() === '') {
					return
				}
				this.closeDialog = false
				this.$store.dispatch('updateMeetup', {
					id: this.meetup.id,
					title: this.editedTitle,
					description: this.editedDesc
				})
			}
		}
	}
</script>
