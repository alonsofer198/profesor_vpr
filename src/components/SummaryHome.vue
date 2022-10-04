<template>
	<div class="top-summary summary-block pt-3 pb-3">
		<div class="row justify-content-center">
			<div class="col-12 map-navigation">
				<div class="row justify-content-center">
					<div class="col-11 col-md-12 resumen align-self-center">
						<div class="row candidato-wrapper justify-content-center">
							<div class="col-12 col-md-8 text-center">
								<h2 class="mt-3 titile-graph">Cantidad de profesores en UTUADO</h2>
								<div class="mb-3 titile-graph2">Año Fiscal del 2009-2010 al 2021-2022</div>
							</div>
							
							
						</div>						
					</div>
					<div class="col-12 col-md-12 position-relative">
						<div class="d-block d-md-none arrow-next">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
							</svg>
						</div>
						<div class="bar-col-container bar-home-summary" v-if="ultimo_anio.length > 0">
							<div class="col-bar" v-for="m in ultimo_anio" :key="`${m.area}_${yearSelected}`">
								<div class="col-auto bar-container" v-if="m && m.incidentes">
									<div class="label" :style="`top: ${calcTopAnio('incidentes', m.incidentes)}`">{{numeral(m.incidentes).format('0,0')}}</div>
									<div class="bar-percent">
										<div class="percent-incidentes text-center" :style="`background-color:#db4742; height: ${calcPercentAnio('incidentes', m.incidentes)}`"></div>
									</div>
									<span :style="`top: ${calcTopRegion('incidentes', m.incidentes)}`" class="area-name">{{ m.area }}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="text-center fuente pt-3 pb-3">
						Fuente: Universidad de Puerto Rico
					</div>
				</div>

			</div>
		</div>
	</div>

</template>

<script>
	import * as d3 from 'd3'
	import numeral from 'numeral'
	import { filter, groupBy, orderBy, uniq, map, maxBy } from 'lodash'
	import { mapState, mapActions } from 'vuex'

	export default {
		name: 'SummaryHome',
		computed: {
			...mapState({        
        all_incidentes: state => state.incidentes.allIncidentes,
        yearSelected: state => state.incidentes.yearSelected,
        municipioSelected: state => state.incidentes.municipioSelected
      }),
			ultimo_anio(){
				let data = orderBy(filter(this.all_incidentes, ['anio', this.yearSelected]), ['incidentes'], ['desc'])

				return data
			},
			areaName() {
				return uniq(map(this.all_incidentes, 'area')).join("")
			},
			allAreas() {
				return map(groupBy(this.all_incidentes, 'area_id'), (items, id) => {
					return {
						id: id,
						area: uniq(map(items, 'area')).join("")
					}
				})
			}
		},
		methods: {
			numeral,
			...mapActions('incidentes', [
        'updateYearSelected',
				'updateDataSelected',
				'updateMunicipioSelected'
      ]),
			calcColorPercent(value,field) {
				let max = maxBy(this.ultimo_anio, field)
				let incidentesScale = d3.scaleQuantize()
				incidentesScale.domain([1, max[field]]).range(['#f7fcf0','#e0f3db','#ccebc5','#a8ddb5','#7bccc4','#4eb3d3','#2b8cbe','#0868ac','#084081'])

				return incidentesScale(value)
			},
			calcPercentAnio(field, value) {

				let max = maxBy(this.ultimo_anio, field)

				let incidentesScale = d3.scaleLinear()

				incidentesScale
					.domain([0, max[field]])
					.range([0, 150])

				return `${incidentesScale(value)}px`
			},
			calcTopAnio(field, value) {

				let max = maxBy(this.ultimo_anio, field)

				let incidentesScale = d3.scaleLinear()

				incidentesScale
					.domain([0, max[field]])
					.range([5, 150])

				let topLabel = (150 - incidentesScale(value)) + 5

				return `${topLabel}px`
			},
			calcTopRegion(field, value) {

				let max = maxBy(this.ultimo_anio, field)

				let incidentesScale = d3.scaleLinear()

				incidentesScale
					.domain([0, max[field]])
					.range([5, 150])

				let topLabel = (150 - incidentesScale(value)) - 25

				return `${topLabel}px`
			},
			filterYear(year) {				
				this.updateYearSelected(year)
			},
			showMunicipio(area_id) {
				this.updateMunicipioSelected(area_id)
			}
		}
	}

</script>