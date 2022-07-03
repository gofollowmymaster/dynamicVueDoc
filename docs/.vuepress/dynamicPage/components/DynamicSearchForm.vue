<template>
  <main class="flex relative search-container">
    <DynamicFormContent :formItemList="formFields" ref="searchOption" @formDataUpdated="change" :showTestTool="options.showTestTool" 
    v-bind="options"  :formProperties="options.properties"  :data="data" >
      <template  #actionBtnSlot>
        <section class="ml12 "  >
          <el-button type="primary" size="small" @click="submit" v-if="options.trigger=='click'">{{options.searchLabel||'搜索'}}</el-button>
          <el-button @click="reset" size="small" v-if="options.resetable" >重置</el-button>
        </section>
      </template>
    </DynamicFormContent>
  </main>
</template>
<script>
import { deepCopy ,appendToPreset,loadPresetConfig} from '../utils/tool';
 
export default {
  name:'DymamicSearchForm',
  props: {
    data:{
      type:Object,
      default(){
        return {}
      }
    },
    fields: {
      type: Array,
      default: function () {
        return [];
      },
    },
    options: {
      type: Object,
      default: function () {
        return loadPresetConfig('searchOption');
      },
    },
 
  },
  data: function () {
    return {
      
    };
  },
  computed: {
    formFields(){

      const fieldsClone= deepCopy(this.fields)
      fieldsClone[0].children.push({
        type: 'slot',
        wrapertype: 'div',
        key: 'actionBtnSlot',
        label: '',
        wraperProperties: {
          class:this.options.searchClasses
        }
      })
      return  fieldsClone
    }
     
  },
  components: {},
  mounted(){
    
  },
  methods: {
    change(){
      debugger
      if(this.options.trigger=='change'){
        this.submit()
      }
    },
    submit() {
       const data=this.$refs["searchOption"].getData() 
       delete data.actionBtnSlot
       this.$emit('search',data)
    },
    reset() {
      this.$refs["searchOption"].resetFields();
      const data=this.$refs["searchOption"].getData()
      delete data.actionBtnSlot
      this.$emit('search', data)
    },
  },
};
</script>
<style lang="css" scoped>
 .search-container {
  --layout-row-gap:2px;
  --layout-gap:2px;
}
</style>
