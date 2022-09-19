
<template>
  <div class="row candidato-wrapper justify-content-center">
    <div class="col-12 text-center mt-3">
      <h2 class="mt-3 titile-graph">Evolución de denuncias de violencia de género desde el 2016</h2>
      <div class="mb-5">Compara las denuncias a la Policía de Puerto Rico por cada región.</div>
    </div>
    <div class="col-12 col-md-4 mb-3 mt-3" v-for="o in options.slice(0,6)" :key="o.value">
      <div class="row row-municipio justify-content-center text-center">
        <div class="col-12 align-self-center">
          <div>
            <h2>{{ o.text }}</h2>
          </div>
        </div>
        <div class="col-12">
          <barMunicipio :data="getDataMunicipio(o.value)" field="incidentes" />
        </div>
      </div>
    </div>
    <div class="col-12 ">

      <div class="row collapse justify-content-center" :class="{'show': showMunicipios}">
        <div class="col-12 col-md-4 mb-3" v-for="o in options.slice(6, options.length)" :key="o.value">
          <div class="row row-municipio text-center" >
            <div class="col-12 p-0 align-self-center">
              <div>
                <h2>{{ o.text }}</h2>
              </div>
            </div>
            <div class="col-12">
              <barMunicipio :data="getDataMunicipio(o.value)" field="incidentes" />
            </div>
          </div>
        </div>
      </div>

      <div class="text-center pt-3">
        <BButton variant="dark" @click="showMunicipios=!showMunicipios">{{ showMunicipios ? 'Ver menos regiones' : 'Ver todas las regiones' }}</BButton>
      </div>
      <div class="text-center fuente pt-3 pb-3">
        Nota: cantidad de incidentes por violencia de género atendidos por la Policía desde el 2016 hasta el 30 de abril de 2022. Fuente: Policía de Puerto Rico.
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

  import {  groupBy, filter, map, uniq, maxBy, sortBy } from 'lodash'
  import { mapState } from 'vuex'
  import barMunicipio from '@/components/barMunicipio'

  export default {
    name: "municipiosMobile",
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
        all_incidentes: state => state.incidentes.allIncidentes,
      }), 
			anios() {
				return uniq(map(this.all_incidentes, 'anio'))
			},
      colors() {
        return {
          'aguadilla': '#a6cee3',
          'aibonito': '#1f78b4',
          'arecibo':'#b2df8a',
          'bayamon':'#33a02c',
          'caguas':'#fb9a99',
          'carolina':'#e31a1c',
          'fajardo':'#fdbf6f',
          'guayama':'#ff7f00',
          'humacao':'#cab2d6',
          'mayaguez':'#6a3d9a',
          'ponce':'#caca3f',
          'san-juan': '#b15928',
          'utuado': '#8dd3c7',
        }
      },
      candidatos() {
        return map(groupBy(this.all_incidentes, 'area_id'), (item,  area) => {
          return {
            id: area,
            area: uniq(map(item, 'area')).join(""),
						color: this.colors[area],
						maxItem: maxBy(item, 'incidentes').incidentes,
            items: item
          }
        })
      },
      options() {
        return sortBy(map(this.candidatos, item => {
          return { text: item.area , value: item.id, color: item.color }
        }), ['text'], ['asc'])
      },
      filtered() {
        let filtered = []
        filter(this.candidatos, c => {
          if(this.selected.includes(c.id)) {
            filtered.push(c)
          }
        })

        return filtered
      }
    },
    methods: {
      getDataMunicipio (municipio) {
        let data = filter(this.all_incidentes, ['area_id', municipio])        
        return data
      }
    }
  }
</script>