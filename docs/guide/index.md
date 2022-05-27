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
::: tip 数据字段配置   
管理页面中常见组件搜索栏,表格,表单都是需要和服务端交互的组件,其中大量场景中数据字段配置是相同/重叠的,所以数据字段作为单独的一样配置
:::
2. 页面功能配置
::: tip 页面功能配置
页面功能配置包括页面布局,内容组件,操作行为交互等,配合数据字段配置实现整体功能
:::

#### 简单的字段配置
``` json
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
页面是由组件组成的,Dy-Vue定义了后台管理常用的组件,包括动态表单,动态表格,动态操作栏,动态表单弹窗,动态内容弹窗,CURD组件,以及集成了上述组件的CURD模板组件等

::: tip 组件要点
- 通过页面配置将[组件](./components)组织起来实现多样的交互
- 您既可以使用Dy-Vue提供的模板组件,也可以只有的使用其他功能组件实现特殊页面需求
- 开发自定义组件时,也可以使用预制的组件

:::
### 操作/行为
Dy-Vue提供了丰富多样的交互类型,合理配置能实现功能复杂的页面[操作行为](./actions),

::: tip 要点
如果整体配置是,组件是血肉,那么操作(action)就是筋骨,将全身肌体串联起来,在配置的驱动下实现页面交互功能
:::
### 数据源Api
 数据是页面灵魂,配置,组件,操作,样式都是服务于数据的,数据源Api就是获取数据的管道
 ::: tip 要点
 - 数据源Api是函数,它会接收一组数据,并返回一个Promise契约,契约中包含也页面灵魂,真正的**大佬**--数据
 - Dy-Vue 组件中预定义了自身的交互数据格式,这于实际数据源需要的数据大概率并不一致,但您可以再数据源Api中进行适配,这包括处理前适配和处理后配置,它们如同两个适配器钩子(Hook),使用-Dy-Vue后主要的工作之一就是定义数据源Api  
:::
#### 数据源Api示例
``` js
planProjectSaveApi (params) {
  params.deptId=params.deptId[0]?.id
  params.projectContractorId=params.projectContractorId[0]?.id
  params.approveFileIds=Array.isArray(params.approveFileIds)?params.approveFileIds.map(item=>item.fileId):[]
  params.bidFileIds=Array.isArray(params.bidFileIds)?params.bidFileIds.map(item=>item.fileId):[]
  params.planFileIds=Array.isArray(params.planFileIds)?params.planFileIds.map(item=>item.fileId):[]
  params.admId=params.admId[0]?.id
  return request({
    ...defaultConfig,
    url: '/project/library/save',
    data: params,
  })
}

export function planProjectUpdateApi (params) {
     
  params.deptId=params.deptId[0]?.id
  params.projectContractorId=params.projectContractorId[0]?.id
  params.approveFileIds=Array.isArray(params.approveFileIds)?params.approveFileIds.map(item=>item.fileId):[]
  params.bidFileIds=Array.isArray(params.bidFileIds)?params.bidFileIds.map(item=>item.fileId):[]
  params.planFileIds=Array.isArray(params.planFileIds)?params.planFileIds.map(item=>item.fileId):[]
  params.admId=params.admId[0]?.id

  return request({
    ...defaultConfig,
    url: '/project/library/update',
    data: params,
  })
}
```

### 扩展组件
Dy-Vue 预制了大量[常用组件](./components),可以满足管理页面中多数需求,但一些特定场景您仍然可以根据需求开发自定义组件
支持的使用场景:
1. [自定义表单组件](./components/custom#自定义表单组件)       
2. [自定义表格单元组件](./components/custom#自定义表格单元组件) 
3. [自定义页面内容组件](./components/custom#自定义页面内容组件) 

#### 自定义表单组件示例
- 自定义表单组件是展示在动态表单中,需要引入预制的mixin

``` html
<template>
  <main
    :style="item.style || {}"
    :class="`form-unqiue-${item.key} ${getTextModel ? 'hz-text-box' : 'hz-untext-box'}`"
    class="form-input-box form-item-box">
    <div class="flex">
      <el-input
        class="cursor-point"
        :value="val"
        :placeholder="getPlaceholder(item)"
        :disabled="getDisabled"
        type="text"
        v-bind="bindOptions"
        v-if="!getTextModel"
        @click.native="selectHandleer"
      >
      </el-input>
      <div v-else :style="item.textStyle || {}" class="form-input-text">
        {{ val || '-' }}
      </div>
    </div>
    <administrativeDialog
      :title="item.dialogTitle||title"
      :type="item.isMultSelect ? 'checkbox' : 'radio'"
      :visible="!getTextModel && visible.value"
      :defaultCheckedList="valueObj ? valueObj : []"
      @ok="saveAdministractive"
      @close="visible.value = false"
    ></administrativeDialog>
  </main>
</template>

<script>
import FormMixin from '@/common/dynamicPage/components/formItems/mixin'
import administrativeDialog from '@/components/common/sysSettingDialog/administrative.dialog'

