import api from '../../api/api'

// initial state
const state = () => ({
  yearSelected: `2022`,
  incidentesPerYear: [],
  allIncidentes: [],
  allTestData: [],
  allByArea: [],
  allJusticiaConvicciones: [],
  ordenesByArea: [],
  municipioSelected: ``,
  tipoAtaques: [],
  allProcuradoraMujer: [],
  conviccionesEdad: [],
  conviccionesJusticia: [],
  conviccionesPolicia: [],
  conviccionesTribunales: [],
  victimas:[]
})


// getters
const getters = {}

// actions
const actions = {
  getAllIncidentes ({ commit }) {
    api.getAllIncidentes(incidentes => {
      commit('setAllIncidentes', incidentes)
    })
  },
  getAllTipoAtaques ({ commit }) {
    api.getAllViolenciaDomestica(incidentes => {
      commit('setAllTipoAtaques', incidentes)
    })
  },
  getAllProcuradoraMujer ({ commit }) {
    api.getAllProcuradoraMujer(incidentes => {
      commit('setAllProcuradoraMujer', incidentes)
    })
  },
  getAllVictimas ({ commit }) {
    api.getAllVictimas(incidentes => {
      commit('setAllVictimas', incidentes)
    })
  },
  getAllConvicciones ({ commit }) {
    api.getAllConvicciones(incidentes => {
      commit('setconviccionesEdad', incidentes)
    }, { file: `ordenes_proteccion_edad` })
    
    api.getAllConvicciones(incidentes => {
      commit('setconviccionesJusticia', incidentes)
    }, { file: `ordenes_proteccion_justicia` })
    
    api.getAllConvicciones(incidentes => {
      commit('setconviccionesPolicia', incidentes)
    }, { file: `ordenes_proteccion_policia` })
   
    api.getAllConvicciones(incidentes => {
      commit('setconviccionesTribunales', incidentes)
    }, { file: `ordenes_proteccion_tribunales` })
  },
  resetMap({ commit }) {
    commit('setYearSelected', `2021`)
    commit('setMunicipioSelected', ``)
    commit('setAllbyArea', [])
  },
  updateYearSelected ({ commit }, year) {
    commit('setYearSelected', year)
  },
  updateDataSelected ({ commit }, data) {
    commit('setIncidentesPerYear', data)
  },
  updateMunicipioSelected ({ commit }, area_id) {

    commit('setMunicipioSelected', area_id)

    api.getAllbyArea(incidentes => {
      commit('setAllbyArea', incidentes)
    }, { area_id: area_id })


    api.getJusticiaConviccionesbyArea(incidentes => {
      commit('setAllJusticiaConvicciones', incidentes)
    }, { area_id: area_id })

    api.getAllOrdenes(() => {
      api.getOrdenesbyArea(ordenes => {
        commit('setOrdenesbyArea', ordenes)
        console.log(area_id)
      }, {area_id: area_id})
    })
  }
}

// mutations
const mutations = {
  setAllProcuradoraMujer(state, incidentes){
    state.allProcuradoraMujer = incidentes
  },
  setAllbyArea(state, incidentes){
    state.allByArea = incidentes
  },
  setAllTipoAtaques(state, incidentes){
    state.tipoAtaques = incidentes
  },
  setOrdenesbyArea(state, ordenes){
    state.ordenesByArea = ordenes
  },
  setMunicipioSelected(state, municipio) {
    state.municipioSelected = municipio
  },
  setAllIncidentes(state, incidentes) {
    state.allIncidentes = incidentes
  },
  setAllJusticiaConvicciones(state, incidentes) {
    state.allJusticiaConvicciones = incidentes
  },
  setYearSelected(state, year) {
    state.yearSelected = year
  },
  setIncidentesPerYear(state, incidentes) {
    state.incidentesPerYear = incidentes
  },
  setconviccionesEdad(state, incidentes) {
    state.conviccionesEdad=incidentes
  },
  setconviccionesJusticia(state, incidentes) {
    state.conviccionesJusticia=incidentes
  },
  setconviccionesPolicia(state, incidentes) {
    state.conviccionesPolicia=incidentes
  },
  setconviccionesTribunales(state, incidentes) {
    state.conviccionesTribunales=incidentes
  },
  setAllVictimas(state, incidentes) {
    state.victimas=incidentes
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}