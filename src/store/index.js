import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            // { imageURL: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200', id: 'ssffwerfe5875', title: 'Meetup in New York', date: '2018-04-22', time: '01:40 PM', location: 'New York', description: 'Come and Join us' },
            // { imageURL: 'http://distritotec.itesm.mx/wp-content/uploads/2017/04/1024x576xtimes-square-new-york-redesign-pedestrian-area-snohetta-midtown-manhattan-opening_dezeen_hero-1200x675.jpg.pagespeed.ic.3Jd05-ZGYQ.jpg', id: 'erefd123546', title: 'Meetup in Paris', date: '2018-04-25', time: '01:40 PM', location: 'Paris', description: 'It will be awesome' },
            // { imageURL: 'https://cdn1.destinationtips.com/wp-content/uploads/2017/11/las-vegas.jpg', id: 'khuiuij8796', title: 'Meetup in Las Vegas', date: '2018-04-27', time: '01:40 PM', location: 'Las Vegas', description: 'Enjoy the meetup in Las Vegas' },
            // { imageURL: 'https://sharpahead.com/wp-content/uploads/2016/09/London-1200x675.jpg', id: 'eretgfrhy5736', title: 'Meetup in London', date: '2018-04-30', time: '01:40 PM', location: 'London', description: 'Party at London' }
        ],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        setLoadedMeetups (state, payload) {
            state.loadedMeetups = payload
        },
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
        },
        setUser (state, payload) {
            state.user = payload
        },
        setLoading (state, payload) {
            state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        clearError (state) {
            state.error = null
        }
    },
    actions: {
        loadedMeetups ({commit}) {
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
                .then((data) => {
                    const meetups = []
                    const obj = data.val()
                    for (let key in obj) {
                        meetups.push({
                            id: key,
                            title: obj[key].title,
                            description: obj[key].description,
                            imageURL: obj[key].imageURL,
                            location: obj[key].location,
                            date: obj[key].date,
                            time: obj[key].time,
                            userId: obj[key].userId
                        })
                    }
                    commit('setLoadedMeetups', meetups)
                    commit('setLoading', false)
                })
                .catch(
                    (error) => {
                        console.log(error)
                        commit('setLoading', true)
                    }
                )
        },
        createMeetup ({commit, getters}, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                date: payload.date,
                time: payload.time,
                userId: getters.user.id
            }
            let imageUrl
            let key
            firebase.database().ref('meetups').push(meetup)
                .then((data) => {
                    const key = data.key
                    return key
                })
                .then(key => {
                    const filename = payload.image.name
                    const extn = filename.slice(filename.lastIndexOf('.'))
                    return firebase.storage().ref('meetups/' + key + '.' + extn).put(payload.image)
                })
                .then(fileData => {
                    imageUrl = fileData.metadata.downloadURLs[0]
                    return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
                })
                .then(() => {
                    commit('createMeetup', {
                        ...meetup,
                        imageUrl: imageUrl,
                        id: key
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
            //Reach out to firebase ..maybe
            commit('createMeetup', meetup)
        },
        signUp ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(
                user => {
                    commit('setLoading', false)
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser)
                }
            )
            .catch(
                error => {
                    commit('setLoading', false)
                    commit('setError', error)
                    console.log(error)
                }
            )
        },
        signIn ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: []
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },
        autoSignIn ({commit}, payload) {
            commit('setUser', {id: payload.uid, registeredMeetups: []})
        },
        logOut ({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
            this.$router.push('/signin')
        },
        clearError ({commit}) {
            commit('clearError')
        }
    },
    getters: {
        loadedMeetups (state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
        }, 
        featuredMeetups (state, getters) {
            return getters.loadedMeetups.slice(0, 5)
        },
        loadedMeetup (state) {
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id === meetupId
                })
            }
        },
        user (state) {
            return state.user
        },
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        }
    }
})