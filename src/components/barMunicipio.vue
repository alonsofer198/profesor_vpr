<template>
  <div class="pb-3 pt-3">
    <div v-for="(d, ix) in data" :key="ix" class="year-item">
      <div class="year-bar">
        <div class="year-label" :style="`bottom: ${calcHeight(d[field])};`">{{ numeral(d[field]).format('0,0') }}</div>
        <div class="year-percent" :style="`height: ${calcHeight(d[field])};`">
        </div>
      </div>
     <span>{{ d.anio }}</span>
    </div>
  </div>

</template>

<style>
  .year-item {
    font-family: Arial, Helvetica, sans-serif;
    position: relative;
    width: 35px;
    display: inline-block;
    margin: 0 2px;
  }

  .year-item span {
    font-size: 9px;
    line-height: 10px
  }

  .year-bar {
    position: relative;
    text-align: center;
    width: 100%;
    height: 50px;
  }

  .year-label {
    position: absolute;
    font-size: 11px;
    width: 35px;
    text-align: center;
  }

  .year-percent {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 3px;
    font-size: 11px;
    color: #fff;
    background: #db4742;
    opacity: 0.9;
  }


</style>

<script>
  import * as d3 from 'd3'
  import numeral from 'numeral'
  import { maxBy } from 'lodash'

  export default {
    name: 'barMunicipio',
    props: {
      data: Array,
      field: String
    },
    methods: {
      numeral,
      calcHeight(value) {

        let max = maxBy(this.data, this.field)

        let incidentesScale = d3.scaleLinear()

        incidentesScale
          .domain([0, max[this.field]])
          .range([1, 50])
        return `${incidentesScale(value)}px`
      }
    }
  }
</script>