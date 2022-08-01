---
pageClass:  wide-width-container
---
# 动态表单
::: tip
表单是管理页面开发中的重点，也是最繁琐的部分，功能各异的表单项重复出现在项目的各个角落，表单项间相互依赖关系（交互联动）千变万化，
为了快速开发表单，各厂同学都有下足了工夫，动态表单项目不断推出。对此DyVue在前人的肩膀上也提供了自己的方案，相较而言，DyVue的动态表单方案上手简单，功能健全，预设了大量开箱即用的表单组件，并支持便捷的开发集成自定义组件。
能够轻松的构建复杂业务逻辑的表单
:::
## 功能特点

- 通过 json 数据来生成表单；
- 通过 data 数据给表单每个元素赋值；
- 支持设置表单多列,单列,自适应布局；
- 支持数据新增,修改,详情展示（切换为纯文本显示模式）；
- 支持多种方式实现表单数据联动 1.表达式语法   2.changeHandle
- 支持表单校验，预制了常见验证规则，配置简洁；
- 表单支持分块显示，支持单区块收起、展开；
- 二次开发自定义表单元素难度极低；
- 自动测试（批量填充数据）
- 支持将表单显示模式切换：**长表单**/带 tab 切换的短表单； 



 ## 开箱可用的表单组件

