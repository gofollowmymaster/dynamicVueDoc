<template>
  <div class=" hz-low-code flex flex-direction full-width">
    <BrandBar>
      <span slot="title">{{ entityLabel }}管理</span>
    </BrandBar>
    <main class="flex1">
      <DynamicCurd :optionsProps="pageOptionsprops" :fields="fields"  :entityLabel="entityLabel"  :apiPromises="apiPromises" ></DynamicCurd>
    </main>
  </div>
</template>
<script>
 
// import BrandBar from '@/components/content/BrandBar/BrandBar.vue'

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
    entityLabel:String
  },
  computed: {
    
  },
  data: function () {
    return {
     
    }
  },
  components: {  },
  methods: {}
}
</script>

<style lang="less" scoped>
 
</style>
