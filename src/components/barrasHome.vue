<template>
  <div class="barras-item">
    <b-tabs class="bar-home-summary">
      <b-tab :title="t.tipo_profesor" class="tipo-profesor-container" v-for="(t, ix) in data" :key="`tipo_${ix}`">
        <div class="row justify-content-center">
          <div class=" col-md-4 col-8" v-for="(m, sede) in t.sedes" :key="`sede_${sede}`">
            <div class="sede">
              {{ sede }}
            </div>
            <div class="bar-col-container">
              <div class="col-bar" v-for="(i, x) in m" :key="`sede_${sede}_${i.anio_fiscal}`">
                <div :style="`height: ${cantidadScale(i.cantidad, m)}`" :class="`col-auto bar-container col-${x}`">
                  <div :class="`tick t-${x}`">{{ i.cantidad }}</div>
                </div>
                <div :class="`label l-${x}`">{{ i.anio_fiscal }}</div>
              </div>
            </div>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<style lang="scss">
  .barras-item {
    .sede {
      padding: 15px 15px 0 15px;
      font-weight: 600;
      font-size: 13px;
    }

    .bar-col-container {
      padding: 0 15px 15px 15px;
    }

    .bar-col-container .col-bar {
      cursor: pointer;
    }

    .bar-container {
      font-size: 10px;
      background-color: #028a46;
      transition: opacity .15s ease-in-out;
    }

    .bar-col-container .label {
      bottom: -15px;
      left: -15px;
      font-size: 10px;
      display: block;
      position: absolute;
      opacity: 0;
      width: 300%;
      color: #7e7e7e;
    }

    .bar-col-container:hover .bar-container {
      opacity: 0.5 !important;
    }

    .bar-col-container:hover .tick {
      opacity: 0 !important;
    }

    .col-bar:hover .bar-container {
      opacity: 1 !important;
    }

    .col-bar:hover .tick {
      opacity: 1 !important;
      font-size: 16px;
      top: -20px;
    }
    .bar-col-container:hover .label {
      opacity: 0 !important;
    }

    .col-bar:hover .label {
      opacity: 1 !important;
    }

    .bar-col-container .label.l-0 {
      opacity: 1;
    }

    .bar-col-container .label.l-6 {
      right: -15px;
      opacity: 1;
    }

    .bar-col-container .label.l-12 {
      right: -15px;
      opacity: 1;
    }

    .bar-col-container .tick {
      top: -15px;
      font-size: 12px;
      display: block;
      position: absolute;
      opacity: 0;
      color: #028a46;
      transition: opacity .15s ease-in-out;
    }

    .bar-col-container .tick.t-0 {
      opacity: 1;
    }
    
    .bar-col-container .tick.t-6 {
      opacity: 1;
    }

    .bar-col-container .tick.t-12 {
      opacity: 1;
    }
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
				return incidentesScale(value)
			},
			cantidadScale(value, sede) {
				let incidentesScale = d3.scaleLinear()
        let maxCandidad = maxBy(sede, 'cantidad')
				incidentesScale
					.domain([0, maxCandidad['cantidad']])
					.range([1, 55])
				return `${incidentesScale(value)}px`
			}
		}
	}

</script>