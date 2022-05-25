<template>
    <main class=" ">
        <template v-for="(item, index) in actionsOrdered">
        <el-popconfirm
          class="ml6"
          v-if="item.popconfirm"
          v-bind="item.popconfirm"
          :key="index"
          @confirm="actionHandle(item)">
          <component
            slot="reference"
            :is="item.component"
            v-permission="item.permission||item.label"
            v-text="item.label"
            v-bind="item.properties"
          ></component>
        </el-popconfirm>
        <component
          v-else
          class="ml6"
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
import actionMixin from './actionMixin'
import {isObjEmpty} from  "../utils/tool"
export default {
  name:'DynamicActions',
  mixins:[actionMixin],
  props: {
    actions:{
      type:[Object,Array],
      default(){
        return {}
      }
    },
    actionData:{
      type:[Object,Array,String,Boolean,Number],
      default(){
        return {}
      }
    },
    actionBarWraper:{
      type:[HTMLElement ,Object]
    }
  },
  computed:{
    actionsOrdered(){
      let actions=  Object.entries(this.actions).map(([key,value],index)=>{
        return  {...value,actionKey:key}
      })
      actions=actions.sort((a,b)=>a.sort-b.sort).filter((action)=>{
        if(typeof action.isShow ==='function'){
          return action.isShow(this.actionData)!==false
        }
        return true
      })
      return actions
    }
  },
  
  methods: {
    actionHandle(action){
      let actionData=action.actionDataKey? this.actionData[action.actionDataKey]:this.actionData
      if(action.isLoadData!==false&&isObjEmpty(actionData)){
           this.$message({ type: 'warning', message: '您没有选择任何数据' })
        return
      }
      if(action.isLoadData===false){
        actionData=null
      }
      this.actionHandles(action,actionData)
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
