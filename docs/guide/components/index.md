---
pageClass:  wide-width-container
---
# 增删改查--DynamicCurdPage

props：
|  键   | 意义  | 必选  |类型  |默认值   |备注   |
|  ----  | ----  |----  |----  |----  |----  |----  |
| fields  | 字段列表 | √ | array | [] |   | 
| pageOption  | 页面配置 |√  | Object | {} |   | 
| apiPromises  | 增删改查Api |√  | Object | {} |  成员包括 create delete update list detail | 
| entityLabel  | 页面名称 |√  |String|  '' |   | 


## 字段配置
在搜索栏，列表，表单（新增、修改），详情场景中都会使用到字段信息，且通常情况下，字段是重叠的，所以Dy-Vue采用了一个字段列表来配置页面的字段。并通过相应的子项配置具体场景的特别配置信息，子项内的配置会覆盖通用配置
 
### 基础通用配置  
通用配置包括会在各种场景中公用的信息，具体信息包括：
|  键   | 意义  | 必选  |默认值  |备注   
|  ----  | ----  |----  |----  |----  |----  |
| key  | 字段名 | √ | - |formSection | 
| label  | 中文名 |× |'' |单元格 | 
| type  | 表单类型 |×  |FormInput |单元格 | 
| formSection  | 表单区块 |×  |'' |按区块展示在表单、详情中 | 
| formOption  | 表单配置 |×  |{} |有值时会在表单中展示 | 
| searchOption  | 搜索栏配置 |×  |{} |有值时会在搜索栏中展示 | 
| listOption  | 列表配置 |×  |{} |有值时会在列表中展示 |  
| detailOption  | 详情配置 |×  |{} |有值时会在详情中展示， 会在表单基础上叠加，只在详情中有与表单中不一样的情况才需要配置 | 

#### 示例
```

[
 { key: "keyWord", type: "FormInput", label: "关键字", searchable: true },
  {
    key: "sName",          //字段名   接口字段名  必填
    type: "FormTextarea",   //表单类型             可选  默认为FormInput
    label: "姓名",          //中文名              可选  默认为空 
    formSection:'基础信息', //表单区块             可选  默认为空 
    formOption: {          //表单子项配置             可选   有值时会在表单中展示
      label:'员工姓名'      //子项内配置会覆盖通用配置
    },
    searchOption: {          //搜索栏子项配置            可选   有值时会在搜索栏中展示
      type: "FormInput",     //子项内配置会覆盖通用配置
    },
    listOption: {          //列表子项配置            可选   有值时会在列表中展示
      key:'username'        //子项内配置会覆盖通用配置
    },
    detailOption: {          //详情子项配置         可选   有值时会在详情中展示     详情子项配置是在表单子项基础上叠加，通常只在详情中有与表单中不一样的情况才需要配置
    },
  },
  {
    key: "nickName",
    type: "FormInput",
    label: "外号",
    tableable:true,
    formOption: {
    },
  },
  {
    key: "originalNumber",
    type: "FormInput",
    label: "原编号",   
    tableable:true,
    formOption: {
    },
  }, 
 
]

```

### 表单配置
参考表单组件配置：[Dynamic-Form](/guide/components/form)

### 列表配置
参考列表组件配置：[Dynamic-List/Table](/guide/components/list)

### 搜索栏配置
参考搜索栏组件配置：[Dynamic-Search](/guide/components/search)

### 详情配置
参考详情组件配置：[Dynamic-Form/Detail](/guide/components/detail)

## 页面配置
>常规增删改查页面几乎不需要特别配置，Dy-Vue已经预置了相关配置，但业务总是多变的，非常规页面的配置是开发的重点

::: demo 只配置字段示例
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

const entityLabel = '****'
 
const fields  =[
 { key: "keyWord",  label: "关键字", searchable: true },
  {
    key: "sName",
    label: "姓名",
    formOption: {},
    tableOption: {
    },
  },
  {
    key: "latinSciName",
    label: "外号",
    tableable:true,
    formOption: {
    },
  },
  {
    key: "originalNumber",
    label: "原编号",   
    tableable:true,
    formOption: {
    },
  }, 
]

