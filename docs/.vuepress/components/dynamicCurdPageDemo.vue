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
} from './dynamicPage/utils/tool'
import fields from "./fields.js"

export default {
  name: 'dynamicCurdPageDemo',
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
        listOption: {
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
                    appendToPreset('DynamicForm',
                    {
                      label:'基本信息',
                      props: {
                      apiPromise:  oldtreeDetailApi,
                      formOption: {
                        formItemList: buildFormFields(fields),
                        borderForm:false,
                         formProperties: {
                          'label-position': 'left'
                        },
                      },
                    }}),
                   appendToPreset('DynamicForm',
                    {
                      label:'管理信息',
                      props: {
                      apiPromise:  oldtreeDetailApi,
                      formOption: {
                        formItemList: buildFormFields(fields),
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
    window.addEventListener('message',(data)=>{
        console.log('------massage-----',data)
    })
  }
}
</script>
<style lang="css" scoped></style>
