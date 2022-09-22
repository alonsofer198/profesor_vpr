<template>
	<div class="top-summary candidato-wrapper summary-block pt-3 pb-3">
		<div class="row justify-content-center">
			<div class="col-6">
				<div class="row">
					<div class="col-3 text-right">
						<h2 class="mt-3 titile-cifra">23%</h2>
					</div>
					<div class="col-9">
						<p class="porcentajetext">reducción de profesores regulares en la UPR mediante la congelación o eliminación de 741 plazas docentes desde 2010 hasta el 2022</p>
					</div> 
				</div>				
			</div>
			<div class="col-6">
				<div class="row">
					<div class="col-3 text-right">
						<h2 class="mt-3 titile-cifra">30%</h2>
					</div>
					<div class="col-9">
						<p class="porcentajetext">aumento en la contratación de profesores a tiempo parcial o completo en la UPR desde 2010 hasta el 2022.</p>
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
		name: 'PrincipalHome',
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