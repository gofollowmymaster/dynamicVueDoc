---
pageClass:  wide-width-container
---
# 详情
::: tip
详情实际是表单的只读版本，DyVue2中各表单项组件都提供了文本模式（textMode），文本模式下给表单提供了不一样的dom结构各样式。
通常情况下，不需要单独配置详情，只需要将表单中配置`textMode = true `
当详情与表单内容不一致是需要单独配置详情
:::
## 功能特点

- 通过 json 数据来生成详情；
- 通过 data 数据给表单每个元素赋值；
- 支持设置表单多列,单列,自适应布局；
- 支持多种方式实现表单数据联动 1.表达式语法  
- 表单支持分块显示，支持单区块收起、展开；
<!-- - 支持将表单显示模式切换：**长表单**/带 tab 切换的短表单；  -->



 ## 开箱可用的表单组件
 参[表单](./form.md#开箱可用的表单组件)
## 模板项目中附带的表单组件  
 参[表单](./form.md#开箱可用的表单组件)


 
 
## 组件参数
| 键  | 意义 | 类型 | 必选 | 默认值 | 备注 |
| --- | ---- | ---- | ---- | ------ | ---- | 
| formOption | 表单整体配置                    | Object | ×    |  参默认配置   |   配置项参考[表单整体配置](#表单整体配置)  |
| formItemList | 表单字段                    | Array | √    |  []   |  配置项参考[表单字段配置](#表单字段配置)   |
| actions  | 操作                    | Array | ×     |     |      |
 
### 表单整体配置
表单整体配置均有默认值，可以不用配置。
 | 键               | 意义          | 类型   | 必选 | 默认值 | 备注          |
 | ---------------- | ------------------ | ------ | ---- | ------ | ---------------------- |  
 | colNum             | 列数 | integer | ×    | 2     |          |
 | formProperties | 表单属性 | object | ×    | {}     |  支持el-form  所有属性    |
 | borderForm       | 是否带边框           | boolean  | ×    | false    |   |
 | showFoldBtn      | 是否展示目录按钮           | boolean | ×    | false     |  |
 | label-width     | label宽度       | string | ×    | 130px     |  会覆盖formProperties内的label-width  |
 | label-position     | label 位置             | string    | ×    | right   |    会覆盖formProperties内的label-position   |
 | pageLabelWidth           | 页面表单label宽度           | string    | ×    |  160px      |   会覆盖页面表单formProperties内的label-width   |


## 表单字段配置
**表单字段配置分两部分**
    1. 表单字段通用配置---  对各类表单组件都生效的配置
    2. 表单字段组件配置---  各表单组件特有的配置信息  通常配置在extra中

通用配置对各类表单组件都生效

 | 键               | 意义          | 类型   | 必选 | 默认值 | 备注          |
 | ---------------- | ------------------ | ------ | ---- | ------ | ---------------------- |  
 | label | 表单项标签名 | string | √    |      |       |
 | labelTip | 表单项标签名提示文字 | string | ×    |      |       |
 | type | 表单项类型 | string | ×    |  FormInput    |       |
 | key | 表单项字段名 | string | √    |      |   不能重复    |
 | wraperProperties | 表单项包裹容器属性 | object | ×    | {}     | 包裹容器都为form-item 组件 Dy-Vue会将所有属性绑定到该组件     |
 | expressProp      | 表单属性           | object | ×    | {}     | 是一组特殊的配置属性，成员值支持表达式语法，支持配置除defaultValue、rules、changeHandle以外的大多数属性属性，如 disabled，hidden，等。额外支持required、value 实现动态定义表单项值以及必填验证 |
 | defaultValue     | 默认值             | Any    | ×    | null   |                           |
 | hidden           | 是否显示           | reg    | ×    |        | 控制该表单的显隐，支持表达式语法       |
 | col             | 占据的列数 | integer | ×    | ''     |  默认一共两列          |
 | extra            | 其他组件属性       | object | ×    | {}     | 额外的组件属性建议配置在extra内，Dyvue最终会将其展开到配置项中（所有将其配置到与父级也是有效） |


::: tip 字段表单配置说明
字段表单配置较灵活，原则上可以根据表单组件属性无限拓展，拓展属性即可放在extra内也可与extra同级，甚至可以不放在formOption中，Dy-Vue最终会将字段对象扁平化，删除wraperProperties、rules、expressProp、changeHandle、defaultValue，searchOption，listOption等配置后，绑定到表单组件。 
表单组件配置参考 [表单项配置](./#表单项配置)
:::

::: demo
``` html
<template>
<ClientOnly>

  <DynamicForm
    class="relative"
    :formOption="formOption"
    :formItemList="formItemList"
    :actions="actions"
  ></DynamicForm>
</ClientOnly>
  
</template>
<script>
const fields  =[
  {
    key: "name",                  
    type: "FormInput",           
    label: "姓名",           
    formSection: "基础信息",      
    formOption: {                  
      extra:{
        clearable:true   
      }
    },
  },
  {
    key: "status",
    type: "FormSelect",
    label: '选择框',
    formSection: "基础信息",      
    options: [          //select radio checkbox 相关组件有必填options信息
      {
        value: "1",
        label: "选我会给设置姓名disabled",
      },
      {
        value: "2",
        label: "选我会设置姓名必填",
      },
      {
        value: "3",
        label: "选我会设置姓名只读",
      },
    ],
    formOption: {
 
    },
  },
   {
    key: "cName",
    label: "公司名称",
    formSection: "职业信息",      
    formOption: {},
  },
  {
    key: "email",
    label: "邮箱",
    formSection: "职业信息",      
    formOption: {
    },
  },
    {
    key: "phone",
    label: "公司电话",   
    formSection: "职业信息",      
    formOption: {
    },
  }, 
  {
    key: "tip",
    label: "", 
    type:'FormText',  
    formSection: "职业信息",      
    formOption: {
       content:'这是一段描述文字',
       wraperProperties:{
          'label-width':'0px'
       }
    },
  }, 
  {
     key :'price',
     type:'FormNumberRange',
     label:'价格区间',
     formSection: "职业信息",      
      formOption: {
      },
  },
    
]
 

export default {
  data () {
    return {
      formOption: {
         'label-width':'100px',
         textMode:true
      },
      formItemList:this.$buildFormFields(fields),
      actions: {
      }
    }
  }
}
 
</script>
```
:::
 
   

