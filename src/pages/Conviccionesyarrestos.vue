<template>  
  <div class="container-convicciones">
    <div class="row justify-content-center">      
      <div class="col-12" id="container_graphs_tabs">

        <div class="p-3 summary-block">
          <h2 class="mt-3 titile-graph">Contradicciones en datos sobre convicciones</h2>
          <div class="mb-3">Según reportes entregados a El Nuevo Día la información sobre convicciones por violencia de género varían entre la Policía, el Departamento de Justicia y la Administración de Tribunales.</div>
          <div class="mb-3">Expertos señalan que la falta de centralización y unificación  en cómo se reportan los datos no permite un manejo efectivo y unificado de las estadísticas que producen las entidades gubernamentales.</div>
          <div class="mb-3">Explora los datos en cada una de las pestañas de la gráfica.</div>
        </div>

        <b-tabs content-class="">
          <b-tab title="Convicciones registradas por la Policía" active>
            <div class="summary-block justify-content-center">
              <div class="title-block">
								<h2 class="mt-3 titile-graph">Convicciones registradas por la Policía de Puerto Rico</h2>
								<div class="mb-3">Explora la cantidad de denuncias por violencia de género atendidas por la Policía desde el año 2016 hasta el 30 de abril de 2022.</div>
							</div>
              <SummaryConvicciones :data="conviccionesPolicia" />
              <div class="text-center fuente pb-3">
                Nota: cantidad de incidentes por violencia de género atendidos por la Policía desde el 2016 hasta el 30 de abril de 2022. Fuente: Policía de Puerto Rico.
              </div>        
            </div>           
          </b-tab>
          <b-tab title="Convicciones registradas por Justicia">
            <div class="summary-block container">
              <div class="title-block">
								<h2 class="mt-3 titile-graph">Convicciones registradas por el Departamento de Justicia de Puerto Rico</h2>
								<div class="mb-3">Explora la cantidad de denuncias por violencia de género atendidas por la Policía desde el año 2016 hasta el 30 de abril de 2022.</div>
							</div>
              <SummaryConvicciones :data="conviccionesJusticia"/>
              <div class="text-center fuente pb-3">
                Fuente: Departamento de Justicia
              </div>
            </div>            
          </b-tab>
          <b-tab title="Convicciones registradas por Tribunales">
            <div class="summary-block container">
              <div class="title-block">
								<h2 class="mt-3 titile-graph">Convicciones registradas por la Administración de Tribunales</h2>
								<div class="mb-3">Explora la cantidad de denuncias por violencia de género atendidas por la Policía desde el año 2016 hasta el 30 de abril de 2022.</div>
							</div>
              <SummaryConvicciones :data="conviccionesTribunales"/>
              <div class="text-center fuente pt-2 pb-3">
                Nota:*Cifras desde el 1 de enero de 2022 hasta el 30 de abril de 2022. Fuente: Administración de Tribunales
              </div>
            </div>
          </b-tab>
        </b-tabs>
        
      </div>
     </div>
 </div>
</template>

<style>


.title-block {
  width: 100%;
  max-width: 620px;
  padding: 15px 15px;
  margin: 0 auto;
  text-align: center;
}

</style>

<script>

import SummaryConvicciones from '@/components/SummaryConvicciones'
import IframeResizer from '@/utils/iframe-resizer'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    SummaryConvicciones
  },
  mounted () {
    IframeResizer.create()    
  },
  created() {
    this.$store.dispatch('incidentes/getAllConvicciones')
  },
  computed: {
    ...mapState({        
      conviccionesEdad: state => state.incidentes.conviccionesEdad,
      conviccionesJusticia: state => state.incidentes.conviccionesJusticia,
      conviccionesPolicia: state => state.incidentes.conviccionesPolicia,
      conviccionesTribunales: state => state.incidentes.conviccionesTribunales
    }),
  }
}
</script>