<template>
  <div>
    <b-tabs class="bar-home-summary">
      <b-tab :title="t.tipo_profesor" class="tipo-profesor-container" v-for="(t, ix) in data" :key="`tipo_${ix}`">
        <div class="row">
          <div class="sede col-md-6 col-6" v-for="(m, sede) in t.sedes" :key="`sede_${sede}`">
            {{ sede }}
            <div class="bar-col-container">
              <div class="col-bar" v-for="(i) in m" :key="`sede_${sede}_${i.anio_fiscal}`">
                <div :style="`height: ${cantidadScale(i.cantidad, m)}`" class="col-auto bar-container">
                  <div>{{ i.cantidad }}</div>
                </div>
                <div>{{ i.anio_fiscal }}</div>
              </div>
            </div>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<style lang="css">
  .bar-container {
    font-size: 10px;
    background-color: #028a46;
  }
</style>

<script>
  import { maxBy } from 'lodash'
	import * as d3 from 'd3'
	import numeral from 'numeral'
	import { mapState, mapActions } from 'vuex'

	export default {
		name: 'barrasHome',
		computed: {
			...mapState({
        data_contratos: state => state.incidentes.data_contratos
      })
		},
    props: {
      data: Array
    },
		methods: {
			numeral,
			...mapActions('incidentes', [
        'updateYearSelected',
				'updateDataSelected'
      ]),
			calcColorPercent(value) {
				let incidentesScale = d3.scaleQuantize()
        console.log(d3)
				return incidentesScale(value)
			},
			cantidadScale(value, sede) {
				let incidentesScale = d3.scaleLinear()
        let maxCandidad = maxBy(sede, 'cantidad')
				incidentesScale
					.domain([0, maxCandidad['cantidad']])
					.range([5, 150])
				return `${incidentesScale(value)}px`
			}
		}
	}

</script>