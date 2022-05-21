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
    formable:true,         //是否在表单中展示      可选  默认否
    formOption: {          //表单子项配置             可选   有值时会在表单中展示
      label:'员工姓名'      //子项内配置会覆盖通用配置
    },
    searchable:true,         //是否在搜索栏中展示     可选  默认否
    searchOption: {          //搜索栏子项配置            可选   有值时会在搜索栏中展示
      type: "FormInput",     //子项内配置会覆盖通用配置
    },
    tableable:true,         //是否在列表中展示     可选   默认否
    listOption: {          //列表子项配置            可选   有值时会在列表中展示
      key:'username'        //子项内配置会覆盖通用配置
    },
    detailable:true,         //是否在详情中展示     可选   默认否   详情子项配置是在表单子项基础上叠加，通常只在详情中有与表单中不一样的情况才需要配置
    detailOption: {          //详情子项配置         可选   有值时会在详情中展示    同上
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

|  键   | 意义  | 必选  |默认值  |备注   
|  ----  | ----  |----  |----  |----  |----  |
| treeOption  | 搜索树配置 | × |  |  | 
| listOption  | 列表配置 |× | |  | 
| searchOption  | 搜索栏配置 | ×  |  |  | 
| pagination  | 分页 |×  |  |  | 
| topToolBar  | 工具栏 |×  |  |  | 
| searchFields  | 搜索字段 |×  | |  | 
| tableFields  | 列表字段 |×  | |  |  

###  普通增删改查页面配置
```
 {
 }
 
```
```
 {
   treeOption: {},
   listOption:{},
   searchOption:{},
   pagination:{},
   topToolBar:{},
   searchFields:[],
   tableFields:[],
 }

```
### 页面基本配置原则
>d 

     
 