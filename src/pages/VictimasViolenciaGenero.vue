<template>  

  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 p-0" id="container_graphs_tabs">
        <div :key="item.anio" v-for="item in victimas">
          {{item.anio}}
          {{item.nombre}}
          {{item.edad}}
        </div>   }
      
      </div>
      
      
    </div>
  </div>
</template>

<script>

import IframeResizer from '@/utils/iframe-resizer'
import { mapState } from 'vuex'

export default {
  name: 'VictimasViolenciaGenero',
  mounted () {
    IframeResizer.create()
    },
  created() {
    this.$store.dispatch('incidentes/getAllVictimas')
  },
  computed: {
    ...mapState({        
      victimas: state => state.incidentes.victimas,
    }),
  }

}
</script>