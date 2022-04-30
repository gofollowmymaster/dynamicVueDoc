<template>
  <el-dialog  v-bind="$attrs"  :visible.sync="visible" :fullscreen="true">
      <slot></slot>
  </el-dialog>
</template>
<script>

export default {
  name: "DyPage",
  props: {
    visible: {
      type:Boolean,
      required:true,
    },
    properties: {
      type: Object,
      default: function () {
        return {};
      },
    },
    
  },
  data: function () {
    return {}
  },
  computed: {
     
  },
  watch: {
    
  },
  mounted() {
    
  },
  components: {},
  methods: {
    
  },
};
</script>
<style lang="less" scoped>
 
</style>
