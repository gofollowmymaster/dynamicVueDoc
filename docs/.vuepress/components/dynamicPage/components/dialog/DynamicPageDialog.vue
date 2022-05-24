<template>
 
    <component       v-bind="properties" :is="container"  :visible.sync="visible.value" custom-class="hz-low-code" 
      @closed="afterClose">
       <components  :is="layoutComp.name"    v-bind="layoutComp.properties" >
          <component v-for="section in body" :key="section.name" :is="section.component"  :label="section.label"  
          :data="section.name=='@object@'?data  :data[section.name]"
          v-bind="section.props"  :props="section.props">
              <component v-for="(subSection,index) in section.children" :key="index" :is="subSection.component"   v-bind="subSection.props"   ></component>  
          </component>  
       </components>
    </component>
     
</template>
<script>

export default {
  name:'DynamicPageDialog',
  props: {
    data:{},
    visible:{
      type:Object,
      default(){
        return {value:false}
      }
    },
     container: {
      type:String,
      default:'el-dialog'
    },
    body: {
      type: Array,
      default: function () {
        return [];
      },
    },
    properties:{
      type: Object,
      default: function () {
        return {};
      },
    },
    layout:{
      type:[String,Object],
      default:'LayoutGrid'
    },
    onclose:{
     type:Function,
     default:function(){}
    }
  },
  
  computed: {
    layoutComp(){
      if(typeof this.layout ==='string'){
        return {name:this.layout}
      }
      return this.layout
    }
  },
  mounted(){
    console.log('----this.$attrs----',this.data)
  },
  components: { },
  methods: {
    afterClose(){
      this.onclose()
    },
     
 
  
  },
};
</script>
<style lang="css" scoped>
 
</style>
