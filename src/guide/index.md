---
sidebar: auto
pageClass:  wide-width-container
---
# Dynamic-Vue2
## 初衷

::: tip
管理后台的前端页面开发过程中，大量的时间投入到高度类似的页面功能中，在相似的页面中复制-粘贴-修改倍感疲惫。如何高效的完成类似页面的开发，解放双手，做有意义的事-摸鱼，正是Dynamic-Vue将要解决的问题。如果有这样的*理想*:heart_eyes:不妨继续往下看
:::

## 介绍--定位
- 面向开发者的JSON配置式页面生成组件库。 既可作为JSON配置式低代码引擎使用，也可作为通用组件库在项目中使用
- 极简的配置项目，低学习成本，可更快速上手项目实战
- 可实现大部分信息管理类页面包括 列表信息 表单信息 统计图表等
- 可以极大的减少页面开发工作量，极大提升效率。
- 统一的样式，交互，便于维护
- 当前版本基于Vue2.6  elment-Ui
  
 
## 快速上手
> 一个功能完备的增删改查页面示例，只需要极少的配置、代码
::: demo  
```html
<template>
<ClientOnly>

  <DynamicCurdPage
  class="relative"
    :entityLabel="entityLabel"
    :fields="fields"
    :pageOptionsprops="pageOptions"
    :apiPromises="apiPromises"
  ></DynamicCurdPage>
</ClientOnly>

</template>
<script>

const entityLabel = '****'
//字段配置
const fields  =[
 { key: "keyWord", type: "FormInput", label: "关键字", 
    searchOption: {
      col:1
    }
  },
  {key:'id' ,type:'FormHide',formOption:true},
  {
    key: "name",
    type: "FormInput",
    label: "姓名",
    formOption: {
      rules:['required']
    },
    tableOption: true,
    searchOption:true
  },
  {
    key: "nickname",
    type: "FormInput",
    label: "昵称",
    tableOption:true,
    formOption: {
        disabled:true
    },
  },
  {
    key: "cardno",
    type: "FormInput",
    label: "卡号",   
    tableOption:true,
    formOption: true,
  },
    {
    key: "age",
    type: "FormNumber",
    label: "年龄",   
    tableOption:true,
    formOption:true,
  }, 
  {
    key: "remark",
    type: "FormTextarea",
    label: "备注",
    tableOption:true,
    formOption:{
      col:2
    }
  },
]

export default {
  data () {
    return {
      // form字段
      fields,
      entityLabel,
       // CURDApi配置
      apiPromises:{
        create:tableinfoSaveApi,
        bulkdelete:tableinfoDeleteApi,
        list:tableinfoListApi,
        detail:tableinfoDetailApi,
        update:tableinfoUpdateApi
      },
      // 页面配置
      pageOptions: {
        },
      }
    }
  }

 
//----------------------数据请求Api-------------------
 function tableinfoListApi (params) {
  return import("../.vuepress/components/vuePlugins/utils").then(module=>{
    return Promise.resolve(module.apiListMock(fields,5));
  })
}

 function tableinfoUpdateApi (params) {
  return Promise.resolve({})
}

 function tableinfoSaveApi (params) {
  return Promise.resolve({})
}

 function tableinfoDeleteApi (ids) {
  ids=Array.isArray(ids)?ids.join(','):ids
  return Promise.resolve({})
}

 function tableinfoDetailApi (data) {
  return Promise.resolve(data)
}

</script>
<style lang="css" scoped></style>

```
:::

## 关键概念
### 配置
Dy-Vue 设计初衷是实现配置式低代码管理后台页面开发， 是借助配置驱动整个页面功能， **配置是Dyvue的大脑/中枢**，配置主要分为两部分:
::: tip 数据字段配置   
- 管理页面中常见组件包括**搜索栏**，**表格**，**表单**都是需要和服务端交互的组件，其中大量场景中数据字段配置是相同/重叠的,所以我们将数据字段提取出来作为单独的一项配置，
  也为对接后台快速开发提供了便利
  
- DyVue 既支持字段集中配置也支持各组件独立配置（不再有如formOption，tableOption，searchOption等）
:::
::: tip 页面功能配置
页面功能配置包括**页面布局**，**内容组件属性**，**操作行为**等，配合数据字段配置实现整体功能
:::
 
