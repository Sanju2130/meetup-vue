import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertComp from './components/Shared/Alert.vue'
import {
	Vuetify,
	VApp,
	VNavigationDrawer,
	VFooter,
	VList,
	VCard,
	VBtn,
	VIcon,
	VGrid,
	VAlert,
	VTextField,
	VDatePicker,
	VProgressCircular,
	VTimePicker,
	VToolbar,
	VCarousel,
	transitions,
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
	components: {
		VApp,
		VNavigationDrawer,
		VFooter,
		VList,
		VCard,
		VBtn,
		VIcon,
		VGrid,
		VAlert,
		VTextField,
		VDatePicker,
		VProgressCircular,
		VTimePicker,
		VToolbar,
		VCarousel,
		transitions
	},
	theme: {
		primary: '#ee44aa',
		secondary: '#424242',
		accent: '#82B1FF',
		error: '#FF5252',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FFC107'
  	}
})

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertComp)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App),
	created () {
		firebase.initializeApp({
		apiKey: 'AIzaSyArjCvHQqrlomMNf060IZvEqhZWI22EZpo',
		authDomain: 'meetup-f442d.firebaseapp.com',
		databaseURL: 'https://meetup-f442d.firebaseio.com',
		projectId: 'meetup-f442d',
		storageBucket: 'meetup-f442d.appspot.com',
		})
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.$store.dispatch('autoSignIn', user)
			}
		})
		this.$store.dispatch('loadedMeetups')
	}
})
