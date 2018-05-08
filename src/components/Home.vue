<template>
    <v-container v-if="userIsAuthenticated">
        <v-layout row wrap >
            <v-flex xs12 sm6 class="text-xs-center text-sm-right">
                <v-btn dark large router to="/meetups">Explore Meetups</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                <v-btn dark large router to="/meetup/new">Organize Meetups</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular indeterminate color="primary" :width="8" :size="80" v-if="loading"></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-3" v-if="!loading">
            <v-flex xs12>
                <v-carousel style="cursor: pointer;">
                    <v-carousel-item
                        v-for="meetup in meetups"
                        :src="meetup.imageURL"
                        :key="meetup.id" @click.native="onLoadMeetup(meetup.id)"
                        >
                        <div class="title">
                        {{ meetup.title }}
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-3">
            <v-flex xs12 class="text-xs-center">
                <h2>Join Our Awesome Meetups.!</h2>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        computed: {
            meetups () {
                return this.$store.getters.featuredMeetups
            },
            loading () {
                return this.$store.getters.loading
            },
            userIsAuthenticated () {
			    return this.$store.getters.user !== null && this.$store.getters.user !== undefined
		    }
        },
        methods: {
        onLoadMeetup (id) {
            this.$router.push('/meetups/' + id)
            }
        }
    }
</script>

<style scoped>
    .title {
        position: absolute;
        bottom: 50px;
        background: rgba(0,0,0,0.5);
        padding: 20px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 2rem;
        color: #ccc;
    }
</style>
