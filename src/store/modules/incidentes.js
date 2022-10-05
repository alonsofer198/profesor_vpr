import api from '../../api/api'

// initial state
const state = () => ({
  yearSelected: `2022`,
  data_contratos: []
})


// getters
const getters = {}

// actions
const actions = {
  getData ({ commit }) {
    api.getData(datos => {
      commit('setData', datos)
    })
  }
}

// mutations
const mutations = {
  setData(state, datos){
    state.data_contratos = datos
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}