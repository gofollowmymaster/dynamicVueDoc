# 动态列表
 >列表当前支持table形式展示，



| 键  | 意义 | 类型 | 必选 | 默认值 | 备注 |
| --- | ---- | ---- | ---- | ------ | ---- |----|
| hasCheckbox | 是否可选择                    | boolean | ×    | true   |                                  |
| properties  | 绑定到列表组件（table）的属性 | Object  | ×    |        | 参考列表组件属性（el-table）  暂不支持动态响应   |
| colOptions  | 列默认配置                    | boolean | ×    | true   | 会与字段列表配置子项合并绑定到列 |
| loadListApi  | 列表数据加载方法                    | function | ×    |    | 返回一个[加载数据的Promise](#加载返回数据格式) |
| lineActions  | 列表数据操作栏                    | object | ×    |  默认 修改、查看、删除操作   | [操作配置](../actions) |



 
## 默认配置
```
{
  hasCheckbox: true,
  properties: {
    stripe: true,
    border: true,
    'row-class-name': '',
    'highlight-current-row': true,
    selectable: true,
    expand: true,
    'show-header': true,
    'empty-text': '暂无数据',
    align: 'center',
    'header-align': 'center',
    'row-style': { height: '40px' },
    'row-key': 'id'      //主键id   数据表主键非id时  需要特别指定  
  },
  colOptions: {
    // width:120,
    minWidth: 60,
    'show-overflow-tooltip': true,
    align: 'center',
    'header-align': 'center'
  }

  // style: "width: 100%",
}
```

## 示例
::: demo   列表配置示例
```html
<template>
<ClientOnly>
  

  
  <DynamicCurdPage
    :entityLabel="entityLabel"
    :fields="fields"
    :pageOptionsprops="pageOptions"
    :apiPromises="apiPromises"
  ></DynamicCurdPage>
  <div>
     <span >切换配置：  </span>
   <el-switch v-model="mode"  active-value="no"  inactive-value="default" />  
  
   </div>
</ClientOnly>
  
</template>
<script>

const fields  =[
  {key:'id'},

  {
    key: "name",                  
    type: "FormInput",           
    label: "姓名",           
    tableOption:true
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
    searchOption: {
      sort:1
    },
    tableOption:true

  },
   {
    key: "cName",
    label: "公司名称",
    tableOption:true
  },
  {
    key: "email",
    label: "邮箱",
    searchOption: true,
    tableOption:true

  },
   
]

export default {
  data () {
    return {
      fields,
      mode:'default',
      entityLabel:'人员',
      // Api配置
      apiPromises:{
        create:mockApi,
        bulkdelete:mockApi,
        list:tableinfoListApi,
        detail:mockApi,
        update:mockApi
      },
    }
  },
  computed:{
    pageOptions(){
      return {
        listOption:this.$appendToPreset('tableOption',this.mode=='default'?{}:{
        hasCheckbox: false,
       
        colOptions: {
          minWidth: 60,
          'show-overflow-tooltip': false,
        }
      }),
      treeOption:null}
    }
  },
  methods:{
 
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
 