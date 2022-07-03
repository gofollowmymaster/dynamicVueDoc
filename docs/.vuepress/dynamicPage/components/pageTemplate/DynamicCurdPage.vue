<template>
  <div class=" hz-low-code flex flex-direction full-width"  >
    <dyBrandBar >
      <span slot="title">{{ entityLabel }}</span>
    </dyBrandBar>
    <DynamicPageWrapper class="flex1 p12">
      <DynamicDetailPage v-show="objId" :optionsProps="pageOptionsprops" :fields="fields"  :entityLabel="entityLabel" 
       :apiPromises="apiPromises"  :formSections="formSections" :detailId="objId" :actionKey="action"></DynamicDetailPage>

      <DynamicCurd v-if="!objId" :optionsProps="pageOptionsprops" :fields="fields"  :entityLabel="entityLabel" 
       :apiPromises="apiPromises" :isDebuggerMode="isDebuggerMode" :mode="mode" :formSections="formSections" ></DynamicCurd>
    </DynamicPageWrapper>
  </div>
</template>
<script>
 

export default {
  name: 'DynamicCurdPage',
  props: {
    pageOptionsprops: { type: Object },
    fields: {
      type: Array,
      required: true
    },
    formSections: {
      type: Object,
      default: function () {
        return {}
      }
    },
    apiPromises: {
      type: Object,
      default(){
        return {}
      }
    },
    entityLabel:String,
    mode:{type:String,default:'dialog'},
    isDebuggerMode:{
      type:Boolean,
      default:true
    }
  },
  computed: {
    
  },
  data: function () {
    return {
        objId:'',
        action:'detail'
    }
  },
  created(){
    this.$watch(
      '$route',
      (toParams, previousParams) => {
        // 对路由变化做出响应...
        this.getRouterIdInParams()
      },{
        immediate:true
      }
    )
  },
  
  methods: {
     getRouterIdInParams(){

       debugger
       this.objId=this.$route.params?.id||this.$route.query?.id
       this.action=this.$route.params?.action||this.$route.query.action



     }
  }
}
</script>

<style lang="less" scoped>
 
</style>
