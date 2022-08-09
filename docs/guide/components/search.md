---
pageClass:  wide-width-container
---
# 动态搜索栏
>搜索栏本质是一个表单，所以配置和[动态表单](./form#)相似，但也有其独特之处
1. 搜索栏横向排列
2. 搜索栏没有分组
3. 搜索栏可由change事件触发提交

## 组件参数
| 键  | 意义 | 类型 | 必选 | 默认值 | 备注 |
| --- | ---- | ---- | ---- | ------ | ---- | 
| options | 整体配置                    | Object | ×    |  参默认配置   |   配置项参考[整体配置](#整体配置)  |
| fields | 搜索字段                    | Array | √    |  []   |  配置项参考[搜索字段配置](#搜索字段配置)   |

### 整体配置
|  键   | 意义  |类型| 必选  |默认值  |备注   
|  ----  | ----  |----  |----  |----  |----  |----  |
| properties  | 搜索表单属性 | Object | ×  |  {  'label-width': '80px','label-position': 'right'} | 会整体绑定到表单 form 中 | 
| trigger  | 搜索触发事件 | string |×  | 可选值 click change  为click时会展示搜索按钮  |  | 
| resetable  | 是否展示重置按钮 |boolean |× | true  |   | 
| searchLabel  |  搜索按钮文案 |string| × | 搜索 |   | 
| searchClasses  | 搜索表单项预设类 | array |×  |   ['grid-col-6', 'grid-col-lg-4', 'grid-col-sm-6','grid-col-ss-8', 'grid-col-xs-12']|   预设类主要是配置[布局](../layout)  | 
| borderForm  |  是否展示表单边框 |boolean| × | false |  动态表单属性  一般不用定义  | 

**表单字段配置分两部分**
    1. 表单字段通用配置---  对各类表单组件都生效的配置
    2. 表单字段组件配置---  各表单组件特有的配置信息  通常配置在extra中


 | 键               | 意义          | 类型   | 必选 | 默认值 | 备注          |
 | ---------------- | ------------------ | ------ | ---- | ------ | ---------------------- |  
 | label | 表单项标签名 | string | √    |      |       |
 | labelTip | 表单项标签名提示文字 | string | ×    |      |       |
 | type | 表单项类型 | string | ×    |  FormInput    |       |
 | key | 表单项字段名 | string | √    |      |   不能重复    |
 | wraperProperties | 表单项包裹容器属性 | object | ×    | {}     | 包裹容器都为form-item 组件 Dy-Vue会将所有属性绑定到该组件     |
 | expressProp      | 表单属性           | object | ×    | {}     | 是一组特殊的配置属性，成员值支持表达式语法，支持配置除defaultValue、rules、changeHandle以外的大多数属性属性，如 disabled，hidden，等。额外支持required、value 实现动态定义表单项值以及必填验证 |
 | changeHandle     | 表单联动配置       | Object | ×    | {}     | 表单联动配置     |
 | defaultValue     | 默认值             | Any    | ×    | null   |                           |
 | hidden           | 是否显示           | reg    | ×    |        | 控制该表单的显隐，支持表达式语法       |
 | col             | 占据的列数 | integer | ×    | ''     |  默认一共两列          |
 | extra            | 其他组件属性       | object | ×    | {}     | 额外的组件属性建议配置在extra内，Dyvue最终会将其展开到配置项中（所有将其配置到与父级也是有效） |


 ## 示例
::: demo   搜索栏配置示例
```html
<template>
<ClientOnly>
  
  <DynamicSearchForm
    :fields="searchFields"
    :options="searchOption"
    @search="onSearch"
  ></DynamicSearchForm>
  <div>
  <span >切换配置：  </span>
   <el-switch v-model="mode"  active-value="change"  inactive-value="click" />  
  
   </div>
</ClientOnly>
  
</template>
<script>

const fields  =[
  {
    key: "name",                  
    type: "FormInput",           
    label: "姓名",           
      wraperProperties:{    //会传入elment 表单组件FormItem的参数props
        style: {},
        class: ['grid-col-8'],
      },
      properties: {    //会传入elment 表单组件本身  支持表达式语法
        clearable:true
      },
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
    return {
      mode:'',
      searchFields:this.$buildSearchFields(fields),

    }
  },
  computed:{
      searchOption(){
        return {
          resetable:false,
          trigger: this.mode,
          properties:{
          }
        }

      },
  },
  methods:{
    switch(){
       this.mode=this.mode=='click'?'change':'click'
    },
    onSearch(params){
      console.log(params)
      alert(params)
    }
  }
}
</script>
```
:::

::: tip  搜索栏字段配置
搜索栏字段配置通表单[字段配置](./#搜索栏配置子项)，
:::