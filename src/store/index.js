import Vue from 'vue'
import Vuex from 'vuex'
import incidentes from './modules/incidentes'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    incidentes
  },
  strict: debug
})