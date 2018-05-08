<template>
    <v-container>
        <v-layout row v-if="!userIsAuthenticated">
            <v-flex xs12 sm6 offset-sm3>
                <v-jumbotron color="grey lighten-2">
                    <v-container fill-height>
                    <v-layout align-center>
                        <v-flex>
                        <h3 class="display-3 text-xs-center" >theMeetUp</h3>
                        <div class="display-1 mb-3 text-xs-center error--text">Welcomes You!</div>
                        <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>
                        <v-divider class="my-3"></v-divider>
                        </v-flex>
                    </v-layout>
                    </v-container>
                </v-jumbotron>
                <!-- <h1 class="error--text text-xs-center">Welcome to the Meetup!</h1> -->
            </v-flex>
        </v-layout>
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
