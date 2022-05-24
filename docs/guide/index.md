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
  return Promise.resolve({})
}

</script>
<style lang="css" scoped></style>

```
:::


## 开发计划
待补充