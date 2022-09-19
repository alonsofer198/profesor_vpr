<template>  
  <div class="container">
    <div class="row justify-content-center">
      
      <div class="col-12" id="container_graphs_tabs">
        <b-tabs content-class="">
          <b-tab title="Denuncias a la Policía" active>
            <div class="summary-block">
              <SummaryHome />
            </div>           
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>

import SummaryHome from '@/components/SummaryHome.vue'
import IframeResizer from '@/utils/iframe-resizer'

export default {
  name: 'denunciaspolicia',
  components: {
    SummaryHome,
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