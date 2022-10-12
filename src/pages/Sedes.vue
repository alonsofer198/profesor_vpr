<template>  
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12">
        <DestacadoParrafo />
      </div>
    </div>
  </div>
</template>

<script>

import IframeResizer from '@/utils/iframe-resizer'
import DestacadoParrafo from '@/components/DestacadoParrafo.vue'

export default {
  name: 'Sedes',
  components: {
    DestacadoParrafo
},
  mounted () {
    IframeResizer.create()
  },
  data() {
    return {
      widthContainer: 0
    }
  }
}
</script>