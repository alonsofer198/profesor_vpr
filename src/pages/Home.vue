<template>  
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 mt-5 p-0">
        <div class="map-block" ref="widthContainer">
          <MapaPrincipal :width-container="widthContainer" v-if="widthContainer > 0" />
          <div class="p-3">
            <Summary />
          </div> 
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
              <municipiosMobile />
            </div>            
          </b-tab>
          <b-tab title="Contratos a Tiempo Completo">
            <div class="summary-block container">
              <maltratoMobile />
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>

import municipiosMobile from '@/components/municipiosMobile.vue'
import maltratoMobile from '@/components/maltratoMobile.vue'
import MapaPrincipal from '@/components/MapaPrincipal.vue'
import Summary from '@/components/Summary.vue'
import SummaryHome from '@/components/SummaryHome.vue'
import IframeResizer from '@/utils/iframe-resizer'

export default {
  name: 'Home',
  components: {
    MapaPrincipal,
    maltratoMobile,
    SummaryHome,
    Summary,
    municipiosMobile
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