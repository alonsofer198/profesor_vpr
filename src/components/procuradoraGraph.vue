
<template>
  <div class="row candidato-wrapper">

    
    
    <div class="col-12 col-md-8 mt-3 text-center" id="#my_dataviz_procuradora">
      <svg height="350px" width="100%" ref="dataviz_procuradora">
        <g ref="g_procuradora"></g>
      </svg>
      <div id="tooltip"></div>
    </div>
    
    <div class="col-12 d-block d-md-none">

        <b-dropdown class="m-3 justify-content-center" id="dropdown-form" text="Seleccionar víctimas" ref="dropdown">
          <b-dropdown-form>
            <b-form-group>
              <template #label>
                <b-form-checkbox
                  v-model="checked"				
                  class="check"
                  aria-describedby="region_policiaca"
                  aria-controls="region_policiaca"
                  @change="toggleAll"
                >
                   {{ selected.length > 0 ? ' Todas las víctimas' : ' Seleccionar todos'}}
                </b-form-checkbox>
  
                </template>
                <template v-slot="{ ariaDescribedby }">
                  <b-form-group>
                    <b-form-checkbox
                      v-for="option in options"
                      v-model="selected"
                      :key="option.value"
                      :value="option.value"
                      :aria-describedby="ariaDescribedby"
                      name="region_policiaca"
                      plain
                      stacked
                    >
                      <span :style="`background-color:${option.color}; padding: 0 5px; text-shadow: 1px -1px 5px #fff;`">{{ option.text }}</span>
                    </b-form-checkbox>
                  </b-form-group>
                </template>
            </b-form-group>
          </b-dropdown-form>
        </b-dropdown>

    </div>

    <div class="col-4 d-none d-md-block">
      <div class="row">
        <div class="col-12">
      <p class="p-3 mt-3 mb-3">Procuradora de la mujer</p>
    </div>
      </div>
      <b-form-group class="lista-regiones mt-3">
        <template #label>
          <b-form-checkbox
            v-model="checked"				
            class="check"
            aria-describedby="region_policiaca"
            aria-controls="region_policiaca"
            @change="toggleAll"
          >
             {{ selected.length > 0 ? ' Todas las víctimas' : ' Seleccionar todos'}}
          </b-form-checkbox>

          </template>
          <template v-slot="{ ariaDescribedby }">
            <b-form-group class="mt-3 mb-3">
              <b-form-checkbox
                v-for="option in options"
                v-model="selected"
                :key="option.value"
                :value="option.value"
                :aria-describedby="ariaDescribedby"
                name="region_policiaca"
                plain
                stacked
              >
              <div>
                <span class="d-inline-block" :style="`background-color:${option.color}; padding: 0px 5px; margin-right: 8px; width:16px; height:16px; text-shadow: 1px -1px 5px #fff;`"></span>
                <span class="d-inline-block">{{ option.text }}</span>
                
              </div>
                
              </b-form-checkbox>
            </b-form-group>
          </template>
      </b-form-group>
    </div>
    
  </div>
</template>

