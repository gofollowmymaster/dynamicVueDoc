<template>
    <main class="dynamic-form-wraper " 
    >
   

          <DynamicFormContent 
            ref="DynamicFormContent"   
            :data="formData" 
            :formItemList="formOption.formItemList"
            @formDataUpdated="formDataUpdated"
            v-bind="formOption">
          </DynamicFormContent>
      <section class="flex mt12 p12"  >
        <el-button   v-for="btn in actions" v-bind="btn.properties" :key="btn.label" @click="actionHandle(btn)">
            {{btn.label}}  
        </el-button>
       </section>
    
    </main>
     
</template>
<script>
import actionMixin from './actionMixin'

export default {
  name:'DynamicForm',
  mixins:[actionMixin],
  data(){
    return {
      formData:{}
    }
  },
  props: {
    formOption:{
      type: Object,
      default: function () {
        return {};
      },
    },
    actions:{
      type: Object,
      default: function () {
        return {};
      },
    },
    dataRquest: {
      type: Object,
      default: function () {
        return {};
      },
    },
    data:{
      type:Object,
        default: function () {
        return {};
      },
    }
  },
  computed: {
  },
  watch:{
    dataRquest:{
      handler(dataRquest){
        debugger
            if ( dataRquest?.apiPromise instanceof Function) {
        
      const dataAdapter =
      typeof dataRquest.dataAdapter === "function"? dataRquest.dataAdapter: (res) => res;
      dataRquest
        .apiPromise(this.data)
        .then(dataAdapter)
        .then((data) => {
           
           this.formData=data
        });
      }
      },
      deep:true,
      immediate:true
    }
    

  },
  mounted(){
    this.formData=this.data
  },
  components: { },
  methods: {
     
    reset() {
      this.$refs["DynamicFormContent"].resetFields();
    },
    actionHandle(action){
       this.actionHandles(action)
    },
    formDataUpdated(vm,data){
        
    }
  },
};
</script>
<style lang="css" scoped>
</style>
