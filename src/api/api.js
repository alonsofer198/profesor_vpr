/**
 * Client-server processing
 */
import axios from 'axios'

export default {
  getData(cb) {
    axios
    .get(`/__profesoresupr/data/tipo_profesor.json`)
    .then(response => {
      const datos = response.data 
      setTimeout(() => cb(datos), 100)
    })
  }
}