<style>
  .line {
    fill: none;
    stroke-width: 1.5;
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

  .line:hover {
    stroke: #0f98d4;
    stroke-width: 3;
    z-index: 666;
  }

  .tick text {
    stroke: #f0f0f0;
    stroke-width: 0.5;
  }

  .tick line {
    stroke: #bbbbbb;
    stroke-width: 0.5;
  }

  .domain {
    stroke: #bbbbbb;
    stroke-width: 1;
  }

</style>

<script>

  import {  groupBy, find, filter, map, uniq, maxBy, sortBy } from 'lodash'
  import * as d3 from 'd3'
  import { mapState } from 'vuex'
  import numeral from 'numeral'

  export default {
    name: 'procuradoraGraph',
    data() {
      return {
        selected: [],
				checked: true,
        field: 'incidentes'
      }
    },
    mounted() {
      this.renderGraph(this.candidatos)
    },
    created() {
      this.$store.dispatch('incidentes/getAllProcuradoraMujer')
    },
    watch: {
      options(data) {
        this.selected = map(data, 'value')
      },
      selected() {
        this.renderGraph(this.filtered)
      },
      filtered(data) {
        this.renderGraph(data)
      },
      all_incidentes() {
        this.renderGraph(this.filtered)
      }
    },
    computed: {
      ...mapState({
        all_incidentes: state => state.incidentes.allProcuradoraMujer,
      }), 
      
			anios() {
				return uniq(map(this.all_incidentes, 'anio'))
			},
      colors() {
        return {
          'victimas-de-acecho': '#a6cee3',
          'victimas-de-violencia-domestica': '#1f78b4',
          'victimas-de-discrimen-por-genero':'#b2df8a',
          'victimas-de-agresion-sexual':'#33a02c',
          'restriccion-de-libertad':'#fb9a99',
          'sexual':'#e31a1c',
          'violacion-de-orden-de-proteccion':'#fdbf6f'
        }
      },
      candidatos() {
        return map(groupBy(this.all_incidentes, 'id'), (item,  id) => {
          return {
            id: id,
            color: this.colors[id],
            area: uniq(map(item, 'victimas')).join(""),
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
						
			toggleAll() {				
				
				if (this.checked==true){
					this.selected = map(this.options,'value').slice()
					
				}
				else {
						this.selected = []
				}
				
			},
      renderGraph(dataset) {

        if(dataset.length == 0)
          return false

        // const tooltip = d3.select('#tooltip')
        let canvas_size = document.querySelector("#container_graphs_tabs").clientWidth 

        var margin = {top: 50, right: 20, bottom: 30, left: 50},
          width = (canvas_size - (canvas_size * .35)) - margin.left - margin.right,
          height = 350 - margin.top - margin.bottom;

        if(window.innerWidth < 640)
          width = width = (canvas_size- 60) - margin.left - margin.right

        var svg = d3.select(this.$refs['g_procuradora'])
          .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")")

        let maxIncidentes = maxBy(dataset, 'maxItem')

          svg.selectAll(".line").remove()
          svg.selectAll(".label-line").remove()
          svg.selectAll(".tick").remove()

          // Scale the range of the data
          var x = d3.scalePoint()
            .range([0, width])
            .domain(this.anios)
          
          var y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, maxIncidentes.maxItem])
        
          // define the 2nd line
          var valueline2 = d3.line()
            .x((d) => { return x(d.anio); })
            .y((d) => { return y(d.total) })

          // Add the X Axis
          svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

          // Add the Y Axis
          svg.append("g")
            .call(d3.axisLeft(y))
          
            // Add the x Axis
          svg.append("g")
            .attr("transform", "translate(0," + (-40) + ")")
            .call(d3.axisBottom(x))            

          if(dataset.length > 0) {

            dataset.forEach((candidato) => {
            // Add the valueline2 path.
            let last_position = find(candidato.items, ['anio', `2021`]).total

            svg.append("text")
              .attr("transform", () => {
                return "translate(" +( x(2021) + 30)+ "," +( y(last_position) - 5) + ")"
              })
              .attr("dy", ".35em")
              .attr("text-anchor", "start")
              .attr('class', 'label-line')
              .style("fill", this.colors[candidato.id])
              .text(() => {
                return candidato.area
              })

            map(candidato.items, i => {
              svg.append("text")
                .attr("transform", () => {

                  return "translate(" + x(i.anio) + "," +( y(i.total) - 5) + ")"
                })
                .attr("dy", ".35em")
                .attr("text-anchor", "start")
                .attr('class', 'label-line')
                .style("fill", this.colors[i.id])
                .text(() => {
                  return numeral(i.total).format('0,0')
                })
            })

            svg.append("path")
              .data([candidato.items])
              .attr("class", "line")
              .style("fill", "transparent")
              .style("stroke", candidato.color)
              .attr("d", valueline2)
              .attr('mouseover', (d) => {
                return d 
              })
            })
          }


      }
    }
  }
</script>