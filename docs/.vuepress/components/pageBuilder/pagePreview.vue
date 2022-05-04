<template>


  <DynamicCurdPage
    :entityLabel="entityLabel"
    :fields="fields"
    :pageOptionsprops="pageOptions"
    :apiPromises="apiPromises"
  ></DynamicCurdPage>

</template>
<script>

 
const entityLabel = '古树名木'
 
import fields from "./fields.js";

 

//----------------------古树名木-------------------
 function oldtreeListApi (params) {
  return Promise.resolve({})
}

 function oldtreeUpdateApi (params) {
  
  return Promise.resolve({})
}

 function oldtreeSaveApi (params) {
  
  return Promise.resolve({})
}


 function oldtreeDeleteApi (ids) {
  ids=Array.isArray(ids)?ids.join(','):ids
  return Promise.resolve({})
}

 function oldtreeDetailApi (data) {
  return Promise.resolve({})
}

import {
  buildFormFields,
  appendToPreset,
} from '../dynamicPage/utils/tool'
 


export default {
  name: 'pagePreview',
  components: {
    // CurdPage
  },
  data () {
    return {
      // form字段
      fields,
      entityLabel,
       // 页面配置
      apiPromises:{
        create:oldtreeSaveApi,
        bulkdelete:oldtreeDeleteApi,
        list:oldtreeListApi,
        detail:oldtreeDetailApi,
        update:oldtreeUpdateApi
      },
      // 页面配置
      pageOptions: {
        tableOption: {
          lineActions: {
            detail: null,
            aview: appendToPreset('dialogPageActionOption',{
              sort:1,
              label: '查看',
              permission:'查看',
              dialog: {
                properties:{
                  title: '查看'+entityLabel,
                },
                layout:{
                  name:'LayoutTabs',
                  properties:{
                      type:"card",
                  }
                },
                body: [   
                    appendToPreset('dynamicForm',
                    {
                      label:'基本信息',
                      props: {
                      apiPromise:  oldtreeDetailApi,
                      formOption: {
                        formItemList: buildFormFields(this.fields),
                        borderForm:false,
                         formProperties: {
                          'label-position': 'left'
                        },
                      },
                    }}),
                   appendToPreset('dynamicForm',
                    {
                      label:'管理信息',
                      props: {
                      apiPromise:  oldtreeDetailApi,
                      formOption: {
                        formItemList: buildFormFields(this.fields),
                        borderForm:false,
                         formProperties: {
                          'label-position': 'right'
                        },
                      },
                    }}),
                   
                  {
                    component: 'div',
                    name:'@object@',
                    label:'信息详情3',
                    children:[
                      {
                        component: 'DyTmpl',
                        props:{
                          tmpl:'test'
                        }
                      }
                    ]
                     
                  }
                ]
              }
            }),

          }
        },
      }
    }
  },
    created(){
      const self=this
      window.addEventListener('message',(ev,data)=>{
          if(ev.origin.indexOf(location.hostname)>-1&&ev.data.origin=='jsEditor'){
            if(ev.data.type=='fields'){
              self.fields=self.parseObject(ev.data.content)
            }
            if(ev.data.type=='page'){
              self.pageOptions= deepMerge(self.pageOptions,self.parseObject(ev.data.content))
            }
            self.$forceUpdate()
          }
      })
  },
  methods:{
    parseObject(obj){
      const context={}
      // const res=JSON.parse(obj)
      // return res
      const func=new Function('context',`return ${obj}`)
      console.log()
      return func()
    }
  }
}
</script>
<style lang="css" scoped></style>
