<template>
  <div class="pie-container  ">
      <v-chart class="chart" :option="pieChartOption" />
  </div>
</template>
<script>

import {hasValue,JSONDeepCopy,deepMergeByKey } from "../../utils/tool"
import  chartOptions from "./chartConfig"
export default {
  name: 'dPieChart',
  components: {},
  props: {
    data: {
      type: Array,
      require: true
    },
    title:String,
    type:String,
    extraOptions:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data () {
    const pieChartOptionTemplate=chartOptions[this.type+'Chart']?(chartOptions[this.type+'Chart']):chartOptions['basePieChart']
    return {
       pieChartOptionTemplate:deepMergeByKey(JSONDeepCopy(pieChartOptionTemplate),this.extraOptions)
    }
  },
  computed:{
    pieChartOption(){
      debugger
      this.pieChartOptionTemplate.color = [...this.data.reduce((prev,next)=>{
        prev.push(next.color)
        return prev
      },[]).filter(item=>item),...this.pieChartOptionTemplate.color,]
      this.pieChartOptionTemplate.series[0].data = this.data
      return  this.pieChartOptionTemplate
    }
  },

  mounted () {

  },
  methods: {}
}
</script>

<style lang="css" scoped>
.statistic-container {
background: #FFFFFF;
width: 100%;
} 
   
             
</style>
