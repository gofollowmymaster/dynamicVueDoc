<template>
</template>
<script>
import {
  compose,
  deepMerge,
  deepCopy,
  buildDetailFields,
} from '../utils/tool'
import {
  dialogFormActionOption,
} from '../presetConfig'
import actionMixin from './actionMixin'
import actionPresetMixin from "./actionPresetMixin"


export default {
  name: 'DynamicDetailPage',
  mixins:[actionMixin,actionPresetMixin],
  props: {
    fields: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    optionsProps: {
      type: Object,
      require: true
    },
    apiPromises: {
      type: Object,
      default () {
        return {}
      }
    },
    formSections:{
      type: Object,
      default () {
        return {}
      }
    },
    detailId:[String,Number,Object],
    actionKey:[String],
    entityLabel: String,
  },
  data: function () {
    return {
      pageOpened:false
    }
  },


  computed: {
    lineActions () {
       
      const pageActions=this.generatePageActionOptions('router')
      const customLineActions=this.optionsProps.listOption.lineActions||{}
      const customTopActions=this.optionsProps.topToolBar

      const lineActions = deepMerge(   pageActions,
        {...customTopActions,...customLineActions},
        true
      )

      //过滤非弹窗事件
      for(let key in lineActions){
        const actionType=lineActions[key].actionType
         if(!actionType||actionType.toLowerCase().indexOf('dialog')<0){
           delete lineActions[key]
         }
      }

      return lineActions
    },
    actionAndDetailid(){
      return {
        detailId:this.detailId,
        actionKey:this.actionKey,
      }
    }
   
   
  },
  watch:{
    actionAndDetailid:{
      handler({actionKey,detailId}){
        if(detailId||actionKey){
          this.openPage(detailId,actionKey)
          return 
        }
        this.closeDetail()

      },
      immediate:true,
      deep:true
    }
  },
  created () {
  },
  mounted () {
  },

  methods: {
    openPage (detailId,actionKey) {
      if(!this.lineActions[actionKey]){
        actionKey= Object.keys(this.lineActions).filter(action=>this.lineActions[action]).filter(action=>action.startsWith('detail'))[0]
      }
      let action = deepCopy(this.lineActions[actionKey])
      const actionData= (detailId instanceof Object)?detailId:{id:detailId||''}

      if(action.actionType.startsWith('router')){
        action.actionType=action.actionType.replace('router','').replace(/(^\w)/,function(start){
          return  start.toLowerCase()
        })
      }

      if( action.dialog?.properties){
        action.dialog.properties.navType='router'
      }
      action.dialog.container='DyPage'
      // if(action.dialog.body?.actions){
      //   action.dialog.body.actions={}
      // }
      this.actionHandles(action,actionData)
      this.pageOpened=true
    },
    closeDetail(){
      this.pageOpened===true&&this.actionHandles({actionType:'close'})
    }
  }
}
</script>

<style lang="less" scoped>
 
.border-grey {
  border: 1px solid var(--grey);
} 
</style>
