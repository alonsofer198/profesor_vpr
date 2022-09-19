/**
 * Client-server processing
 */
import axios from 'axios'
import { filter } from 'lodash'

let incidentes = []
let ordenes = []
let tipo_ataques = []
let procuradora_ataques = []

export default {
  getAllIncidentes(cb) {
    axios
    .get(`/__nuevodia/data/victimas_genero.json`)
    .then(response => {
      incidentes = response.data 
      setTimeout(() => cb(incidentes), 100)
    })
  },
  getAllOrdenes(cb) {
    axios
    .get(`/__nuevodia/data/ordenes_proteccion.json`)
    .then(response => {
      if(ordenes.length == 0) {
        ordenes = response.data        
      }

      setTimeout(() => cb(ordenes), 100)
    })
  },
  getAllConvicciones(cb, { file }) {
    axios
    .get(`/__nuevodia/data/${file}.json`)
    .then(response => {
      const convicciones = response.data
      setTimeout(() => cb(convicciones), 100)
    })
  },
  getAllJusticiaConviccion(cb) {
    axios
    .get(`/__nuevodia/data/conviccion_segun_justicia.json`)
    .then(response => {
        const convicciones = response.data
      setTimeout(() => cb(convicciones), 100)
    })
  },
  getAllViolenciaDomestica(cb) {
    axios
    .get(`/__nuevodia/data/querellas_violencia_domestica.json`)
    .then(response => {
      if(tipo_ataques.length == 0) {
        tipo_ataques = response.data        
      }

      setTimeout(() => cb(tipo_ataques), 100)
    })
  },
  getAllProcuradoraMujer(cb) {
    axios
    .get(`/__nuevodia/data/procuradora_mujer.json`)
    .then(response => {
      if(procuradora_ataques.length == 0) {
        procuradora_ataques = response.data        
      }

      setTimeout(() => cb(procuradora_ataques), 100)
    })
  },
  getAllbyArea(cb, { area_id }) {
    if(incidentes.length > 0) {
      let filtered = filter(incidentes, ['area_id', area_id])
      setTimeout(() => cb(filtered), 100)
    }
  },
  getJusticiaConviccionesbyArea(cb, { area_id }) {
    axios
    .get(`/__nuevodia/data/conviccion_segun_justicia.json`)
    .then(response => {
      let filtered = filter(response.data, ['area_id', area_id])
      setTimeout(() => cb(filtered), 100)
    })
  },
  getOrdenesbyArea(cb, { area_id }) {
    if(ordenes.length > 0) {
      let filtered = filter(ordenes, ['area_id', area_id])
      setTimeout(() => cb(filtered), 100)
    }
  },

  getAllVictimas(cb) {
    axios
    .get(`/__nuevodia/data/mujeres_asesinadas.json`)
    .then(response => {
        const victimas = response.data        
      setTimeout(() => cb(victimas), 100)
    })
  }
}
