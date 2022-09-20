<template>
	<div class="top-summary">
		<div class="row justify-content-center pt-3">
			<div class="col-12 map-navigation">
				<div class="row" v-if="allByArea.length > 0">
					<div class="col-12 mt-3">
						<h2 class="text-left">Violencia de género en {{ areaName }}</h2>

					</div>	
					<div class="col-12">
						<b-tabs content-class="mt-3">
							<b-tab :title="`Víctimas por género`" active>

								<div class="actualizacion">
									Actualizaciones desde el 2016 hasta el 30 de abril de 2022.
								</div>

								<div class="bajada">
									En {{ areaName }} se han reportado {{ numeral(totalAreaName).format('0,0') }} víctimas de violencia, <span style="background-color: #930701; color: #fff;">{{ percentAreaName.fem }}% fueron mujeres</span>.
								</div>



								<div class="bar-col-container justify-content-center">
									<div class="col-bar" v-for="m in allByArea" :key="`genero_${m.anio}_${m.area}`">

										<div class="row m-1">
											<div class="col-12">
												<div class="row justify-content-center">
	
													<div class="col-auto bar-container bar-container-2">
														<div class="label" :style="`top: ${calcTop('masculino', m.masculino, allByArea)}`">{{numeral(m.masculino).format('0,0')}} </div>
														<div class="bar-percent">
															<div class="percent-incidentes" :style="`background-color: #d9827f;height: ${calcPercent('masculino', m.masculino, allByArea)}`"></div>
														</div>
													</div>
	
													<div class="col-auto bar-container bar-container-2">
														<div class="label" :style="`top: ${calcTop('femenino', m.femenino, allByArea)}`">{{numeral(m.femenino).format('0,0')}}</div>
														<div class="bar-percent">
															<div class="percent-incidentes" :style="`background-color: #930701; height: ${calcPercent('femenino', m.femenino, allByArea)}`"></div>
														</div>
													</div>
	
													<div class="col-auto bar-container bar-container-2" v-if="m.genero_desconocido != '0'">
														<div class="label" :style="`top: ${calcTop('genero_desconocido', m.genero_desconocido, allByArea)}`">{{numeral(m.genero_desconocido).format('0,0')}}</div>
														<div class="bar-percent">
															<div class="percent-incidentes" :style="`background-color: #76929a; height: ${calcPercent('genero_desconocido', m.genero_desconocido, allByArea)}`"></div>
														</div>
													</div>
												</div>
											</div>
											<div class="col-12 text-center border-top  anio-bar">
												<span>{{ m.anio }}</span>
											</div>
										</div>
									</div>
								</div>


								<div class="legend-container">
									<div class="legend-item legend-mas"><span></span><label>Masculino</label></div>
									<div class="legend-item legend-fem"><span></span><label>Femenino</label></div>
									<div class="legend-item legend-des"><span></span><label>Desconocido</label></div>
								</div>
								<div class="text-center fuente pt-3">
									Fuente: Policía de Puerto Rico
								</div>
							</b-tab>
							<b-tab title="Radicación de Cargos y Convicciones">
								<div class="d-block">

								</div>
							</b-tab>

							<b-tab title="Convicciones según justicia">
								<barChartGroup :area="areaName" :data="allJusticiaConvicciones" :columns="['radicacion', 'casos_archivados', 'convicciones', 'absoluciones']" />
							</b-tab>

							<b-tab title="Órdenes de protección">

								<div class="actualizacion">
									Actualizaciones desde el 2018 hasta el 30 de abril de 2022.
								</div>

								<div class="bajada">
									En {{ areaName }}, {{ numeral(percentAreaName.ordenes).format('0,0') }} de las víctimas solicitaron una orden de protección contra sus agresores, pero solo el <span style="background-color: #75b76d; color: #fff;">{{ numeral(percentAreaName.emitidas).format('0,0') }}% fueron emitidas.</span>.
								</div>

								<div class="bar-col-container justify-content-center">
									<div class="col-bar" v-for="m in ordenesByArea" :key="`ordenes_area_${m.anio}_${m.area}`">

										<div class="row m-1">
											<div class="col-12">
												<div class="row">
													<div class="col-auto bar-container-2 bar-container">
														<div class="label" :style="`top: ${calcTopAnio('total_de_solicitudes', m.total_de_solicitudes, ordenesByArea)}`">{{numeral(m.total_de_solicitudes).format('0,0')}}</div>
														<div class="bar-percent">
															<div class="percent-incidentes" :style="`background-color: #3d3d3c;height: ${calcPercentAnio('total_de_solicitudes', m.total_de_solicitudes, ordenesByArea)}`"></div>
														</div>
													</div>
	
													<div class="col-auto bar-container-2 bar-container">
														<div class="label" :style="`top: ${calcTopAnio('total_de_solicitudes', m.finales_emitidas, ordenesByArea)}`">{{numeral(m.finales_emitidas).format('0,0')}} </div>
														<div class="bar-percent">
															<div class="percent-cargos" :style="`background-color: #75b76d;height: ${calcPercentAnio('total_de_solicitudes', m.finales_emitidas, ordenesByArea)}`"></div>
														</div>
													</div>
	
													<div class="col-auto bar-container-2 bar-container">
														<div class="label" :style="`top: ${calcTopAnio('total_de_solicitudes', m.denegadas, ordenesByArea)}`">{{numeral(m.denegadas).format('0,0')}}</div>
														<div class="bar-percent">
															<div class="percent-convictos" :style="`background-color: #9d4444;height: ${calcPercentAnio('total_de_solicitudes', m.denegadas, ordenesByArea)}`"></div>
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
									<div class="legend-item legend-sol"><span></span><label>Total de solicitudes</label></div>
									<div class="legend-item legend-emi"><span></span><label>Emitidas</label></div>
									<div class="legend-item legend-den"><span></span><label>Denegadas</label></div>
								</div>
								<div class="text-center fuente pt-3">Fuente: Oficina de Administración de los Tribunales, Sistema de Órdenes de Protección Automatizadas (OPA)</div>
							</b-tab>
						</b-tabs>
					</div>
				</div>
			</div>
			
		</div>
	</div>

