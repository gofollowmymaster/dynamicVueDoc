---
sidebar: auto
pageClass:  wide-width-container
---
# Dynamic-Vue2
## 初衷

::: tip
管理后台的前端页面开发过程中，大量的时间投入到高度类似的页面功能中，在相似的页面中复制-粘贴-修改倍感疲惫。如何高效的完成类似页面的开发，解放双手，做有意义的事-摸鱼，正是Dynamic-Vue将要解决的问题。如果有这样的*理想*:heart_eyes:不妨继续往下看
:::

## 介绍
- 基于 vue 的JSON配置式页面生成组件库。可以减少页面开发工作量，极大提升效率。
- 当前版本基于Vue2.6  elment-Ui
- 依赖组件包括

## 可以做什么
- 信息管理类页面 列表信息 表单信息
- 统计图表类页面
## 使用边界
使用 JSON 有优点但也有明显缺点，在以下场合并不适合：

- 大量定制 UI：JSON 配置使得Dy-Vue更适合做有大量常见 UI 组件的页面，但对于面向普通客户（toC）的页面，往往追求个性化的视觉效果，这种情况下用 dy-vue 就不合适，实际上绝大部分前端 UI 组件库也都不适合，只能定制开发。
- 相当复杂或特殊的交互：
   - 有些复杂的前端功能，比如 可视化编辑器，其中有大量定制的拖拽操作，这种需要依赖原生 DOM 实现的功能无法使用。
   - 但对于某些交互固定的领域，比如图连线，可开发专门的组件来实现。
## 快速上手
### 列表页面模板开发示例



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

const entityLabel = '****'
 
const fields  =[
 { key: "keyWord", type: "FormInput", label: "关键字", searchable: true },
  {key:'id'},
  {
    key: "sName",
    type: "FormInput",
    label: "姓名",

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
    label: "外号",
    tableable:true,
    formOption: {
      properties:{
        disabled:true
      }
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
  {
    key: "investNumber",
    type: "FormIntNumber",
    label: "顺序号",
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
        create:tablkeinfoSaveApi,
        bulkdelete:tablkeinfoDeleteApi,
        list:tablkeinfoListApi,
        detail:tablkeinfoDetailApi,
        update:tablkeinfoUpdateApi
      },
      // 页面配置
      pageOptions: {
          treeOption:null
        },
      }
    }
  }

 
//----------------------Api-------------------
 function tablkeinfoListApi (params) {
 
return import("../.vuepress/components/vuePlugins/utils").then(module=>{
    return Promise.resolve(module.apiListMock(fields,5));
})
}

 function tablkeinfoUpdateApi (params) {
  return Promise.resolve({})
}

 function tablkeinfoSaveApi (params) {
  return Promise.resolve({})
}

 function tablkeinfoDeleteApi (ids) {
  ids=Array.isArray(ids)?ids.join(','):ids
  return Promise.resolve({})
}

 function tablkeinfoDetailApi (data) {
  return Promise.resolve(data)
}

</script>
<style lang="css" scoped></style>

```
:::

## 关键概念
### 配置
Dy-Vue 设计初衷是实现配置式低代码Pc管理后台页面开发,是借助配置驱动整个页面功能,配置是大脑
配置分为两类:
1. 数据字段配置    
> 管理页面中常见组件搜索栏,表格,表单都是需要和服务端交互的组件,其中大量场景中数据字段配置是相同/重叠的,所以数据字段作为单独的一样配置
2. 页面功能配置
> 页面功能配置包括页面布局,内容组件,操作行为交互等,配合数据字段配置实现整体功能


#### 简单的字段配置
```
{ key: "keyWord", type: "FormInput", label: "关键字", searchable: true },
  {key:'id'},
  {
    key: "sName",
    type: "FormInput",
    label: "姓名",

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
    label: "外号",
    tableable:true,
    formOption: {
      properties:{
        disabled:true
      }
    },
  },
   
```
### 组件
>页面是由组件组成的,Dy-Vue定义了后台管理常用的组件,包括动态表单,动态表格,动态操作栏,动态表单弹窗,动态内容弹窗,CURD组件,以及集成了上述组件的CURD模板组件等
>通过页面配置将[组件](./components)组织起来实现多样的交互
>您既可以使用Dy-Vue提供的模板组件,也可以只有的使用其他功能组件实现特殊页面需求
>开发自定义组件时,也可以使用预制的组件
>

### 操作/行为
>如果整体配置是,组件是血肉,那么操作(action)就是筋骨,将全身肌体串联起来,在配置的驱动下实现页面交互功能
>Dy-Vue提供了丰富多样的交互类型,合理配置能实现功能复杂的页面[操作行为](./actions),

### 数据源Api
> 数据是页面灵魂,配置,组件,操作,样式都是服务于数据的,数据源Api就是获取数据的管道,
> 数据源Api是函数,它会接收一组数据,并返回一个Promise契约,契约中包含也页面灵魂,真正的**大佬**--数据
> Dy-Vue 组件中预定义了自身的交互数据格式,这于实际数据源需要的数据大概率并不一致,但您可以再数据源Api中进行适配,这包括处理前适配和处理后配置,它们如同两个适配器钩子(Hook),使用Dy-Vue后主要的工作之一就是定义数据源Api  
### 扩展组件
Dy-Vue 预制了大量[常用组件](./components),可以满足管理页面中多数需求,但一些特定场景您仍然可以根据需求开发自定义组件
支持的使用场景:
1. [自定义表单组件](./components/custom#自定义表单组件)       
2. [自定义表格单元组件](./components/custom#自定义表格单元组件) 
3. [自定义页面内容组件](./components/custom#自定义页面内容组件) 
### 样式
Dy-Vue 内置了自己的css样式,它是一种原子化CSS


## 开发计划
待补充