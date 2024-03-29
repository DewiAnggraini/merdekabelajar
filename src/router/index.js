import { LocalStorage } from 'quasar'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authMaha)) {
      if (LocalStorage.getItem('dataUser') === null || LocalStorage.getItem('dataUser') === 'undefined') {
        next({
          name: 'loginPage'
        })
      } else {
        const dataSession = LocalStorage.getItem('dataUser')
        if (dataSession.level === 1) {
          next()
        } else {
          next({
            name: 'loginPage'
          })
        }
      }
    } else if (to.matched.some(record => record.meta.authAdmin)) {
      if (LocalStorage.getItem('dataUser') === null || LocalStorage.getItem('dataUser') === 'undefined') {
        next({
          name: 'loginPage'
        })
      } else {
        const dataSession = LocalStorage.getItem('dataUser')
        if (dataSession.level === 2) {
          next()
        } else {
          next({
            name: 'loginPage'
          })
        }
      }
    } else if (to.matched.some(record => record.meta.authDosen)) {
      if (LocalStorage.getItem('dataUser') === null || LocalStorage.getItem('dataUser') === 'undefined') {
        next({
          name: 'loginPage'
        })
      } else {
        const dataSession = LocalStorage.getItem('dataUser')
        if (dataSession.level === 3) {
          next()
        } else {
          next({
            name: 'loginPage'
          })
        }
      }
    } else {
      next()
    }
  })

  return Router
}