</template>

<script>
	import * as d3 from 'd3'
	import numeral from 'numeral'
	import { filter, groupBy, sumBy, orderBy, uniq, map, maxBy } from 'lodash'
	import { mapState, mapActions } from 'vuex'
	import barChartGroup from '@/components/barChartGroup'

	export default {
		name: 'Summary',
		components: {
			barChartGroup
		},
		computed: {
			...mapState({        
        all_incidentes: state => state.incidentes.allIncidentes,
        yearSelected: state => state.incidentes.yearSelected,
				municipioSelected: state => state.incidentes.municipioSelected,
				allByArea: state => state.incidentes.allByArea,
				allJusticiaConvicciones: state => state.incidentes.allJusticiaConvicciones,
				ordenesByArea: state => state.incidentes.ordenesByArea
      }),
			ultimo_anio(){
				let data = orderBy(filter(this.all_incidentes, ['anio', this.yearSelected]), ['incidentes'], ['desc'])
				return data
			},
			areaName() {
				return uniq(map(this.allByArea, 'area')).join("")
			},
			totalAreaName() {
				return sumBy(this.allByArea, 'incidentes')
			},
			percentAreaName() {
				const total = sumBy(this.allByArea, 'incidentes')
				const fem = sumBy(this.allByArea, 'femenino')
				const mas = sumBy(this.allByArea, 'masculino')
				const arrestos = sumBy(this.allByArea, 'investigacion_produjo_arresto')
				const cargos = sumBy(this.allByArea, 'fiscal_ordeno_radicar_cargos')
				const convicciones = sumBy(this.allByArea, 'convicciones')
				
				const ordenes = sumBy(this.ordenesByArea, 'total_de_solicitudes')
				const emitidas = sumBy(this.ordenesByArea, 'finales_emitidas')
				console.log(ordenes, emitidas)
				return {
					"fem": ((fem/total) * 100).toFixed(0),
					"mas": ((mas/total) * 100).toFixed(0),
					"arrestos": arrestos,
					"cargos": cargos,
					"convicciones": ((convicciones/arrestos) * 100).toFixed(1),
					"ordenes": ordenes,
					"emitidas": ((emitidas / ordenes) * 100).toFixed(0)
				}
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
		watch: {
			ultimo_anio(data) {
				this.updateDataSelected(data)
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
			calcPercent(field, value) {

				let max = maxBy(this.allByArea, 'incidentes')

				let incidentesScale = d3.scaleLinear()

				incidentesScale
					.domain([0, max.incidentes])
					.range([0, 150])

				return `${incidentesScale(value)}px`
			},
			calcPercentAnio(field, value, dataset) {

				let max = maxBy(dataset, field)

				let incidentesScale = d3.scaleLinear()

				incidentesScale
					.domain([0, max[field]])
					.range([0, 150])

				return `${incidentesScale(value)}px`
			},
			calcPercentConvictos(field, value, dataset) {

				let max = maxBy(dataset, field)

				let incidentesScale = d3.scaleLinear()

				incidentesScale
					.domain([0, max['fiscal_ordeno_radicar_cargos']])
					.range([0, 150])

				return `${incidentesScale(value)}px`
			},
			calcTop(field, value) {
				
				let max = maxBy(this.allByArea, field)
				let incidentesScale = d3.scaleLinear()

				incidentesScale
					.domain([0, max.incidentes])
					.range([5, 150])

				let topLabel = (150 - incidentesScale(value)) - 25

				return `${topLabel}px`
			},
			calcTopAnio(field, value, dataset) {

				let max = maxBy(dataset, field)

				let incidentesScale = d3.scaleLinear()

				incidentesScale
					.domain([0, max[field]])
					.range([5, 150])

				let topLabel = (150 - incidentesScale(value)) - 25

				return `${topLabel}px`
			},
			calcTopConvictos(field, value, dataset) {

				let max = maxBy(dataset, field)

				let incidentesScale = d3.scaleLinear()

				incidentesScale
					.domain([0, max['fiscal_ordeno_radicar_cargos']])
					.range([5, 150])

				let topLabel = (150 - incidentesScale(value)) - 25

				return `${topLabel}px`
			},
			calcTopRegion(field, value) {

				let max = maxBy(this.ultimo_anio, field)

				let incidentesScale = d3.scaleLinear()

				incidentesScale
					.domain([0, max[field]])
					.range([5, 150])

				let topLabel = (150 - incidentesScale(value)) - 40

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