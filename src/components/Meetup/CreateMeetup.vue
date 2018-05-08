<template>
	<v-container v-if="userIsAuthenticated">
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<h1 class="error--text">Create A New Meetup</h1>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex xs12>
				<form @submit.prevent="createNewMeetup">
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field name="title" label="Title" id="title" v-model="title" required></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field name="location" label="Location" id="location" v-model="location" required></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-btn raised dark @click="onPickFile">Upload Image</v-btn>
							<input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<img :src="imageUrl" height="130">
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field name="description" label="Description" id="description" v-model="description" multi-line required></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<h2 class="secondary--text">Choose a Date and Time</h2>
						</v-flex>
					</v-layout>
					<v-layout row mb-3>
						<v-flex xs12 sm6 offset-sm3>
							<v-date-picker v-model="date">
							</v-date-picker>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
  							<v-time-picker v-model="picker" format="24hr">
							</v-time-picker>							
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-btn class="error" :disabled="!formIsValid" type="submit">Create Meetup</v-btn>
						</v-flex>
					</v-layout>
				</form>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	export default {
		data () {
			return {
				title: '',
				location: '',
				imageUrl: '',
				description: '',
				date: new Date().toJson,
				picker: null,
				image: null
			}
		},
		computed: {
			formIsValid () {
				return this.title !== '' 
					&& this.location !== '' 
					&& this.imageUrl !== '' 
					&& this.description !== ''
			},
			submitDateTime () {
				const dateTime = {
					date: this.date,
					time: this.picker
				}
				return dateTime
			},
            userIsAuthenticated () {
			    return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            },
		},
		methods: {
			createNewMeetup () {
				if(!this.formIsValid) {
					return
				}
				if (!this.image) {
					return
				}
				const meetupData = {
					title: this.title,
					location: this.location,
					image: this.image,
					description: this.description,
					date: this.submitDateTime.date,
					time: this.submitDateTime.time,
				}
				console.log(meetupData.image)
				this.$store.dispatch('createMeetup', meetupData)
				this.$router.push('/meetups')
			},
			onPickFile () {
				this.$refs.fileInput.click()
			},
			onFilePicked (event) {
				const files = event.target.files
				let filename = files[0].name
				if (filename.lastIndexOf('.') <= 0) {
					return alert('Please add a valid file')
				}
				const fileReader = new FileReader()
				fileReader.addEventListener('load', () => {
					this.imageUrl = fileReader.result
				})
				fileReader.readAsDataURL(files[0])
				this.image = files[0]
			}
		}
	}
</script>

<!-- <v-menu
								ref="menu2"
								:close-on-content-click="false"
								v-model="menu2"
								:nudge-right="40"
								:return-value.sync="date"
								lazy
								transition="scale-transition"
								offset-y
								full-width
								min-width="290px"
							>
								<v-text-field
								slot="activator"
								v-model="date"
								label="Picker without buttons"
								prepend-icon="event"
								readonly
								></v-text-field>
								<v-date-picker v-model="date" @input="$refs.menu2.save(date)"></v-date-picker>

							</v-menu>							 -->