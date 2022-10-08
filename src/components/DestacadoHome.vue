<template>
	<div class="top-summary summary-block pt-3 pb-3">
		<div class="row justify-content-center">
			<div class="col-12">
				<div class="row">
					<div class="col-12">
						<barrasGeneral :data="allProfesores"/>
					</div>
					<div class="text-center fuente pt-3 pb-3">
						Fuente: Universidad de Puerto Rico
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<style>
	.desc {
		color: #7e7e7e;
		font-size: 16px;
	}
</style>

<script>
	import numeral from 'numeral'
	import { groupBy, map, sumBy, uniq } from 'lodash'
	import { mapState, mapActions } from 'vuex'
	import barrasGeneral from '@/components/barrasGeneral.vue'

	export default {
		name: 'DestacadoHome',
		components: {
			barrasGeneral
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
						sedes: map(groupBy(items, 'anio_fiscal'), (i_a, anio) => {
              return {
                anio_fiscal: anio,
                cantidad: sumBy(i_a, 'cantidad')
              }
            })
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