export default {
  name: 'FormAdministrativeSelector',
  mixins: [FormMixin],
  components: { administrativeDialog },
  props: {
    title: {
      type: String,
      default: function () {
        return '选择'
      }
    }
  },
  /**
   * value 格式  {admName|name,admCode}
   */
  computed: {
    valueObj () {
      if (this.value instanceof Array) return this.value.filter(item=>item)
      return []
    },
    val: {
      get () {
        return this.valueObj
          .map((value) => value.admName || value.name)
          .join(',')
      },
      set (value) {
        this.$emit('input', value)
        this._valueLink(value)
        // 更新数据
        this.statusChangeFn.valueUpdateEvent({
          [this.item.key]: value
        })
      }
    }
  },
  data: function () {
    return {
      visible: { value: false }
    }
  },
  created () {},
  methods: {
    selectHandleer () {
      this.visible.value = true
    },
    saveAdministractive (list) {
      this.val = list
      this.visible.value = false
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .el-dialog__wrapper {
  position: fixed;
}
</style>
```

#### 自定义表格单元组件示例
- 自定义表格组件是展示在表格单元格中,需要引入预制的mixin

 
```  html
<template>
    <section class="full-width row-center">
        <span :style="style" class="inline-block px4 py2 border-r4" v-bind="bindOptions">
          {{content}}
        </span>
    </section>
</template>

<script>
    import TableColMixin from '@/common/dynamicPage/components/tableColItem/mixin';
    export default {
        name: 'ColDictTag',
        mixins: [ TableColMixin ],
        data(){
            return {
                content:'',
                style:''
            }
        },
        computed: {
        },
        mounted(){
            this.content=this.rowData[this.item.dictInfoKey]?.dictLabel
            this.style=this.rowData[this.item.dictInfoKey]?.listClass
        }
    };
</script>
```
#### 自定义内容组件示例
-  自定义内容组件,和普通组件唯一的区别是如果需要外部传参,需要添加data在props中
::: warning
自定义内容组件,一般不能于其他组件交互
:::
``` html
<template>
  <!-- 普通展示 -->
  <div
    class="table-col-box"
  >
    {{ data.content }}
  </div>
</template>

<script>

export default {
  name: 'ColTeml',
  computed: {},
  props:{
    data:{
      type:Object,
      default:function(){
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
 
}
</script>

<style scoped lang="less"></style>

```


### 样式
Dy-Vue 内置了自己的css样式,它是一种原子化CSS

## 全局Api
###  组建搜索栏数据字段 buildSearchFields
``` js
this.$buildSearchFields(fields)
```
###  组建表格数据字段 buildTableFields
``` js
this.$buildTableFields(fields)
```
###  组建表单数据字段 buildFormFields.
``` js
this.$buildFormFields(fields)
``` 
###  组建详情数据字段 buildDetailFields
``` js
this.$buildDetailFields(fields)
``` 

###  预定义配置合并 appendToPreset
为了简化配置,快速上手.Dy-Vue 预定义了大量组建/操作配置可以满足大部分常规需求,不过您也可以自由的定义自己的配置,使用appendToPreset方法将会吧您自定义的配置与预定义配置深度合并

``` js
this.$appendToPreset('formOption',{
         textModel:true
})
```

## 预定义配置

|  配置名   | 含义  |  默认值 | 偏移类 |
|  ----  | ----  | ----| ---- |
| searchOption  | 搜索配置选项 |  [searchOption](./preset#搜索配置选项) |
| listOption  | 列表选项配置 |  [listOption](./preset#列表选项配置)  |
| DynamicFormOption  | 动态表单配置 |  [DynamicFormOption](./preset#动态表单配置)  | 
| dialogFormOption  | 表单弹窗配置 |  [dialogFormOption](./preset#表单弹窗配置)  | grid-offset-sm-* |
| dialogFormActionOption  | 表单弹窗操作配置 |  [dialogFormActionOption](./preset#表单弹窗操作配置)  | grid-offset-sm-* |
| dialogPageActionOption  | 内容弹窗操作配置 |  [dialogPageActionOption](./preset#内容弹窗操作配置)  | grid-offset-sm-* |
| requestApiActionOption  | 请求操作配置 |  [requestApiActionOption](./preset#请求操作配置)  | grid-offset-sm-* |
| requestApiActionOption  | 请求操作配置 |  [requestApiActionOption](./preset#请求操作配置)  | grid-offset-sm-* |
| downloadActionOption  | 下载操作配置 |  [downloadActionOption](./preset#下载操作配置)  | grid-offset-sm-* |
| submitActionOption  | 提交操作配置 |  [submitActionOption](./preset#提交操作配置)  | grid-offset-sm-* |
| routerDialogFormActionOption  | 表单页面操作配置 |  [routerDialogFormActionOption](./preset#表单页面操作配置)  | grid-offset-sm-* |
| routerDialogPageActionOption  | 内容页面操作配置 |  [routerDialogPageActionOption](./preset#内容页面操作配置)  | grid-offset-sm-* |
| routerActionOption  | 路由操作配置 |  [routerActionOption](./preset#路由操作配置)  | grid-offset-sm-* |
| pagination  | 分页配置  |  [pagination](./preset#分页配置) | grid-offset-xs-* |
| treeOptionp  | tree配置  |  [pagination](./preset#树配置) | grid-offset-pp-* |


 
## 开发计划
待补充