### 组件
页面是由组件组成的，Dy-Vue定义了后台管理常用的组件，包括[动态表单](./components)，[动态表格](./components/list.md)，[动态操作栏](./actions/index.md)，动态表单弹窗，动态内容弹窗，以及集成了上述组件的CURD模板组件等
**组件是Dyvue的血肉机体**
::: tip 组件要点

- 通过页面配置将[组件](./components)组织起来实现多样的交互
- 您既可以使用Dy-Vue提供的模板组件实现列表页面功能，也可以只使用部分功能组件实现特殊页面需求
- 如果您需要使用自定义组件，只需要全局注册后，就可以在Dyvue中配置使用

:::
### 操作/行为
Dy-Vue提供了丰富多样的交互类型，合理配置能实现功能复杂的页面[操作行为](./actions/index.md),

::: tip 要点
如果整体配置是，组件是血肉,那么**操作(action)就是筋骨**，将全身肌体串联起来，在配置的驱动下实现页面交互功能
:::
### 数据源Api
 **数据是页面灵魂**，配置、组件、操作、样式都是服务于数据，数据源Api就是获取数据的管道
 ::: tip 要点
 - 数据源Api是函数,它会接收一组数据，并返回一个Promise契约，契约中就返回了页面灵魂，真正的**大佬**--数据 :wink: :heart_eyes:
 - Dy-Vue 组件中预定义了自身的交互数据格式，复杂的表单组件中这与实际数据源需要的数据大概率并不一致，但您可以再数据源Api中进行适配，这包括处理前适配和处理后配置，使用Dy-Vue后主要的工作之一就是定义数据源Api（接口联调）  
:::
#### 数据源Api示例
``` js
apiSaveApi (params) {
  //处理请求数据
  params.deptId=params.deptId[0]?.id
  params.approveFileIds=Array.isArray(params.approveFileIds)?params.approveFileIds.map(item=>item.fileId):[]
  params.admId=params.admId[0]?.id
  return request({
    ...defaultConfig,
    url: '/api/save',
    data: params,
  })
}

export function apiDetailApi (params) {
     
  return request({
    ...defaultConfig,
    url: '/api/update',
    data: params,
  }).then((res)=>{
     //处理返回数据
    res.deptId=[res.deptId]
    return res
  })
}
```

### 扩展组件
Dy-Vue 预制了大量[常用组件](./components)，可以满足管理页面中多数需求，但一些特定场景您仍然可以根据需求开发自定义组件
支持的使用场景:
1. [自定义表单组件](./components/form#自定义表单组件)       
2. [自定义表格单元组件](./components/list#自定义表格列组件) 
<!-- 3. [自定义页面内容组件](./components/custom#自定义页面内容组件)  -->
 


### 样式
Dy-Vue 内置了自己的css样式，您可以根据项目需要UI要求，编写全局样式进行覆盖、调整


## 预定义配置
::: tip 
为了简化配置，快速上手 Dy-Vue 预定义了大量组建/操作配置可以满足大部分常规需求,不过您也可以自由的定义[自己的配置](./preset)
:::

## 全局Api
###  组建搜索栏数据字段 
``` js
this.$buildSearchFields(fields)
```
###  组建表格数据字段 
``` js
this.$buildTableFields(fields)
```
###  组建表单数据字段 .
``` js
this.$buildFormFields(fields)
``` 
###  组建详情数据字段 
``` js
this.$buildDetailFields(fields)
``` 
### 打开自定义内容弹窗方法 
``` js
this.$globalDialogPage(options)
``` 
###  打开表单弹窗方法 
``` js
this.$globalDialogForm(fields)
``` 
###  构建操作选项
``` js
this.$generateActionOption(options)
``` 
###  全局配置
``` js
this.$dynamicConfig
``` 
###  全局事件总线-Bus
``` js
this.$dynamicBus
``` 
###  自定义配置项合并预定义配置
``` js
this.$appendToPreset(options)
``` 

## 生成测试数据

DyVue 支持一键填充测试数据，这在大表单中尤其有用，开发调试时免去了反复填写表单的过程，提升开发效率。

## 开发计划
- Vue3支持
- 对接swagger 数据，自动生成字段配置
