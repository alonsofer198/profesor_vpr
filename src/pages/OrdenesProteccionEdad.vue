<template>  

  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 p-0" id="container_graphs_tabs">
        <div :key="item.anio" v-for="item in conviccionesEdad">
          {{item.grupoedad}}
        </div>
      </div>
     </div>
 </div>
</template>

<script>
import IframeResizer from '@/utils/iframe-resizer'
import { mapState } from 'vuex'
export default {
  name: 'OrdenesProteccionEdad',
  mounted () {
    IframeResizer.create()
  },
  created() {
    this.$store.dispatch('incidentes/getAllConvicciones')
  },
  computed: {
    ...mapState({
      conviccionesEdad: state => state.incidentes.conviccionesEdad
    }),
  }
}
</script>