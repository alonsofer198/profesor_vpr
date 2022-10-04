<template>  
  <div class="container">
    <div class="row justify-content-center">
      
      <div class="col-12 p-0">
        <PrincipalHome />
        <DestacadoParrafo />
      </div>
      <div class="col-12 mt-5 p-0">
        <div class="map-block" ref="widthContainer">
          <MapaPrincipal :width-container="widthContainer" v-if="widthContainer > 0" />
        </div>
      </div>
      <div class="col-12 p-0" id="container_graphs_tabs">
        <b-tabs content-class="">
          <b-tab title="Plazas Regulares" active>
            <div class="summary-block">
              <SummaryHome />
            </div>           
          </b-tab>
          <b-tab title="Contratos a Tiempo Parcial">
            <div class="summary-block container">
              <SummaryHome />
            </div>            
          </b-tab>
          <b-tab title="Contratos a Tiempo Completo">
            <div class="summary-block container">
              <SummaryHome />
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>


import MapaPrincipal from '@/components/MapaPrincipal.vue'
import SummaryHome from '@/components/SummaryHome.vue'
import IframeResizer from '@/utils/iframe-resizer'
import DestacadoParrafo from '@/components/DestacadoParrafo.vue'
import PrincipalHome from '@/components/PrincipalHome.vue'

export default {
  name: 'Home',
  components: {
    MapaPrincipal,
    SummaryHome,
    DestacadoParrafo,
    PrincipalHome
},
  mounted () {
    IframeResizer.create()
    
    this.widthContainer = this.$refs['widthContainer'].offsetWidth
    window.addEventListener('resize', () => {
      this.widthContainer = this.$refs['widthContainer'].offsetWidth
		})
  },
  data() {
    return {
      widthContainer: 0
    }
  },
  created() {
    this.$store.dispatch('incidentes/getAllIncidentes')
    this.$store.dispatch('incidentes/getAllTipoAtaques')
  }
}
</script>