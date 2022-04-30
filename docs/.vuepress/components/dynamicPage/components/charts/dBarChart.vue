<template>
  <div class="pie-container  ">
         <v-chart class="chart" :option="barChartOption" />
  </div>
</template>
<script>


import {deepMergeByKey, hasValue,JSONDeepCopy } from "../../utils/tool"
import  chartOptions from "./chartConfig"
export default {
  name: 'dBarChart',
  components: {},
  props: {
    title:String,
    dataList:{
      type:Object,
      default(){
        return {}
      },
    },
    type:String,
    extraOptions:{
        type:Object,
      default(){
        return {}
      },
    }
  },
  data () {
    const barChartOptionTemplate=chartOptions[this.type+'BarChart']?(chartOptions[this.type+'BarChart']):chartOptions['baseBarChart']
    const self=this
    return {
       barChartOptionTemplate:JSONDeepCopy(deepMergeByKey(barChartOptionTemplate,self.extraOptions))
    }
  },
  computed:{
    barChartOption(){
      // const max = Math.max(...Object.values(this.dataList).flat(2).map(item=>item.value).map(parseFloat), 100)
      
      const xAxis = Object.values(this.dataList)[0].map(item => {
          return item.label
        })
      this.barChartOptionTemplate.xAxis.data = xAxis
      // this.barChartOptionTemplate.yAxis[0].max =  Math.ceil(max / 100) * 100
      // this.barChartOptionTemplate.yAxis[0].interval = Math.ceil(max / 100) * 20
      let series=[]
      debugger
      const seriesTemplate=this.barChartOptionTemplate.series[0]||{}
      this.barChartOptionTemplate.series=[]
      for(let seriesName in this.dataList){
        const seriesData=deepMergeByKey(seriesTemplate,{
              name: seriesName,
              type: 'bar',
              data: this.dataList[seriesName].map(item=>item.value),
            })
          series.push(seriesData)
      }

       this.barChartOptionTemplate.series=series
      

      return  this.barChartOptionTemplate
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
