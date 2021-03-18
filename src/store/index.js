import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)
const listMonth = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'Desember']
Vue.prototype.$parseDate = (date) => {
  let respon
  if (date === '' || date === null) {
    respon = {
      date: 'Tidak Ada Data'
    }
  } else {
    const newDate = new Date(date)
    const month = '' + (newDate.getMonth() + 1)
    // let listMonth = listMonth
    const tgl = '' + (newDate.getDate())
    const year = newDate.getFullYear()
    const full = tgl + ' ' + listMonth[month - 1] + ' ' + year
    respon = {
      date: [year, month < 10 ? 0 + '' + (month) : (month), tgl < 10 ? 0 + '' + tgl : tgl].join('/') + '_' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds(),
      dateLocal: [year, month < 10 ? 0 + '' + (month) : (month), tgl < 10 ? 0 + '' + tgl : tgl].join('/'),
      fullDate: full,
      timeStap: `${full} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
    }
  }
  return respon
}

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
