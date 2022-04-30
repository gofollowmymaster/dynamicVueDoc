<template>
    <main class="">
      <component    v-bind="$attrs" :is="container"  :visible.sync="visible.value" custom-class="hz-low-code">
       <section  v-if="visible.value"  class="grid-wrap" >
          <component v-for="section in body" :key="section.name" :is="section.component"  
          :data="section.name=='@object@'?data  :data[section.name]"
          v-bind="section.props">
          </component>  
       </section>
    </component>
    </main>
     
</template>
<script>
import actionMixin from '../actionMixin'

export default {
  name:'DynamicPageDialog',
  mixins:[actionMixin],
  props: {
    data:{},
    visible:Object,
    container:String,
    fullscreen:Boolean,
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
  },
  
  computed: {
    
  },
  mounted(){
    console.log('----this.$attrs----',this.$attrs)
  },
  components: { },
  methods: {
     
    reset() {
      this.$refs["searchForm"].resetFields();
    },
    actionHandle(action){
        
       this.actionHandles(action)
       
    },
  },
};
</script>
<style lang="css" scoped>
.flex {
  display: flex;
}
.align-right{
  justify-content: flex-end;
}
</style>
