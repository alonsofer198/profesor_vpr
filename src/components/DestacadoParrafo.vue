<template>
	<div class="top-summary summary-block pt-3 pb-3">
		<div class="row justify-content-center">
			<div class="col-12 map-navigation">
				<div>
					<b-tabs content-class="mt-3">
						<b-tab title="First" active><p class="fuente">Entre el año académico 2010-2011 y el 2021-2022, la UPR contrató 389 profesores a tiempo completo y 173 a tiempo parcial para sus once recintos y unidades.</p>
							<div class="col-12 col-md-12 position-relative">
								<div class="d-block d-md-none arrow-next">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
										<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
									</svg>
								</div>
							</div>
							<div class="col-12">
								<barrasHome :data="allProfesores"/>
							</div>
							<div class="text-center fuente pt-3 pb-3">
								Fuente: Universidad de Puerto Rico
							</div>
						</b-tab>
					</b-tabs>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import numeral from 'numeral'
	import { groupBy, map, uniq } from 'lodash'
	import { mapState, mapActions } from 'vuex'
	import barrasHome from '@/components/barrasHome.vue'

	export default {
		name: 'DestacadoParrafo',
		components: {
			barrasHome
		},
		computed: {
			...mapState({        
        data_contratos: state => state.incidentes.data_contratos
      }),
			allProfesores() {
				return map(groupBy(this.data_contratos, 'tipo_profesor'), (items, id) => {
					return {
						id: id,
						tipo_profesor: uniq(map(items, 'tipo_profesor')).join(""),
						sedes: groupBy(items, 'sede')
					}
				})
			}
		},
		methods: {
			numeral,
			...mapActions('incidentes', [
        'updateYearSelected',
				'updateMunicipioSelected'
      ]),
			filterYear(year) {				
				this.updateYearSelected(year)
			},
			showMunicipio(area_id) {
				this.updateMunicipioSelected(area_id)
			}
		}
	}

</script>