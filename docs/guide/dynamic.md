---
pageClass: wide-width-container
---

# dynamicCurdPage


## 基本用法

适用广泛的基础单选
<!-- <dynamicCurdPageDemo></dynamicCurdPageDemo> -->  



::: demo  
```html
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

 
const fields  =[
 { key: "keyWord", type: "FormInput", label: "关键字", searchable: true },
  {
    key: "sciName",
    type: "FormInput",
    label: "学名",

    formOption: {
      properties:{
        disabled:true
      }
    },
    tableOption: {
      sort:2
    },
  },
  {
    key: "latinSciName",
    type: "FormInput",
    label: "拉丁学名",
    tableable:true,
    formOption: {
      properties:{
        disabled:true
      }
    },
  },
  {
    key: "originalTreeNumber",
    type: "FormInput",
    label: "原古树名木编号",   
    tableable:true,
    formOption: {
    },
  }, 
  {
    key: "investNumber",
    type: "FormIntNumber",
    label: "调查顺序号",
    tableable:true,
    formOption:{
    }
  },
  

]



export default {
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
            aview: this.$appendToPreset('dialogPageActionOption',{
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
                    this.$appendToPreset('dynamicForm',
                    {
                      label:'基本信息',
                      props: {
                      apiPromise:  oldtreeDetailApi,
                      formOption: {
                        formItemList: this.$buildFormFields(fields),
                        borderForm:false,
                         formProperties: {
                          'label-position': 'left'
                        },
                      },
                    }}),
                ]
              }
            })
        },
      }
    }
  }

</script>
<style lang="css" scoped></style>

```
:::

### test

asdasd 
asd 


