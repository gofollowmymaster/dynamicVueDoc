<template>
    <main class=" ">
      <component    v-bind="$attrs" :is="container"  :visible.sync="visible.value" :fullscreen="fullscreen">
       <section  v-if="visible.value" >
          <component 
           v-for="item in body" 
           :is="item.component"
            v-bind="item.props"
            
            >

          </component>
      <section class="flex mt12 p12" :class="{'align-right':container=='dialog'}">
        <el-button   v-for="btn in body.btns" v-bind="btn.properties" :key="btn.label" @click="actionHandle(btn)">
            {{btn.label}}  
        </el-button>
      </section>
       </section>
    </component>

    </main>
     
</template>
<script>
export default {
  name:'DynamicFormDialog',
  props: {
    visible:Object,
    container:String,
    fullscreen:Boolean,
    body: {
      type: Object,
      default: function () {
        return {};
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
.flex {
  display: flex;
}
.align-right{
  justify-content: flex-end;
}
</style>
