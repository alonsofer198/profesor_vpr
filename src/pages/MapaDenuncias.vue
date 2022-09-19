<template>  

  <div class="container">
    <div class="row justify-content-center">       
      <div class="col-12 p-0">
        <div class="map-block" ref="widthContainer">
          <MapaPrincipal :width-container="widthContainer" v-if="widthContainer > 0" />
          <div class="p-3">
            <Summary />
          </div> 
        </div>

      </div>
    </div>
    
  </div>
</template>

<script>


import MapaPrincipal from '@/components/MapaPrincipal.vue'
import Summary from '@/components/Summary.vue'
import IframeResizer from '@/utils/iframe-resizer'

export default {
  name: 'MapaDenuncias',
  components: {
    MapaPrincipal,
    Summary,
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