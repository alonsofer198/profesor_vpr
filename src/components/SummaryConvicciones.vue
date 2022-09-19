<template>
	<div class="top-summary">
		<div class="row">
			<div class="col-12 col-md-12 position-relative">
				<div class="d-block d-md-none arrow-next">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
					</svg>
				</div>
				<div class="bar-col-container-2 bar-home-summary" v-if="data.length > 0">
					<div class="col-bar" v-for="m in data" :key="`${m.anio}`">
						<div class="col-auto bar-container" v-if="m && m.casos">
							<div class="label" :style="`top: ${calcTopAnio('casos', m.casos)}`">{{numeral(m.casos).format('0,0')}}</div>
							<div class="bar-percent">
								<div class="percent-incidentes text-center" :style="`background-color:#db4742; height: ${calcPercentAnio('casos', m.casos)}`"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="bar-col-container-2 bar-other-summary" v-if="data.length > 0">
					<div class="col-bar" v-for="m in data" :key="`${m.anio}`">
							<span :style="`text-center: center;`" class="area-name">{{ m.anio }}</span>
					</div>
				</div>
			</div>
		</div>
    

	</div>

</template>

<script>
	import * as d3 from 'd3'
	import numeral from 'numeral'
	import { maxBy } from 'lodash'
	
	export default {
		name: 'SummaryConvicciones',
		props:{	
			data:{
				type: Array
			}
		},
		methods: {
			numeral,
			calcTopAnio(field, value) {
				let max = maxBy(this.data, field)
				let incidentesScale = d3.scaleLinear()

				incidentesScale
					.domain([0, max[field]])
					.range([20, 150])

				let topLabel = (150 - incidentesScale(value)) + 5

				return `${topLabel}px`
			},
			calcPercentAnio(field, value) {

				let max = maxBy(this.data, field)

				console.log(max[field])

				let incidentesScale = d3.scaleLinear()
				incidentesScale
					.domain([0, max[field]])
					.range([20, 150])
				return `${incidentesScale(value)}px`
			},
		}
	}

</script>