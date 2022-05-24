<template>
    <main class="dynamic-form-wraper " 
    >
          <DynamicFormContent 
            ref="DynamicFormContent"   
            :data="formData" 
            :formItemList="formItemList"
            @formDataUpdated="formDataUpdated"
            v-bind="formOption">
          </DynamicFormContent>

         <DynamicActions
        :actions="actions"
        :actionData="{}"
      ></DynamicActions>
    
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
    formItemList:{
      type:Array,
      default:function(){
        return []
      }
    },
    actions:{
      type: Object,
      default: function () {
        return {};
      },
    },
    apiPromise: {
      type: Function,
      default: ()=>Promise.resolve(),
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
    apiPromise:{
      handler(apiPromise){
        debugger
            if (apiPromise instanceof Function) {
        
      apiPromise(this.data)
        .then((data) => {
          if(data instanceof Object )
           this.formData=data
        });
      }
      },
      deep:true,
      immediate:true
    },
    data:{
      handler(data){
        if(data instanceof Object )
        this.formData=data
      },
      immediate:true,
    }
    

  },
  mounted(){
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
