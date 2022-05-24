<template>
    <main class=" ">
       <section  v-if="visible.value"  class="grid-wrap" >
          <component v-for="section in body" :key="section.name" :is="section.component"  
          v-bind="section.props">
          </component>  
       </section>
    </main>
</template>
<script>
export default {
  name:'DynamicPage',
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
        
      switch (action.actionType){
        case  'submit':
            this.$refs.DynamicFormContent.validate((valid, data  )=>{
                  console.log(data)
                  if(valid){
                    const dataAdapter=  (typeof action.dataAdapter ==='function')?action.dataAdapter:(res)=>{return res}
                    const callback= (typeof action.callback ==='function' )?action.callback:(action.showTip&&((res)=>{
                      this.visible.value=false
                      this.$message&&this.$message('success',res.msg||res.message||'操作成功')}))
                    action.apiPromise(data).then(dataAdapter).then(callback)
                  }
            })
           break;
          case 'close':
              this.visible.value=false 
           break;
      }
    },
  },
};
</script>
<style lang="css" scoped>
 
</style>
