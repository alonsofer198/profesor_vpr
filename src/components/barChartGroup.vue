<template>
  <div class="d-block">
    <div class="actualizacion">
      Actualizaciones desde el 2016 hasta el 30 de abril de 2022.
    </div>
    
    <div class="bajada">
      El Departamento de Justicia registró {{ totalColumn('convicciones') }} convicciones y {{ totalColumn('absoluciones') }} absoluciones entre el 1 de enero de 2022 y el 30 de abril de 2022 en la región de {{ area }}. Los datos incluyen casos de años anteriores resueltos en el 2022.
    </div>
  
    <div class="bar-col-container justify-content-center">
      <div class="col-bar" v-for="(m, i) in data" :key="`${i}_justicia_${m.anio}_${m.area}`">
        <div class="row m-1">
          <div class="col-12">
            <div class="row justify-content-center">
  
              <div :key="ix" v-for="(column, ix) in fullColumns" class="col-auto bar-container-2 bar-container">
                <div class="label" :style="`top: ${calcTopConvictos(column.column, m[column.column], data)}`">{{numeral(m[column.column]).format('0,0')}} </div>
                <div class="bar-percent">
                  <div class="percent-incidentes" :style="`background-color: ${column.color}; height: ${calcPercentConvictos(column.column, m[column.column], data)}`"></div>
                </div>
              </div>

            </div>
          </div>
          <div class="col-12 text-center border-top anio-bar">
            <span>{{ m.anio }}</span>
          </div>
        </div>
      </div>
    </div>
  
    <div class="legend-container">
      <div :key="`legent_${cix}`" v-for="(column, cix) in fullColumns" class="legend-item legend-cargos"><span :style="`background-color: ${column.color};`"></span><label>{{column.column}}</label></div>
    </div>
    <div class="text-center fuente pt-3">
      Fuente: Justicia
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
	import numeral from 'numeral'
  import { maxBy, sumBy, map } from 'lodash'

  export default {
    name: 'barChartGroup',
    props: {
      data: [],
      columns: [],
      area: String
    },
    computed: {
      color() {
        return ['#a50f15','#de2d26','#fc9272','#fcbba1','#fee5d9']
      },
      fullColumns() {
        return map(this.columns, (d, ix) => {
          return {
            column: d,
            color: this.color[ix]
          }
        })
      }
    },
    methods: {
      numeral,
      totalColumn(field) {
        let sum = sumBy(this.data, field)
        return sum
      },
      calcTopConvictos(field, value, dataset) {
        let max = maxBy(dataset, field)
        let incidentesScale = d3.scaleLinear()
        incidentesScale
          .domain([0, max['radicacion']])
          .range([5, 150])
        let topLabel = (150 - incidentesScale(value)) - 25
        return `${topLabel}px`
      },
      calcPercentConvictos(field, value, dataset) {
        let max = maxBy(dataset, field)
        let incidentesScale = d3.scaleLinear()
        incidentesScale
          .domain([0, max['radicacion']])
          .range([0, 150])
        return `${incidentesScale(value)}px`
      },
    }
  }
</script>