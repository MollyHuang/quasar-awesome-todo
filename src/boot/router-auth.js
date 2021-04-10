import { LocalStorage } from 'quasar'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    let loggedIn = LocalStorage.getIndex("loggedIn")
    // console.log("to:", to)
    // console.log("from:", from)
    if (!loggedIn && to.path != "/auth") {
      next("/auth")
    }
    else {
      next()
    }
  })
}
