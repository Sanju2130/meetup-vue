<template>
    <v-container>
        <v-layout v-if="userIsAuthenticated" row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                <v-card class="secondary">
                    <v-container fluid>
                        <v-layout row>
                            <v-flex xs5 sm4 md3>
                                <v-card-media :src="meetup.imageURL"
                                    height="130px">
                                </v-card-media>
                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title primary-title>
                                    <div>
                                        <h2 class="error--text mb-0">{{ meetup.title }}</h2>
                                        <div class="white--text">{{ meetup.date | date }}, {{ meetup.time }}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions class="ml-2">
                                    <v-btn flat class="grey--text" :to="'/meetups/' + meetup.id">
                                        <v-icon left light>arrow_forward</v-icon>
                                        View Meetup
                                    </v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        computed: {
            meetups () {
                return this.$store.getters.loadedMeetups
            },
            userIsAuthenticated () {
			    return this.$store.getters.user !== null && this.$store.getters.user !== undefined
		    }
        }
    }
</script>