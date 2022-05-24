<template>
  <main class="flex relative ">
    <DynamicFormContent :formItemList="formFields" ref="searchForm" @formDataUpdated="change" :showTestTool="options.showTestTool" v-bind="options"  :formProperties="options.properties"   >
      <template  #actionBtnSlot>
        <section class="ml12 "  >
          <el-button type="primary" size="small" @click="submit" v-if="options.trigger=='click'">搜索</el-button>
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
    fields: {
      type: Array,
      default: function () {
        return [];
      },
    },
    options: {
      type: Object,
      default: function () {
        return loadPresetConfig('searchForm');
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
          class: ['grid-col-6', 'grid-col-lg-4', 'grid-col-sm-6','grid-col-ss-8', 'grid-col-xs-12']
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
       const data=this.$refs["searchForm"].getData() 
       delete data.actionBtnSlot
       this.$emit('search',data)
    },
    reset() {
      this.$refs["searchForm"].resetFields();
      const data=this.$refs["searchForm"].getData()
      delete data.actionBtnSlot
      this.$emit('search', data)
    },
  },
};
</script>
<style lang="css" scoped>
 
</style>
