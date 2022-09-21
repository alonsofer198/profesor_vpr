<template>
	<div class="top-summary summary-block pt-3 pb-3">
		<div class="row justify-content-center">
			<div class="col-12 map-navigation">
				<div class="row justify-content-center">
					<div class="col-11 col-md-12 resumen align-self-center">
						<div class="row candidato-wrapper justify-content-center">
							<div class="col-12 col-md-8 text-center">
								<h2 class="mt-3 titile-cifra">Cifras Destacadas:</h2>
								<p>23% <span class="incidentes-badge">reducción de profesores regulares en la UPR mediante la congelación o eliminación de 741 plazas docentes desde 2010 hasta el 2022</span></p>
								
								<p>30% <span class="incidentes-badge">aumento en la contratación de profesores a tiempo parcial o completo en la UPR desde 2010 hasta el 2022.</span></p>
								
								<p><span class="incidentes-badge">Entre el año académico 2010-2011 y el 2021-2022, la UPR contrató 389 profesores a tiempo completo y 173 a tiempo parcial para sus once recintos y unidades.</span></p>

								<p><span class="incidentes-badge">Para el 2010, la UPR contaba con 3,176 docentes regulares, pero el año académico 2021-2022 cerró con 2,435. Mientras, de 959 docenes por contrato a tiempo parcial y 360 a tiempo completo en el 2010, la contratación saltó a 1,132 y 749, respectivamente.  </span></p>
                            
							</div>                
							</div>

                            
							
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
		name: 'DestacadosHome',
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