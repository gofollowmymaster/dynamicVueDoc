# 动态搜索栏
>搜索栏本质是一个表单，所以配置和[动态表单](./form#)相似，但也有其独特之处
1. 搜索栏横向排列
2. 搜索栏没有分组
3. 搜索栏可由change事件触发提交

|  键   | 意义  |类型| 必选  |默认值  |备注   
|  ----  | ----  |----  |----  |----  |----  |----  |
| properties  | 搜索表单属性 | Object | ×  |  {  'label-width': '80px','label-position': 'right'} | 会整体绑定到表单 form 中 | 
| trigger  | 搜索触发事件 | string |×  | 可选值 click change  为click时会展示搜索按钮  |  | 
| resetable  | 是否展示重置按钮 |boolean |× | true  |   | 
| searchLabel  |  搜索按钮文案 |string| × | 搜索 |   | 
| searchClasses  | 搜索表单项预设类 | array |×  |   ['grid-col-6', 'grid-col-lg-4', 'grid-col-sm-6','grid-col-ss-8', 'grid-col-xs-12']|   预设类主要是配置[布局](../layout)  | 
| borderForm  |  是否展示表单边框 |boolean| × | false |  动态表单属性  一般不用定义  | 

## 预设/默认配置
 ```
 {
  properties: {
    'label-width': '80px',
    'label-position': 'right'
  },
  showTestTool,
  borderForm: false,
  trigger: 'click',
  resetable: true,
  searchLabel: '搜索',
  searchClasses: [
    'grid-col-6',
    'grid-col-lg-4',
    'grid-col-sm-6',
    'grid-col-ss-8',
    'grid-col-xs-12'
  ]
}
 ```
 ## 示例
::: demo   搜索栏配置示例
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
   <el-switch v-model="mode"  active-value="change"  inactive-value="click" />  
  
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
    searchOption: {                  
      wraperProperties:{    //会传入elment 表单组件FormItem的参数props
        style: {},
        class: ['grid-col-8'],
      },
      properties: {    //会传入elment 表单组件本身  支持表达式语法
        clearable:true
      },
    },
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
      mode:'click',
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
        searchOption:this.$appendToPreset('searchOption',this.mode=='click'?{}:{
         resetable:false,
         trigger:'change',
         properties:{
          //  'label-width':'0px'
         }
      }),
      treeOption:null}
    }
  },
  methods:{
    switch(){
       this.mode=this.mode=='click'?'change':'click'
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


::: tip  搜索栏字段配置
搜索栏字段配置通表单[字段配置](./#搜索栏配置子项)，
:::