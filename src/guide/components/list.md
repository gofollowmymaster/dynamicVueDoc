# 动态列表
 >列表当前支持table形式展示，

## 功能特点

- 通过 json 数据来生成表格；
- 通过 data 数据给表格每个元素赋值；
- 通过loadListApi 加载异步数据；
- 天然支持多种行操作；
- 二次开发自定义表格元素难度极低；

## 组件参数
| 键  | 意义 | 类型 | 必选 | 默认值 | 备注 |
| --- | ---- | ---- | ---- | ------ | ---- | 
| table | 表格整体配置                    | Object | ×    |  参默认配置   |   配置项参考[表格整体配置](#表格整体配置)  |
| columns | 表格列                    | Array | √    |  []   |  配置项参考[表格字段配置](#表格字段配置)   |
| apiPromise  | 列表数据Api                    | Function | √     |     |  接收参数对象， 处理后返回列表数据 返回数据结构参[加载返回数据格式](#加载返回数据格式)   |
 



## 表格整体配置
| 键  | 意义 | 类型 | 必选 | 默认值 | 备注 |
| --- | ---- | ---- | ---- | ------ | ---- | 
| hasCheckbox | 是否可选择                    | boolean | ×    | true   |     |
| indexCol | 索引列                    | Object | ×    | 参默认配置   |             |
| properties  | 绑定到列表组件（table）的属性 | Object  | ×    |  参默认配置      | 参考列表组件属性（el-table）  暂不支持动态响应   |
| colOptions  | 列默认配置                    | Object | ×    | 参默认配置   | 会与字段列表配置子项合并绑定到列 |
| loadListApi  | 列表数据加载方法                    | function | ×    |    | 返回一个[加载数据的Promise](#加载返回数据格式) |
| actionColWidth  | 操作列宽度                    | number | ×    |   按钮数量*60   |  |
| actionBtnType  | 操作按钮类型                    | string | ×    |  text   |  |

## 表格字段配置
通用配置对各类表格组件都生效

 | 键               | 意义          | 类型   | 必选 | 默认值 | 备注          |
 | ---------------- | ------------------ | ------ | ---- | ------ | ---------------------- |  
 | label | 表格列标签名 | string | √    |      |       |
 | labelTip | 表格列标签名提示文字 | string | ×    |      |       |
 | type | 表格列类型 | string | ×    |  FormInput    |       |
 | key | 表格列字段名 | string | √    |      |   不能重复    |
 | sort | 顺序号 | number | ×    | 100    |  从小到大     |
 | template      | 自定义展示内容           | function | ×    |       | 通常表格展示内容是对应列的值，在一些特定情况下需要转换时可使用template |
 | colProperties     |  绑定到列（el-table-column）的属性       | Object | ×    | {}     |       |
 | style     |  自定义样式             | Any    | ×     | {}   |                           |
 | events           | 事件           | object    | ×    |        |        |
 | component             | 自定义表格单元组件 | string | ×    | ''     |   需全局注册的组件        |
 

## 示例
::: demo   列表配置示例
```html
<template>
<ClientOnly>
  <DynamicTable
    :columns="fields"
    :table="tableOptions"
    :apiPromise="loadListApi()"
  ></DynamicTable>
  <div>
   
   </div>
</ClientOnly>
  
</template>
<script>

const fields  =[
  {
    key: "name",                  
    type: "FormInput",           
    label: "姓名",           
  },
  
  {
    key: "status",
    type: "FormSelect",
    label: '多选框',
    options: [          //select radio 相关组件有必填options信息
      {
        value: "1",
        label: "11",
      },
      {
        value: "2",
        label: "22",
      },
      {
        value: "3",
        label: "33",
      },
    ],
  },
   {
    key: "cName",
    label: "公司名称",
  },
  {
    key: "email",
    label: "邮箱",
  },
]

export default {
  data () {
    debugger
    const formFields=this.$buildFormFields(fields)
    return {
      fields,
      // Api配置
      loadListApi:tableinfoListApi,
      tableOptions: {
        hasCheckbox: false,
        colOptions: {
          minWidth: 60,
          'show-overflow-tooltip': false,
        },
        lineActions:{
          update:{
            actionType:'dialogFormAction',
            formItemList:formFields,
            colNum:1,
            label:'修改',
             containerProperties: {
                title: '修改信息',
                width: '40%'
            },
          },
          detail:{
            actionType:'dialogFormAction',
            textMode:true,
            formItemList:formFields,
            colNum:1,
            label:'查看',
             containerProperties: {
                title: '查看信息',
                width: '40%'
            },
          }
        }
      },
    }
  },
  computed:{
  },
  methods:{
  }
}
//----------------------Api-------------------
function tableinfoListApi (params) {
  return import("../../.vuepress/components/vuePlugins/utils").then(module=>{
    debugger
      return Promise.resolve(module.apiListMock(fields,5)).then((res)=>{
          debugger
          return res.list
      });
  })
}
 
 
</script>
```
:::

### 加载返回数据格式
> 列表加载方法返回数据格式需要按照一下方式定义

| 键  | 意义 | 类型 | 必选 | 默认值 | 备注 |
| --- | ---- | ---- | ---- | ------ | ---- |----|
| list | 列表数据                    | array | √    |    |                                  |
| totalCount  | 数据总量| integer  | √  |        |       |

#### 列表加载方法返回数据格式示例
```
{
  list:[{
    name
  },{
    name
  }],
  totalCount:20
}
```

## 组件事件
支持elementUi el-table 所有属性，dyVue会通过 `v-on="$listeners"`形式绑定到 el-table



## 自定义表格列组件
自定义表格列组件的开发十分简单，DyVue提供了**通用表格混入**--`TableColMixin`,在您的表格组件中引入该mixin，就可使用DyVue提供的多个表格Api

### props
| 键     | 意义     | 类型  |  默认值 | 备注                                 |
| ------ | -------- | ----- | ---- | ------ | ------------------------------------ |
| rowData | 表格行数据 | Object |        |  |
| colOptions | 表格字段配置 | Object |        |  |

### computed
| 键     | 意义     | 类型  |   默认值 | 备注                                 |
| ------ | -------- | ----- | ---- | ------ | ------------------------------------ |
| bindOptions | 所有组件参数 | string |       | 删除了部分属性（如 type）的colOptions， 建议通过v-bind 绑定到组件  |
<!-- | bindEvents | 所有组件事件 | any |        | 实际是 colOptions.events  | -->

 
``` html
<template>
    <section>
        <el-switch v-model="rowData[colOptions.key]"
                   :style="colOptions.style||{}"
                   v-bind="bindOptions"
        />
    </section>
</template>

<script>
import { TableColMixin } from 'dyvue2'

export default {
    name: 'ColSwitch',
    mixins: [TableColMixin],
    computed: {
    }
}
</script>

```
 