export default {
  data () {
    return {
      // 页面配置
      // pageOptions: {
      //   },
      // 字段配置
      fields,
      entityLabel,
      // Api配置
      apiPromises:{
        create:mockApi,
        bulkdelete:mockApi,
        list:tableinfoListApi,
        detail:mockApi,
        update:mockApi
      },
    }
  }
}
//----------------------Api-------------------
function tableinfoListApi (params) {
  return import("../../.vuepress/components/vuePlugins/utils").then(module=>{
      return Promise.resolve(module.apiListMock(fields,5));
  })
}
function mockApi (data) {
  return Promise.resolve({})
}
</script>
```
:::

###  普通增删改查页面配置
>为减少使用过程中，重复配置常用增删改查相关页面配置，Dy-Vue预设了大量常用配置,使常规增删改查页面配置归零。
>只有当预设配置不能满足需求时，才需要额外传入页面配置项，Dy-Vue 会对用户传入的页面配置和预设配置进行深度递归合并，用户配置会自动覆盖预设配置

|  键   | 意义  | 必选  |默认值  |备注   
|  ----  | ----  |----  |----  |----  |----  |
| treeOption  | 筛选树配置 | × | 预设 | 左侧筛选树配置 | 
| listOption  | 列表配置 |× | 预设| 列表配置 | 
| searchOption  | 搜索栏配置 | ×  | 预设 | 搜索栏配置 | 
| pagination  | 分页 |×  |  预设|  | 
| topToolBar  | 工具栏 |×  | 预设 |  | 


::: details   页面配置合并原则
1. 用户配置与预设配置数据类型（对象、数组） ，不相同时会丢弃用户配置，使用预设配置，
2. 两者都为对象，会继续进行深度递归合并
3. 两者都为数组  （-鼓励使用对象-）
  - 若预设配置成员都为基本类型，用户配置覆盖预设配置
  - 若预设配置成员包含非基本类型，会合并两者（很少发生）
4. 用户配置为null、undefined  会删除预设配置项 
5. 用户新增配置项，会合并到预设配置中
6. 其他情况，用户配置覆盖预设配置
:::

::: demo 用户配置示例
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

const entityLabel = '****'
 
const fields  =[
 { key: "keyWord",  label: "关键字", searchable: true },
  {
    key: "sName",
    label: "姓名",
    formOption: {
    },
    tableOption: {
    },
  },
  {
    key: "latinSciName",
    label: "外号",
    tableable:true,
    formOption: {
      wraperProperties:{
        class:['grid-col-24']    //覆盖预设配置分栏展示表单项
      }
    },
  },
  {
    key: "originalNumber",
    label: "原编号",   
    tableable:true,
    formOption: {
    },
  }, 
]

export default {
  data () {
    return {
      // 页面配置
      pageOptions: {
        topToolBar:{
          create:null,  //删除顶部新增操作按钮
          link:this.$appendToPreset('requestApiActionOption',{   //添加新的顶部操作按钮
             apiPromise:()=>Promise.resolve({}),
          })
        },
          treeOption:null,   //删除左侧tree
        },
 
      // 字段配置
      fields,
      entityLabel,
      // Api配置
      apiPromises:{
        create:mockApi,
        bulkdelete:mockApi,
        list:tableinfoListApi,
        detail:mockApi,
        update:mockApi
      },
    }
  }
}
//----------------------Api-------------------
function tableinfoListApi (params) {
  return import("../../.vuepress/components/vuePlugins/utils").then(module=>{
      return Promise.resolve(module.apiListMock(fields,5));
  })
}
function mockApi (data) {
  return Promise.resolve({})
}
</script>

```
:::
 
### Api配置
>Api配置中包含增删改查相关Api函数，返回值均为Promise
### 页面名称-entityLabel
>默认、预设情况下 新增/修改/详情 标题会依据页面名称自动生成，若需要自定义可在页面配置中配置以覆盖预设的标题

     
 