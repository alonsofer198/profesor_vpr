<template>
	<div class="interactive-container">
		<div class="row justify-content-center">
			<div class="col-11 col-md-6 pt-3 text-center map-titulo">
				<h2 class="mb-3">
					Explorar los datos
				</h2>
				<b-dropdown id="dropdown-dropup" :text="areaName" class="d-inline m-2 btn-blue">
					<b-dropdown-item v-for="area in allAreas" :key="area.id" @click="showMunicipio(area.id)" href="#">{{ area.area }}</b-dropdown-item>
				</b-dropdown>
				<b-button v-if="allByArea.length > 0" @click="resetMap()" class="d-inline m-2"><font-awesome-icon icon="times" /></b-button>
			</div>
		</div>

		<div ref="map_container_pr" id="map_container" class="map_container">
			<div id="map_story" :class="summaryStory.total === 0 ? `close` : ``">
				<div class="container_map">
					<h4>Región policiaca</h4>
					<h2>{{ summaryStory.area }}</h2>
					<p>Se han reportado <span class="incidentes-badge">{{ numeral(summaryStory.total).format('0,0') }} incidentes de violencia doméstica</span> desde el 2016 al 30 de abril de 2022,según la Policía de Puerto Rico.
					</p>
					<p><b>El {{ ((summaryStory.total_mujeres / summaryStory.total) * 100).toFixed(0) }}% de las víctimas fueron <span class="">mujeres.</span></b></p>
					
					<p>La fiscalía levantó cargos criminales en <span class="">{{ numeral(summaryStory.fiscal_ordeno_radicar_cargos).format('0,0') }}</span> casos atendidos por la Policía estatal. Los datos de Justicia para 2022, en la gráfica separada, incluye casos atendidos por la Policía Municipal, según la agencia.</p>
					
					<p>La Policía ha registrado <span class="">{{ summaryStory.conviccion_segun_justicia }}</span> convicciones por Ley 54 de violencia doméstica en casos radicados hasta abril de 2022.</p>

					<p>Justicia informó <span class="">{{ summaryStory.sistema_justicia_convicciones }}</span> convicciones en los primeros cuatro meses del 2022, incluyendo casos resueltos que corresponden a años anteriores. No proveyó datos por región para años anteriores.</p>
				</div>
			</div>
			<svg width="100%" :height="height" class="plan-vector-map" id="map_svg" ref="map_svg">
				<g ref="pr_municipios"></g>
				<g ref="labels_regiones"></g>
				<g ref="labels_municipios"></g>
				<g class="legendQuant" ref="legend_municipios"></g>
			</svg>
			<div class="tooltip-pr" v-if="currentTooltip.area">
				<div>Región policiaca</div>
				<h2>{{ currentTooltip.area }}</h2>
				<div>Incidentes: <b>{{numeral(currentTooltip.incidentes).format('0,0')}}</b></div>
				<div>Masculino: <b>{{numeral(currentTooltip.masculino).format('0,0')}}</b></div>
				<div>Femenino: <b>{{numeral(currentTooltip.femenino).format('0,0')}}</b></div>
				<div v-if="currentTooltip.genero_desconocido > 0">Género desconocido:  <b>{{numeral(currentTooltip.genero_desconocido).format('0,0')}}</b></div>
			</div>
			<div>
				<div>
					<ul class="legend-map">
						<li>+1 <span style="background: #afafaf;" class="legend-square"></span></li>
						<li>+1,000 <span style="background: #e7bdbb;" class="legend-square"></span></li>
						<li>+2,000 <span style="background: #008A468F;" class="legend-square"></span></li>
						<li>+3,000 <span style="background: #d9827f;" class="legend-square"></span></li>
						<li>+4,000 <span style="background: #db4742" class="legend-square"></span></li>
						<li>+5,000 <span style="background: #930702" class="legend-square"></span></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="text-center fuente pt-3">
			Nota: cantidad de incidentes por violencia de género atendidos por la Policía desde el 2016 hasta el 30 de abril de 2022. Fuente: Policía de Puerto Rico
		</div>
	</div>
</template>

