
import { store } from '../store/index'

export default (to, from, next) => {
    if (store.getters.user !== null) {
        next()
    } else {
        next('/signin')
    }
}