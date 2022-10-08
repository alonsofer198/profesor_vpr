<template>  
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12">
        <PrincipalHome />
      </div>
      <div class="col-12">
        <DestacadoHome />
      </div>
      <div class="col-12">
        <DestacadoParrafo />
      </div>

    </div>
  </div>
</template>

<script>

import IframeResizer from '@/utils/iframe-resizer'
import DestacadoHome from '@/components/DestacadoHome.vue'
import DestacadoParrafo from '@/components/DestacadoParrafo.vue'
import PrincipalHome from '@/components/PrincipalHome.vue'

export default {
  name: 'Home',
  components: {
    DestacadoHome,
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
  }
}
</script>