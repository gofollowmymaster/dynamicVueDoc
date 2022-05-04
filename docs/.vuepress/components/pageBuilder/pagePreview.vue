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

const defaultConfig = {
  method: 'post',
  refuseToken: false,
  json: true
}
 

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
        console.log('------massage-----',ev,data)
        debugger
        if(ev.origin.indexOf(location.hostname)>-1&&ev.data.origin=='jsEditor'){
          self.fields=JSON.parse(ev.data.content)
          self.$forceUpdate()

        }
    })
  }
}
</script>
<style lang="css" scoped></style>
