
<template>
  <div class="row candidato-wrapper justify-content-center">
    <div class="col-11 mt-3 text-center">
      <h2 class="mt-3 titile-graph">Denuncias por tipo de maltrato </h2>
      <div class="mb-3">Conoce la evolución de los incidentes reportados.</div>
    </div>
    <div class="col-12 col-md-4" v-for="o in options" :key="o.value">
      <div class="row row-municipio" >
        <div class="col-12 p-0 align-self-center">
          <div class="p-3 text-center">
            <h2>{{ o.text }}</h2>
          </div>
        </div>
        <div class="col-12 text-center">
          <barMunicipio :data="getDataMunicipio(o.value)" field="total"  />
        </div>
      </div>
    </div>
    <div class="col-12 pb-3">
      <div class="text-center fuente pt-3 pb-3">
        Nota: Estadísticas del 2021 cubren periodo del 1 de enero al 30 de abril de 2022. 
      </div>   
    </div>
   
  </div>
</template>

<style>
  .line {
    fill: none;
    stroke-width: 1;
    stroke-opacity: 1;
    cursor: pointer;
  }

  .bg-color {
    background: #000;
  }

  .label-line {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 11px;
    font-weight: 100;
  }


  @media (max-width: 576px) {    
    .label-line {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 11px;
      font-weight: 100;
      display: none;
    }
  }

  .row-municipio {
    border-bottom: dashed 1px #e3e3e3;
    text-align: left;
  }

  .row-municipio h2 {
    font-size: 18px;
    margin: 5px;
  }

  .line:hover {
    stroke: #0f98d4;
    stroke-width: 3;
    z-index: 666;
  }

  .tick text {
    stroke: #f0f0f0;
  }

  .tick line {
    stroke: #bbbbbb;
  }

  .domain {
    stroke: #bbbbbb;
    stroke-width: 1;
  }

</style>

<script>

  import {  groupBy, uniq, filter, map, maxBy, sortBy } from 'lodash'
  import { mapState } from 'vuex'
  import barMunicipio from '@/components/barMunicipio'

  export default {
    name: "maltratoMobile",
    components: {
      barMunicipio
    },
    data() {
      return {
        selected: [],
				checked: true,
        field: 'incidentes',
        showMunicipios: false
      }
    },
    computed: {
      ...mapState({
        tipoAtaques: state => state.incidentes.tipoAtaques,
      }), 
      candidatos() {
        return map(groupBy(this.tipoAtaques, 'id'), (item,  id) => {
          return {
            id: id,
            area: uniq(map(item, 'violencia')).join(""),
						maxItem: maxBy(item, 'total').total,
            items: item,
          }
        })
      },
      options() {
        return sortBy(map(this.candidatos, item => {
          return { text: item.area , value: item.id, color: item.color }
        }), ['text'], ['asc'])
      },
    },
    methods: {
      getDataMunicipio (municipio) {
        let data = filter(this.tipoAtaques, ['id', municipio])        
        return data
      }
    }
  }
</script>