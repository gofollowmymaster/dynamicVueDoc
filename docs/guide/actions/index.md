---
pageClass:  wide-width-container
---
# 操作-DynamicActions
## 简介
   如果整体配置是大脑,组件是血肉,那么操作(action)就是筋骨,将全身肌体串联起来,在配置的驱动下实现页面交互功能
   Dy-Vue提供了丰富多样的交互类型,合理配置能实现功能复杂的页面交互

::: tip  功能
- 操作会携带页面相关数据    （页面模板上方操作栏支持获取搜索栏数据(导出)和列表中选择的数据、列表右侧操作栏支持获取当前行数据）
- 通常弹窗类操作/请求类操作/路由类操作才需要携带数据
- 操作出发时支持弹出poper层、msgBox提示
- 请求/下载等操作发起后支持多种[回调](#操作回调)
:::
## 支持的操作
1.  内容弹窗--[dialogPage](#内容弹窗)
2.  表单弹窗--[dialogForm](#表单弹窗)
3.  接口请求 [requestApi](#接口请求)
4.  下载文件 [download](#下载文件)
5.  表单提交 [submit](#表单提交)
6.  表单重置 [reset](#表单重置)
7.  弹窗/页面关闭 [close](#弹窗/页面关闭)
8.  连接跳转 [link](#连接跳转)
9.  路由跳转 [router](#路由跳转)
10.  路由到内容页面 [routerDialogPage](#路由到内容页面)
11.  路由到表单页面 [routerDialogForm](#路由到表单页面)
12.  自定义操作   [custome](#自定义操作)


 


## 组件参数
| 键  | 意义 | 类型 | 必选 | 默认值 | 备注 |
| --- | ---- | ---- | ---- | ------ | ---- | 
| actions | 操作列表                    | Array | ×    |  []   |   配置项参考[操作配置](#操作配置)  |
| action-data | 操作数据                    | Object | √    |  {}   |  将要传递给操作的数据，支持传多组数据，在操作中通过actionDataKey制定传入操作的数据   |
 
## 操作配置
和表单配置类似操作配置也分为通用配置和具体操作特有配置
### 通用配置
| 键  | 意义 | 类型 | 必选 | 默认值 | 备注 |
| --- | ---- | ---- | ---- | ------ | ---- | 
| actionType | 操作类型              |  string | √     |    |      |
| component | 操作触发组件                   |  string | ×    |  el-buttom   |      |
| label | 名称                    | string | ×       |  操作/其他   |     |
| componentProperties | 操作触发组件属性                    | Object | ×    |  {}   |  所有属性将绑定到操作触发组件中    |
| key |   操作唯一标识key                  | string | ×    |  ''   |   为空时会依次尝试使用 `label` `permission`     |
| permission |  权限标识,会传递给 `v-permission` 指令                 | string | ×    |  ''   |    为空时，会蒋label传递给 `v-permission`     |
| sort | 顺序                   | number | ×    |  100   |   会按照`sort`值 升序排列    |
| isShow | 是否展示                   | Function/boolean | ×    |  true   |   为function时会接受`actionData` 要求返回`boolean`    |
| isLoadData | 是否加载数据（actionData）                    | boolean | ×    |  true   |       |
| dataAdapter | 数据适配方法                    | function | ×    |      |       |
| actionDataKey | actionData中有多组数据时， 操作数据的键                | string | ×    |  undefined   |         |
| actionPopComponent | 操作气泡提示组件            | string | ×    |  popConfirm   |         |
| actionPopProperties | 操作气泡提示组件参数                 | Object | ×    |  {}   |     所有属性将绑定到操作气泡提示组件中    |
| msgBox | 操作提示消息            | Object | ×    |  参 msgBox[默认配置]()   |    属性同el-message-box 组件     |
| actionHook | 操作Hook            | Function | ×    |    |   执行操作前Hook 会传入`action` 和 `actinData`  可直接修改`action` 和 `actinData`     |
| hasBuild | 是否已经构建                   | boolean | ×    |  false   |        |
| mainKey |  数据主键                   | string | ×    |  id   |   router*Action时会将mainKey对应数据值传递到router中     |




 
### 内容弹窗
>该操作会弹出一个包含可自定义内容的弹窗
>自定义内容布局方式支持Grid和tab 暂不支持多级嵌套
>弹窗容器支持 el-dialog  el-drawer  dy-page(仿页面容器)

| 键  | 意义 | 类型 | 必选 | 默认值 | 备注 |
| --- | ---- | ---- | ---- | ------ | ---- | 
| title | 标题              |  string | ×     |    |      |
| container | 弹窗容器                   |  string | ×    |  el-dialog   |    el-dialog  el-drawer  dy-page(仿页面容器)     |
| containerProperties | 容器属性                    | Object | ×       |  {}   |   所有属性将绑定到容器组件中  |
| layout | 容器布局                 | String | ×       |  LayoutGrid    |     |
| layoutProperties | 容器布局                 | String | ×       |  LayoutGrid    |     |
| body | 容器内容                 | Array | ×       |  []    |  弹窗内容组件列表    配置参见[]()  |


#### 弹窗内容组件配置

| 键  | 意义 | 类型 | 必选 | 默认值 | 备注 |
| --- | ---- | ---- | ---- | ------ | ---- | 
| component | 组件名              |  string | ×     |    |  需全局注册    |
| name | 组件数据键                   |  string | ×    | ''   |   会将对应key的数据传递给组件的data参数     |
| props | 组件属性                    | Object | ×       |  {}   |  所有属性将绑定到组件中   |



::: demo
``` html
<template>
<ClientOnly>

  <DynamicActions
    :actions="actions"
    :action-data="data"
  ></DynamicActions>
</ClientOnly>
  
</template>
<script>
   

export default {
  data () {
    return {
      data:{
          temperature:42
        },
      actions: [{
        component: 'el-button',   //操作触发组件  默认按钮
        label: '查看',                //操作出发组件文字
        actionType: 'dialogPage',   //操作类型
        isLoadData: true,          //是否加载数据
        containerProperties: {            //弹窗属性
          title: '气温详情'
        },
        container: 'el-dialog',    //弹窗容器
        body: [                           //弹窗内容
          {
              component: 'DyTmpl',      // 组件
              name: '@object@',           //组件数据名     @object@ 会获取操作携带的所有数据  也可指定键名
              props: {                    //弹窗属性 
                class: ['grid-col-24']  ,
                tmpl:"当前气温#{temperature}℃",
              }
            },
        ]                 
       
      }] ,
    }
  }
}
 
</script>
```
:::


### 表单弹窗
>该操作会弹出一个包含动态表单的弹窗
>弹窗容器支持 el-dialog  el-drawer  dy-page(仿页面容器)


#### 操作参数


| 键               | 意义          | 类型   | 必选 | 默认值 | 备注          |
| ---------------- | ------------------ | ------ | ---- | ------ | ---------------------- |  
| title | 标题              |  string | ×     |    |      |
| container | 弹窗容器                   |  string | ×    |  el-dialog   |    el-dialog  el-drawer  dy-page(仿页面容器)     |
| containerProperties | 容器属性                    | Object | ×       |  {}   |   所有属性将绑定到容器组件中  |
| apiPromise | 数据请求方法                    | Function | ×       |     |   接收actionData并返回一个携带data的Promise ，DyVue会将data经过dataAdapter处理后传递给表单，无apiPromise时会将actionData经dataAdapter处理后传递给表单  |
| colNum | 表单列数              |  integer | ×     |  2  |      |
| textMode | 是否文本模式              |  boolean | ×     |  false  |  参[表单组件](../components/form.md)    |
| borderForm | 是否文带边框            |  boolean | ×     |  参默认属性  |  参[表单组件](../components/form.md)    |
| showFoldBtn | 是否带收起按钮            |  boolean | ×     |  参默认属性  |  参[表单组件](../components/form.md)    |
| formProperties | 表单属性            |  Object | ×     |  参默认属性  |  参[表单组件](../components/form.md)    |
| formItemList | 表单字段            |  Array | ×     |   []  |  参[表单组件](../components/form.md)    |
| formDataUpdateHandle | 表单数据变更Hook            |  Function | ×     |      |  参[表单组件](../components/form.md)    |
| saveAction | 保存操作           |  Object | ×     |   参[提交操作](#表单提交)   |      |
| cancelAction | 保存操作           |  Object | ×     |   参[关闭操作](#关闭操作)   |      |
| resetAction | 重置操作           |  Object | ×     |   参[重置操作](#重置操作)   |      |
| actions | 额外操作           |  Array | ×     |  []    |      |



::: demo
``` html
<template>
<ClientOnly>
  <DynamicActions
    :actions="actions"
    :action-data="data"
  ></DynamicActions>
</ClientOnly>
  
</template>
<script>
const fields  =[
  {
    key: "name",                  
    type: "FormInput",           
    label: "姓名",           
    formSection: "基础信息",      
    clearable:true   
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
  },
   {
    key: "cName",
    label: "公司名称",
    formSection: "职业信息",      
  },
  {
    key: "email",
    label: "邮箱",
    formSection: "职业信息",      
  },
    {
    key: "phone",
    label: "公司电话",   
    formSection: "职业信息",      
  }, 
  {
    key: "tip",
    label: "", 
    type:'FormText',  
    formSection: "职业信息",      
    content:'这是一段描述文字',
    wraperProperties:{
      'label-width':'0px'
    }
  }, 
  {
     key :'price',
     type:'FormNumberRange',
     label:'价格区间',
     formSection: "职业信息",      
  },
    
]
 

export default {
  data () {
    return {
      data:{},
      actions: [{
        actionType: 'dialogForm',
        isLoadData: false,
        containerProperties: {
          title: '新增信息',
          width: '60%'
        },
        testTool:true ,                 //调试模式
        formItemList: this.$buildFormFields(fields),                  //表单项列表  由字段生成
        formDataUpdateHandle (formVm, param) {},
        saveAction:{                                // 表单提交操作
          actionType: 'submit',
          label: '提交',
          apiPromise: () => Promise.resolve(),
          callback: {
            closeModal: true,
            showTip: true,
            refresh: true,
            reset: true
          }
        },
        cancelAction: {                         //关闭弹窗操作
          actionType: 'close',
          label: '取消'
        }
      }] ,
    }
  }
}
 
</script>
```
:::
 

### 路由到内容页面
>该操作会打开一个包裹在dy-page的弹窗页面,并改变路由
::: tip 提示
 *路由到内容页面* 配置与*内容弹窗* 配置唯一的不通是新增了一个routerAction配置项 指定路由方式 如 push replace
:::
### 路由到表单页面
>该操作会打开一个包裹在dy-page的弹窗表单,并改变路由
::: tip 提示
 *路由到表单页面* 配置与*表单页面* 配置唯一的不通是新增了一个routerAction配置项 指定路由方式 如 push replace
:::

### 接口请求
该操作会发起一次请求, 需添加一个apiPromise 参数，默认会发起refresh、showTip 回调

#### 操作参数

 | 键               | 意义          | 类型   | 必选 | 默认值 | 备注          |
 | ---------------- | ------------------ | ------ | ---- | ------ | ---------------------- |  
| apiPromise | 请求方法              |  Funtion | ×     |    |      |
| callback |  请求后回调                   |  Object | ×    |  {}   |   支持的回调参     |

::: demo
``` html
<template>
<ClientOnly>

  <DynamicActions
    :actions="actions"
    :action-data="data"
  ></DynamicActions>
</ClientOnly>
  
</template>
<script>
   

export default {
  data () {
    return {
      data:{
          temperature:42
        },
      actions: [{
          label: '请求',
          actionType: 'requestApiAction',
          apiPromise:  requestFunction,
          callback:{
            showTip:true
          }
      }] ,
    }
  }
}

function requestFunction (params) {
  console.log(params)
  return   Promise.resolve( params).then(( res )=>{
          return  {}
      });
  
}
 
</script>
```
:::
 
### 下载文件    download
该操作同 **接口请求**  ，在`apiPromise`中自行实现下载操作  默认会发起showTip 回调

### 表单提交   submit
表单提交操作要求，DynamicActions 组件与 DynamicFormContent 同为兄弟组件，通常配置DynamicForm 或 DynamicFormDialog 使用
该操作配置同 **接口请求**  ，在`apiPromise`中实现提交  默认会发起close，showTip、refresh、reset 回调
 
### 表单重置   reset
该操作与表单提交操作相同要求：DynamicActions 组件与 DynamicFormContent 同为兄弟组件，通常配置DynamicForm 或 DynamicFormDialog 使用
该操作无特别配置，只需要配置需用的通用基本配置
### 弹窗/页面关闭   close
该操作会关闭所在弹窗（el-dialog，el-drawer，dy-page）
该操作无特别配置，只需要配置需用的通用基本配置
### 连接跳转  link
 | 键               | 意义          | 类型   | 必选 | 默认值 | 备注          |
 | ---------------- | ------------------ | ------ | ---- | ------ | ---------------------- |  
| link | 跳转链接              |  string/Funtion | √     |    |  为string时会跳转到该url 为Function时会跳转到Function 返回值   Function会接收actionData为参数  |
| window | 跳转方式              |  string | ×     | _blank   |   实为 window.open 第二个参数   |

### 路由跳转 router
 | 键               | 意义          | 类型   | 必选 | 默认值 | 备注          |
 | ---------------- | ------------------ | ------ | ---- | ------ | ---------------------- |  
| router | 路由地址              |  string/Funtion | √     |    |  为string时会跳转到该路由 为Function时会跳转到Function 返回值   Function会接收actionData为参数  |
| routerAction | 跳转方式              |  string | ×     | push   |   实为 vue-router 跳转方法 push、replace等   |
### 返回  back
 | 键               | 意义          | 类型   | 必选 | 默认值 | 备注          |
 | ---------------- | ------------------ | ------ | ---- | ------ | ---------------------- |  
| backStep | 返回步数              | number | ×     |  1  |    |
### 自定义操作
用户还可以通过指定操作方法(actionHandle)自定义操作
actionHandle为一个函数 参数为actionData

 | 键               | 意义          | 类型   | 必选 | 默认值 | 备注          |
 | ---------------- | ------------------ | ------ | ---- | ------ | ---------------------- |  
| actionHandle | 自定义操作方法              | Function | √      |    |   参数为actionData  |

## 操作回调

制定操作执行完成后，可以制定操作会回调，预定义的回调包括：

 | 键               | 意义          | 类型    | 备注          |
 | ---------------- | ------------------  | ------ | ---------------------- |  
| reset | 重置表单              | boolean     |     |
| refresh | 刷新列表              | string/boolean     |  string 刷新制定列表，true 刷新左右列表   |
| close | 关闭弹窗              | boolean     |     |
| showTip | 弹出提示              | boolean     |      |
| back | 返回              | number     |     |



 




 