- 文本输入框  ------  [FormInput](#forminput) 
- 文本域输入框 ------ [FormTextarea](#formtextarea) 
- 富文本编辑 -------- [FormRichEditor](#FormRichEditor) 
- 普通下拉框  ------  [FormSelect](#formselect) 
- 普通多选下拉框 ---- [FormMulSelect](./#FormMulSelect) 
- 级联选择 ---------- [FormCascader](./#FormCascader) 
- 单选框  ----------  [FormRadio](./#FormRadio) 
- 多选框   ---------  [FormCheckbox](./#FormCheckbox)  
- 开关    ---------   [FormSwitch](./#FormSwitch)  
- 日期输入框 --------  [FormDate](./#FormDate) 
- 日期范围输入框 ----- [FormDateRange](./#FormDateRange) 
- 日期时间输入框 ----- [FormDateTime](./#FormDateTime) 
- 日期时间范围输入框 -- [FormDateTime](./#FormDateTimeRange) 
- 普通数字输入框 ----- [FormIntNumber](./#FormIntNumber) 
- 浮点数字输入框 ----- [FormNumberPlus](./#FormNumberPlus) 
- 百分比输入框 ------- [FormRateInput](./#FormRateInput) 
- 金额文本输入框  ---  [FormMoneyInput](./#FormMoneyInput) 
- 数值范围  --------  [FormNumberRange](./#FormNumberRange) 
- 滑块选择  --------  [FormNumberRange](./#FormNumberRange) 
- 文件上传 ---------- [FormSlider](./#FormSlider) 
- 颜色选择 ---------- [FormColorPicker](./#FormColorPicker) 
- 树型选择器 --------- [FormTreeSelect](./#FormTreeSelect) 
- 纯文本 ------------- [FormText](./#FormText) 
- 隐藏字段 ----------- [FormHide](./#FormHide) 
- 增删改查表格表单 ---- [FormCurd](./#FormCurd) 
- 可编辑表格 ---------- [FormTableEditable](./#FormTableEditable) 
- 子表单 -------------- [FormChildrenForm](./#FormChildrenForm) 
## 模板项目中附带的表单组件  
- 地图选点  --------- [FormSelectPoint](./#FormSelectPoint) 
- 地图划区  --------- [FormDrawElement](./#FormDrawElement) 
- 字典下拉多选框  --  [FormDynamicSelect](./#FormDynamicSelect)  
- 输入搜索下拉框  -- (todo)


  
## 表单交互
表单交互是开发业务开发中的重点，也是动态表单开发的难点，DyVue提供了两项配置实现表单的交互联动
- 方案一   被动式  模板语法/function
- 方案二   主动式  changeHandle

::: warning  注意
两者可以同时生效    但同时对一条数据配置值时，会因优先级问题出现问题
:::

## 表单开放Api
1. updateFormData   
更新表单数据
``` js
    formVm.updateFormData({
            key: value
        })
```
2. setElementRequired
``` js
   formVm.setElementRequired(key,isRequired)
```
3. setElementDisable
 ``` js
   formVm.setElementDisable(key,isDisable)
```
4. setElementHidden
``` js
   formVm.setElementHidden(key,isHidden)
```
5. resetFields
重置表单数据
``` js
   formVm.resetFields()
```

## 表单配置
表单配置信息分两部分：
1. 表单整体配置
2. 表单字段配置
      - 通用配置  对各类表单组件都生效的配置
      - 组件配置  各表单组件特有的配置信息 
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


## 表单字段通用配置
通用配置对各类表单组件都生效

 | 键               | 意义          | 类型   | 必选 | 默认值 | 备注          |
 | ---------------- | ------------------ | ------ | ---- | ------ | ---------------------- |  
 | wraperProperties | 表单项包裹容器属性 | object | ×    | {}     | 包裹容器都为form-item 组件 Dy-Vue会将所有属性绑定到该组件     |
 | rules            | 验证规则           | array  | ×    | []     | 成员可为字符串、正则、对象  字符串是系统预定义的验证规则 包括required email url integer        |
 | expressProp      | 表单属性           | object | ×    | {}     | 是一组特殊的配置属性，成员值支持表达式语法，支持配置除defaultValue、rules、changeHandle以外的大多数属性属性，如 disabled，hidden，等。额外支持required、value 实现动态定义表单项值以及必填验证 |
 | changeHandle     | 表单联动配置       | Object | ×    | {}     | 表单联动配置     |
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
      wraperProperties:{    //会传入elment 表单组件el-form-item的参数props
        style: {},
      },
      rules: [                  //表单验证验证规则
       'required'  ,      //系统预置规则包括 required email url integer    可以配置正则和element UI 支持的验证对象
      ],
      expressProp: {    //支持表达式语法的属性  最终ui合并到与rules同级
        disabled: '#{status}==1',
        readOnly: '#{status}==3',
        required:'#{status}==2',
      },
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
        changeHandle(value,vm) {    // 实现事件式数据联动
              vm.updateFormData({
                'address':'地址-'+value,
                name:'姓名'+value
              })
        },
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
         rules: [    //表单验证验证规则
        'email',    //系统预置规则包括    required email url integer
       {    //自定义规则
            message: '请输入***',
            trigger: 'blur',
            required: true
       }
      ],
    },
  },
    {
    key: "phone",
    label: "公司电话",   
    formSection: "职业信息",      
    formOption: {
      rules:[
         /^[1-9]\d{5}(?!\d)$/,     //正则表单式验证
      ]
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
      formOption:this.$appendToPreset('formOption',{
         'label-width':'100px'
      }),
      formItemList:this.$buildFormFields(fields),
      actions: this.$generateActionOption({
        actionType:'submit',
        apiPromise:Promise.resolve({msg:'操作成功',code:200})
      })
    }
  }
}
 
</script>
```
:::
## 表单项配置

### FormInput
支持elementUi el-input组件所有属性
### FormTextarea
支持elementUi el-input组件所有属性
### FormSelect
### FormMulSelect

### FormCascader  

### FormSwitch    

### FormRadio   
 
| 键              | 意义         | 类型    | 必选 | 默认值 | 备注                                                 |
| --------------- | ------------ | ------- | ---- | ------ | ---------------------------------------------------|
| groupProperties | 分组属性     | Object  | ×    | {}     | 支持 el-radio-group组件所有属性                      |
| itemProperties  | 单项属性     | Object  | ×    | {}     | 支持 el-radio/el-radio-button 组件所有属性           |
| buttom          | 是否按钮形式 | Boolean | ×    | false  | 为true时渲染el-radio-button false渲染el-radio-button |
  


### FormCheckbox  

| 键              | 意义         | 类型    | 必选 | 默认值 | 备注                                                |
| --------------- | ------------ | ------- | ---- | ------ | --------------------------------------------------- |
| groupProperties | 分组属性     | Object  | ×    | {}     | 支持 el-checkbox-group组件所有属性                  |
| itemProperties  | 单项属性     | Object  | ×    | {}     | 支持 el-checkbox/el-checkbox-button 组件所有属性    |
| buttom          | 是否按钮形式 | Boolean | ×    | false  | 为true时渲染el-checkbox-button false渲染el-checkbox |
  
### FormRichEditor

| 键      | 意义     | 类型   | 必选 | 默认值                                                                                                                                                                                                             | 备注 |
| ------- | -------- | ------ | ---- | ---------------- | ---- |
| plugins | 插件列表 | Object | ×    |                   |      |
| toolbar | 工具条   | Object | ×    |                   |      |
  


### FormDate 
el-date-picker   type="date"  value-format="yyyy-MM-dd"
支持 el-date-picker 组件除type、value-format外所有属性
### FormDateRange  
  el-date-picker   type="daterange"  value-format="yyyy-MM-dd"
支持 el-date-picker 组件除type、value-format外所有属性
### FormDateTime 
  el-date-picker   type="datetime"  value-format="yyyy-MM-dd HH:mm:ss"
支持 el-date-picker 组件除type、value-format外所有属性
### FormDateTimeRange 
  el-date-picker   type="datetimerange"  value-format="yyyy-MM-dd HH:mm:ss"
支持 el-date-picker 组件除type、value-format外所有属性
### FormNumber  
  同el-input type="number"    额外添加了两个属性（slot）
| 键     | 意义     | 类型   | 必选 | 默认值 | 备注 |
| ------ | -------- | ------ | ---- | ------ | ---- |
| prefix | 前置符号 | string | ×    |        |      |
| suffix | 后置符号 | string | ×    |        |      |
### FormNumberPlus 
   同el-input type="number"  额外加强了相关功能
  自动千分位，支持整数限制、非负数限制、小数点后自动补零、前方添加特殊符号（比如￥），后方添加特殊符号

| 键           | 意义               | 类型    | 必选 | 默认值 | 备注                                                   |
| ------------ | ------------------ | ------- | ---- | ------ | ------------------------------------------------------ |
| positive     | 是否禁止输入负号   | boolean | ×    | false  |                                                        |
| onlyInt      | 是否禁止输入小数点 | boolean | ×    | 750    |                                                        |
| zeroPadding  | 自动补零到指定位数 | number  | ×    |        |                                                        |
| decimalLimit | 最大小数位数       | number  | ×    |        | 最大小数位数，小数位数超过这个长度的部分，将被自动截掉 |
| prefix       | 前置符号           | string  | ×    |        |                                                        |
| suffix       | 后置符号           | string  | ×    |        |                                                        |

  

### FormRateInput 
百分比的数字输入框，存储/提交的时候，给的是转换后的真实小数。例如 50% 提交的值是 0.5。

### FormNumberRange 
  配置同  [FormNumber](./#FormNumber)
### FormSlider 
 同 elementUi el-slider
### FormColorPicker  
 同 elementUi el-color-picker  
 ### FormUpload 
基于ElementUi el-upload 封装，配置属性参考el-upload 。 额外作了拓展/优化配置

1. 上传动作强制使用apiPromise（http-request） 配置 ，建议全局定义上传行为，需要适配上传以及犯规结果参数
2. 简化accept 参数  支持doc、img、video以及自定义参数
3.  list-type  添加 table 类型
4.  list-type 为table 是 添加downloadApi 参数
 

### FormTreeSelect 
支持el-tree 所有属性
### FormText 
纯文本，不可编辑，用于某些特定的场景
特有参数  content   文本内容
### FormHide 
常用于更新、修改表单  提交id。该类型不会展示在界面中，但会提交数据
### FormCurd 
  表格形式的子表单

   | 键          | 意义       | 类型   | 必选 | 默认值 | 备注                                 |
   | ----------- | ---------- | ------ | ---- | ------ | ------------------------------------ |
   | fields      | 字段列表   | array  | √    | []     | 配置规则同[页面模板组件](./index.md) |
   | options     | 选项       | object | √    | {}     | 配置规则同[页面模板组件](./index.md) |
   | entityLabel | 子表单名称 | string | ×    |        |                                      |
 
  
### FormTableEditable 
  配置同  [FormCurd](./#FormCurd) 
   不支持验证,不支持expressProp
### FormTableEditable 
  支持验证
| 键     | 意义     | 类型  | 必选 | 默认值 | 备注                                 |
| ------ | -------- | ----- | ---- | ------ | ------------------------------------ |
| fields | 字段列表 | array | √    | []     | 配置规则同[页面模板组件](./index.md) |
  

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
   

const eduListFields = [
   
    {
        key: 'treeStreetType',
        type: 'FormSelect',
        label: '单位',
        tableOption: {

        },
        options: [
            {
                value: '1',
                label: '株'
            },
            {
                value: '2',
                label: '平方'
            }
        ],
        formOption: {
            col: 5,
            rules: ['required']
        }
    },
    {
        key: 'treeStreetContext',
        type: 'FormInput',
        label: '备注',
        tableOption: true,
        formOption: {
            col: 5,
            rules: ['required']
        }
    },
        {
        key: 'color',
        type: 'FormColorPicker',
        label: '颜色',
        tableOption: true,
        formOption: {
            col: 5,
            rules: ['required']
        }
    }
]
 const eduListOption = {
    topToolBar: {
        bulkdelete: null,
        create: {
          colNum:1,
          saveAtion: {
              callback: {
                  showTip: false
              }
          }
        }
    },
    tableOption: {
        hasCheckbox: false,
        lineActions: {
            detail: null,
            delete: {
                callback: {
                    showTip: false
                }
            },
            update: {
                colNum:1,
                saveAtion: {
                    callback: {
                        showTip: false
                    }
                }
            }
        }
    }
}

//没有联动
const eduListTableFields = [
    {
        type: 'FormText',
        label: 'id',
        key: 'id',
        tableOption: {}
    },
    {
        key: 'treeId',
        type: 'FormInput',
        label: '类别',

        tableOption: {
            sort: 2,
            key: 'treeName'
        },
        formOption: {
        }
    },
    {
        key: 'treeStreetQuantity',
        type: 'FormNumber',
        label: '数量',
        tableOption: {
            label: '设备数量',
            sort: 3
        },
        formOption: {
        }
    },
    {
        key: 'treeStreetType',
        type: 'FormSelect',
        label: '单位',
        tableOption: {
        },
        options: [
            {
                value: '1',
                label: '台'
            },
            {
                value: '2',
                label: '平方'
            }
        ],
        formOption: {
        }
    },
    {
        key: 'time',
        type: 'FormDateTime',
        label: '时间',
        tableOption: {},
        formOption: {
        }
    },
    {
        key: 'treeStreetContext',
        type: 'FormInput',
        label: '备注',
        tableOption: {},
        formOption: {
            disabled:true,
        }
    }

]
 const eduListTableOption = {
    hasCheckbox: false
}

const fields  =[
  {
    key: "email",
    label: "邮箱",
    formSection: "职业信息",      
    formOption: {
         rules: [    //表单验证验证规则
        'email',    //系统预置规则包括    required email url integer
       {    //自定义规则
            message: '请输入***',
            trigger: 'blur',
            required: true
       }
      ],
    },
  },
    {
      key: 'children-form',
      label: '',
      type: 'FormChildrenForm',
      formSection: '子表单',
      formOption: {
        col: 5,
        wraperProperties: {
          'label-width': '0px'
        },
          fields: eduListFields,
          entityLabel: '子表单',
                      defaultValue: [
                {
                    id: 1,
                    treeStreetType: '1',
                    treeStreetContext: '实打实大所多撒',
                    color:"blue"
                },
            ]
      }
    },
    {
      key: 'curd',
      label: '',
      type: 'FormCurd',
      formSection: '表格子表单',
      formOption: {
        col: 5,
        wraperProperties: {
          'label-width': '0px'
        },
        fields: eduListFields,
        options: eduListOption,
        entityLabel: '表格子表单',
        defaultValue: [
            {
              id: 1,
              treeStreetType: '1',
              treeStreetContext: '实打实大所多撒',
              color:"blue"
            },
        ]
      }
    },
    {
      key: 'tableeditable',
      label: '',
      type: 'FormTableEditable',
      formSection: '可编辑表格',
      formOption: {
        col: 5,
        wraperProperties: {
          'label-width': '0px'
        },
        fields: eduListTableFields,
        options: eduListOption,
        entityLabel: '可编辑表格',
        defaultValue: [
          {
            id: 1,
            treeStreetType: '1',
            color:"blue"
          },
        ]
      }
    },
]

export default {
  data () {
     debugger

    return {
      formOption:this.$appendToPreset('formOption',{
         'label-width':'100px',
          borderForm: false,
          showFoldBtn: true,
      }),
      formItemList:this.$buildFormFields(fields),
      actions: this.$generateActionOption({
        actionType:'submit',
        apiPromise:Promise.resolve({msg:'操作成功',code:200})
      })
    }
  }
}
 
</script>
```
:::

## 模板项目中附带的表单组件  
- 地图选点  --------- [FormSelectPoint](./#FormSelectPoint) 
- 地图划区  --------- [FormDrawElement](./#FormDrawElement) 
- 字典下拉多选框  --  [FormDynamicSelect](./#FormDynamicSelect)  
- 输入搜索下拉框  -- (todo)

   

