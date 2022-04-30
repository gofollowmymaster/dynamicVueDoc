<template>
    <main class=" ">
        <template v-for="(item, index) in actions">
        <el-popconfirm
          class="ml6"
          v-if="item.popconfirm"
          v-bind="item.popconfirm"
          :key="index"
          @confirm="actionHandle(item)">
          <component
            slot="reference"
            :is="item.component"
            v-permission="item.permission"
            v-text="item.label"
            v-bind="item.properties"
          ></component>
        </el-popconfirm>
        <component
          v-else
          :is="item.component"
          v-text="item.label"
          v-bind="item.properties"
          v-permission="item.permission"
          :key="index"
          @click="actionHandle(item)"></component>
      </template>
    </main>
</template>
<script>
import actionMixin from '../actionMixin'

export default {
  name:'DynamicActions',
  mixins:[actionMixin],
  props: {
    actions:{
      type:Object,
      default(){
        return {}
      }
    },
    actionData:{
      type:[Object,Array,String,Boolean,Number],
      default(){
        return {}
      }
    }
    
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
        this.actionHandles(action,this.actionData)
      
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