<script>
	import { map, find, groupBy, orderBy, sumBy, uniq } from 'lodash'
	import { geoMercator } from 'd3-geo'
	import numeral from 'numeral'
	import * as d3 from 'd3'
	import { mapState, mapActions } from 'vuex'

	export default {
		name: 'MapaPrincipal',
		data() {
      return {
        openMenu: false,
        width: 720,
        height: 560,
        initCenter: [],
        center: [],
        initScale: 2500,
        scale: 2500,
        distance: 0,
        bounds: [],
        center_device: [],
        zoomed: false,
        legendaValues: {},
				currentTooltip: {},
				data: []
      }
    },
		mounted() {
			this.renderMapa()
			window.addEventListener('resize', () => {
				this.width = this.widthContainer
				this.bounds = d3.geoBounds(this.pr_geojson)
				this.distance = d3.geoDistance(this.bounds[0], this.bounds[1])
				this.bounds = d3.geoBounds(this.pr_geojson)
				this.initCenter = d3.geoCentroid(this.pr_geojson)
				this.center = d3.geoCentroid(this.pr_geojson)
				this.center_device = [this.width/2, this.height / 2]
				this.initScale = this.width/0.8 / this.distance / Math.sqrt(1)
				this.scale = this.width/1.2 / this.distance / Math.sqrt(1)

				if(window.innerWidth < 560) {
					this.scale = (620) / this.distance / Math.sqrt(1)
				}

				this.projection
					.translate(this.center_device)
					.center(this.center)
					.scale(this.scale)

				this.path.projection(this.projection)

			})
		},
		props: {
			widthContainer: {
				type: Number,
				default: 0
			}
		},
		computed: {
			...mapState({
				all_incidentes: state => state.incidentes.allIncidentes,   
        incidentesPerYear: state => state.incidentes.incidentesPerYear,
        municipioSelected: state => state.incidentes.municipioSelected,
				yearSelected: state => state.incidentes.yearSelected,
				allByArea: state => state.incidentes.allByArea,
				allJusticiaConvicciones: state => state.incidentes.allJusticiaConvicciones
      }),
			summaryStory() {
				return {
					area: uniq(map(this.allByArea, 'area')).join(""),
					total: sumBy(this.allByArea, 'incidentes'),
					total_mujeres: sumBy(this.allByArea, 'femenino'),
					fiscal_ordeno_radicar_cargos: sumBy(this.allByArea, 'fiscal_ordeno_radicar_cargos'),
					conviccion_segun_justicia: sumBy(this.allByArea, 'convicciones'),
					sistema_justicia_convicciones: (sumBy(this.allJusticiaConvicciones, 'convicciones')  )
				}
			},
			allAreas() {
				return orderBy(map(groupBy(this.all_incidentes, 'area_id'), (items, id) => {
					return {
						id: id,
						area: uniq(map(items, 'area')).join("")
					}
				}), ['area'], ['asc'])
			},
			areaName() {
				if(this.allByArea.length == 0)
					return "Seleccionar región policiaca"
				return uniq(map(this.allByArea, 'area')).join("")
			},
			pr_geojson() {
				return require("@/data/puerto-rico-municipios.json")
			},
			regiones_policiacas() {
				return require("@/data/regiones_policiacas.json")
			},
			projection () {
        return geoMercator()
          .translate([this.width/2, this.height/2])
          .scale(this.scale)
      },
			path () {
        return d3.geoPath().projection(this.projection)
      },
			parseMunicipios() {
				const	allYears = map(groupBy(this.all_incidentes, 'area_id'), item => {

					return {
						path: uniq(map(item, 'path')),
						incidentes: sumBy(item, 'incidentes'),
						area_id: uniq(map(item, 'area_id')),
						area: uniq(map(item, 'area')),
						investigacion_produjo_arresto: sumBy(item, 'investigacion_produjo_arresto'),
						multiples_arrestos: sumBy(item, 'multiples_arrestos'),
						fiscal_ordeno_radicar_cargos: sumBy(item, 'fiscal_ordeno_radicar_cargos'),
						convicciones: sumBy(item, 'convicciones'),
						activate_paths: uniq(map(item,'municipio_ids')).join("")
					}
				})

				return allYears
			}
		},
		watch: {
			parseMunicipios(data) {
				this.updateMapa(data)
			},
			municipioSelected(val) {
				if(val != '') {
					let region = find(this.regiones_policiacas, ['id', val])
					this.activate_year(region.center, region.scale)
				} else {
					this.initScale = 15500
					this.activate_year(this.initCenter, this.initScale)
				}
				//this.updateMapa(this.parseMunicipios)
			},
			widthContainer(value) {
				let base = d3.select(this.$refs['pr_municipios'])

				this.width = value
				this.center_device = [this.width/2, this.height / 2]
				this.initScale = this.width/1.2 / this.distance / Math.sqrt(1)
				this.scale = this.width/1.2 / this.distance / Math.sqrt(1)

				if(window.innerWidth < 560) {
					this.scale = (620) / this.distance / Math.sqrt(1)
				}

				this.projection
					.translate(this.center_device)
					.center(this.center)
					.scale(this.scale)

				this.path.projection(this.projection)

				base.selectAll('path')
					.attr('d', this.path)

				d3.select(this.$refs['labels_regiones']).selectAll('text')
					.attr('transform', m => {
            if(m.center_label) {
							return `translate(${this.projection(m.center_label)})`
						}
						else if(m.center) {
							return `translate(${this.projection(m.center)})`
						}
          })

				d3.select(this.$refs['labels_municipios']).selectAll('text')
					.attr('transform', m => {
            if(m.center_label) {
							return `translate(${this.projection(m.center_label)})`
						}
						else if(m.center) {
							return `translate(${this.projection(m.center)})`
						}
          })
			}
		},
		methods: {
			numeral,
			...mapActions('incidentes', [
        'updateYearSelected',
				'updateDataSelected',
				'updateMunicipioSelected',
				'resetMap'
      ]),
			updateMapa(data) {

				if(data.length == 0)
					return false

				let incidentesScale = d3.scaleQuantile()
				incidentesScale.domain([1, 1000, 2000,3000,4000, 5000]).range(['#afafaf','#e7bdbb','#e9a19e','#d9827f','#db4742', '#930702'])

				map(data, item => {
					if(item.activate_paths) {
						const paths = item.activate_paths.split("-")
						map(paths, p => {
							d3.select(`.path-${p}`).attr("count", item.incidentes)
							d3.select(`.path-${p}`).attr("fill", incidentesScale(item.incidentes))
						})
					}
				})
			},
			showMunicipio(area_id) {
				this.updateMunicipioSelected(area_id)
			},
			filterYear(year) {
				this.updateYearSelected(year)
			},
			activate_year(center, scale) {			

        let base = d3.select(this.$refs['pr_municipios'])
				let region = find(this.regiones_policiacas, ['id', this.municipioSelected])
        const r = d3.interpolate(this.center, center)
				let s

				if(window.innerWidth < 560) {
					s = d3.interpolate(this.scale, (scale * .75))
				}
				else {
					s = d3.interpolate(this.scale, scale)	
				}

        base.selectAll('path.municipio-path')
          .transition()
          .duration(1000)
          .attrTween('d', (d) => {
            return (t) => {
              this.projection
                .scale(s(Math.pow(t,2)))                    
                .center(r(Math.pow(t,0.33)))
                .translate(this.center_device)                    
                
                this.path.projection(this.projection)

              return this.path(d)
            }
          })
					.on('start', () => {
						this.removeLabels()
						this.removeLabelsRegiones()
						base.selectAll('path.municipio-path').classed('inactive', true)
						base.selectAll('path.municipio-path').classed('active', false)
					})
					.on('end', () => {
            this.scale = scale
            this.center = center

						if(this.municipioSelected != '')  {
							this.renderLabels()
							map(region.municipio.split("-"), p => {
								d3.select(`.path-${p}`).classed('inactive', false)
								d3.select(`.path-${p}`).classed('active', true)
							})
						} else {
							base.selectAll('path.municipio-path').classed('inactive', false)
							base.selectAll('path.municipio-path').classed('active', false)

							if(window.innerWidth > 560) {
								setTimeout(() => {
									this.renderLabelsRegiones()
								}, 100)
							}
						}
          })
      },
			showTooltip(path) {
				
				d3.selectAll(`.municipio-path`).classed('activate', false)

				this.currentTooltip = find(this.parseMunicipios, p => {
					if(p.path == path.target.id) {
						return p
					}
				})

				map(this.currentTooltip.activate_paths , p => {
					d3.select(`.path-${p}`).classed('activate', true)
				})
			},
			hideTooltip() {
				this.currentTooltip = {}
			},
			renderMapa() {

				this.width = document.querySelector(".map_container").offsetWidth
				let base = d3.select(this.$refs['pr_municipios'])
				this.bounds = d3.geoBounds(this.pr_geojson)
				this.distance = d3.geoDistance(this.bounds[0], this.bounds[1])
				this.bounds = d3.geoBounds(this.pr_geojson)
				this.initCenter = d3.geoCentroid(this.pr_geojson)
				this.center = d3.geoCentroid(this.pr_geojson)
				this.center_device = [this.width/2, this.height / 2]
				this.initScale = this.width/1.2 / this.distance / Math.sqrt(1)
				this.scale = this.width/1.2 / this.distance / Math.sqrt(1)

				if(window.innerWidth < 560) {
					this.scale = (620) / this.distance / Math.sqrt(1)
				}

				this.projection
					.translate(this.center_device)
					.center(this.center)
					.scale(this.scale)

				base.selectAll('g').remove()
				base.selectAll('path.municipio-path').remove()

				base.selectAll('path')
					.data(this.pr_geojson.features)
					.enter()
					.append('path')
					.attr('d', this.path)
					.attr('id', d => {
						return `${d.properties.GEOID}`
					})
					.attr('class', d => {
						return `municipio-path path-${d.properties.GEOID}`
					})
					.on('click', d => {
						
						// d3.selectAll(`.municipio-path`).classed('activate', false)
						// d3.selectAll('path.municipio-path').classed('inactive', true)

						let current = find(this.parseMunicipios, p => {
							if(p.path == d.target.id) {
								return p
							}
						})

						map(current.activate_paths , p => {
							d3.select(`.path-${p}`).classed('inactive', false)
							d3.select(`.path-${p}`).classed('active', true)
						})

						let region = find(this.regiones_policiacas, ['id', current.area_id])

						this.showMunicipio(current.area_id)
						this.activate_year(region.center, region.scale)
					})

					//if(window.innerWidth > 560) {
					setTimeout(() => {
						this.renderLabelsRegiones()
					}, 100)
					//}
				
			},
			removeLabels() {
				let labelsG = d3.select(this.$refs['labels_municipios'])
				labelsG.selectAll('text').remove()
			},
			removeLabelsRegiones() {
				let labelsRegiones = d3.select(this.$refs['labels_regiones'])
				labelsRegiones.selectAll('text').remove()
			},
			renderLabels() {
				
				let labelsG = d3.select(this.$refs['labels_municipios'])

				let region = find(this.regiones_policiacas, ['id', this.municipioSelected])

        this.removeLabels()

        labelsG.selectAll('text')
          .data(this.pr_geojson.features)
          .enter()
          .append('text')
          .attr('transform', m => {
						
            if(!isNaN(this.path.centroid(m)[0])) {
							
							if(m.properties.NAME == 'Bayamón') {
								return `translate(${[648.5274908873516, 160.69369824847553]})`
							}
							
							if(m.properties.NAME == 'Guaynabo')
								return `translate(${this.path.centroid(m)})`
							
							return `translate(${this.path.centroid(m)})`
						}
              
          })
          .attr('class', m => {
						if(region.municipio.includes(m.properties.GEOID)) {
							return `municipio-label municipio-${m.properties.GEOID}`
						}            	
          })
          .attr('pointer-events', 'none')
          .text(d => {
						if(region.municipio.includes(d.properties.GEOID)) {
							return d.properties.NAME
						}            	
          })
			},
			renderLabelsRegiones() {

				let labelsG = d3.select(this.$refs['labels_regiones'])

        labelsG.selectAll('text')
          .data(this.regiones_policiacas)
          .enter()
          .append('text')
          .attr('transform', m => {
            if(m.center_label) {
							return `translate(${this.projection(m.center_label)})`
						}
						else if(m.center) {
							return `translate(${this.projection(m.center)})`
						}
          })
					.attr('class', 'region-name-label')
          .attr('pointer-events', 'none')
          .text(m => {
						if(m.area) {
							return m.area
						}
          })
			}
		}
	}
</script>

<style>
	

	.municipio-label {
    font-size: 12px;
    fill: #fff;
    stroke: rgb(255 255 255);
    stroke-width: 0.1;
    text-align: center;
    text-anchor: middle;
    text-transform: uppercase;
    background: black;
    text-shadow: 1px 1px 6px #000;
	}

	.region-name-label {
    font-size: 12px;
    fill: #fff;
    stroke: rgb(255 255 255);
    stroke-width: 0.1;
    text-align: center;
    text-anchor: middle;
    text-transform: uppercase;
    background: black;
    text-shadow: 1px 1px 6px #000;
	}

	@media (max-width: 576px) {    
		.region-name-label {
			display: none;
		}
  }
</style>