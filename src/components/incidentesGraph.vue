
<template>
  <div class="row candidato-wrapper">
    
    <div class="col-12 align-self-end">
      <div id="graph_incidentes_total">
				<svg height="500" width="100%">
					<g ref="g_total_incidentes"></g>
				</svg>
			</div>
    </div>

  </div>
</template>

<style>
  #graph_incidentes_total svg {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  #graph_incidentes_total path {
    stroke: #fff;
  }
</style>

<script>

  //import {  groupBy, filter, map, uniq, sortBy } from 'lodash'
  import * as d3 from 'd3'
  import { schemePaired } from 'd3-scale-chromatic'
  import { mapState } from 'vuex'

  export default {
    name: "incidentesGraph",
    data() {
      return {
        selected: [],
				checked: true
      }
    },
    computed: {
      ...mapState({        
        all_incidentes: state => state.incidentes.allIncidentes,
        all_testData: state => state.incidentes.allTestData,
      })
    },
    watch: {
      all_testData(value) {
        this.renderGraph(value)
      }
    },
    methods: {
      renderGraph(dataset) {
        const width = 960
        const height = 500
        const radius = (Math.min(width, height) / 2) - 10
        const formatNumber = d3.format(",d");
        const x = d3.scaleLinear()
          .range([0, 2 * Math.PI]);
        const y = d3.scaleSqrt()
          .range([0, radius])

        const color = d3.scaleOrdinal(schemePaired)
        const partition = d3.partition()

        // These values will be provided by d3.partition() 
        const arc = d3.arc()
          .startAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x0))))
          .endAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x1))))
          .innerRadius(d => Math.max(0, y(d.y0)))
          .outerRadius(d => Math.max(0, y(d.y1)));
        const svg = d3.select(this.$refs['g_total_incidentes'])
          .attr("transform", `translate(${width/2}, ${height/2})`);


          let root = d3.hierarchy(dataset)
            .sum(d => d.size);

          // Add an arc for each of the nodes in our hierarchy. partition(root) adds x0, x1, y0, and y1 values to each node.
          svg.selectAll("path")
            .data(partition(root).descendants())
            .enter().append("path")
            .attr("d", arc)
            .style("fill", d => color((d.children ? d : d.parent).data.name))
            .on("click", click)
            .append("title")
            .text(d => `${d.data.name}\n${formatNumber(d.value)}`);

        const click = d => {
          // Redraw the arcs when one of them is clicked to zoom in on a section
          svg.transition()
            .duration(750)
            .tween("scales", () => {
            const xd = d3.interpolate(x.domain(), [d.x0, d.x1]);
            const yd = d3.interpolate(y.domain(), [d.y0, 1]);
            const yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
            return t => { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
          })
            .selectAll("path")
            .attrTween("d", d => (() => arc(d)));
        }


      }
    }
  }
</script>