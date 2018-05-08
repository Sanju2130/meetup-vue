<template>
    <v-container v-if="userIsAuthenticated">
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h2 class="mb-0 black--text">{{ meetup.title }}</h2>
                    </v-card-title>
                    <v-card-media :src="meetup.imageURL"
                        height="400px">
                    </v-card-media>
                    <v-card-text>
                        <div><h3 class="primary--text">{{ meetup.date | date }}, {{ meetup.time }} - {{ meetup.location }}</h3></div>
                        <div>{{ meetup.description }}</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn dark class="black">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        props: ['id'],
        computed: {
            meetup () {
                return this.$store.getters.loadedMeetup(this.id)
            },
            userIsAuthenticated () {
			    return this.$store.getters.user !== null && this.$store.getters.user !== undefined
		    }
        }
    }
</script>
