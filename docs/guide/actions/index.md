# 操作-DynamicActions
## 简介
   如果整体配置是大脑,组件是血肉,那么操作(action)就是筋骨,将全身肌体串联起来,在配置的驱动下实现页面交互功能
   Dy-Vue提供了丰富多样的交互类型,合理配置能实现功能复杂的页面交互
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



## 关联功能
- 操作会携带页面相关数据
  - 上方操作栏支持获取搜索栏数据(导出)和列表中选择的数据
  - 列表右侧操作栏支持获取当前行数据
  - 通常弹窗类操作/请求类操作/路由类操作才需要携带数据
- 操作出发时支持弹出poper层提示
- 请求/下载等操作发起后支持多种回调
  -  reset      重置表单
  -  refresh    刷新列表
  -  emitEvent  发起事件 
  -  closeModal 关闭弹窗 
  -  close      关闭弹窗 
  -  showTip    弹出提示


### 内容弹窗
>该操作会弹出一个包含可自定义内容的弹窗
>自定义内容布局方式支持Grid和tab 暂不支持多级嵌套
>弹窗容器支持 dialog  drawer  dy-page(仿页面容器)
``` json
{
  component: 'el-button',   //操作触发组件  默认按钮
  label: '',                //操作出发组件文字
  actionType: 'dialogPage',   //操作类型
  isLoadData: true,          //是否加载数据
  sort: 100,                 //排序       
  properties: {              //操作触发组件属性
    type: 'default',
    size: 'small',
    key: ''
  },
  permission: '',            //操作权限
  dialog: {                  //弹窗配置
    properties: {            //弹窗属性
      title: ''
    },
    container: 'dy-page',    //弹窗容器
    layout: 'LayoutGrid',    //弹窗内布局  默认网格
    // layout:{
    //   name:'LayoutTabs',
    //   properties:{
    //       type:"card",
    //   }
    // },
    body: [                           //弹窗内容
       {
                  component: 'planForm',      // 组件
                  name: '@object@',           //组件数据名     @object@ 会获取操作携带的所有数据  也可指定键名
                  props: {                    //弹窗属性 
                    class: ['grid-col-24']     
                  }
                }
    ]                 
  }
}
```

### 表单弹窗
>该操作会弹出一个包含动态表单的弹窗
>弹窗容器支持 dialog  drawer  dy-page(仿页面容器)
>
``` json
{
 component: 'el-button',
  label: '',
  actionType: 'dialogForm',
  permission: '',
  isLoadData: true,
  sort: 100,
  properties: {
    type: 'primary',
    size: 'small',
    key: ''
  },
  dialog:{
    container: 'el-dialog',
  properties: {
    title: '',
    width: '60%'
  },
  body: {
    props: {                         //动态表单属性
       formProperties: {             //form 组件属性
      'hide-required-asterisk': false,
      'label-width': '100px',
      'label-position': 'top'
    },
    borderForm: false,                 //是否带边框
    showFoldBtn: true,                 //是否显示折叠按钮
    showTestTool:true                  //调试模式
    },
    formItemList: [],                  //表单项列表  由字段生成
    data: {},            
    formDataUpdateHandle (formVm, param) {},
    actions: {                             //表单内操作
      save{                                // 表单提交操作
        component: 'el-button',
        permission: '',
        actionType: 'submit',
        isLoadData: false,
        label: '提交',
        apiPromise: () => Promise.resolve(),
        properties: {
          type: 'primary',
          size: 'small'
        },
        callback: {
          closeModal: true,
          showTip: true,
          refresh: true,
          reset: true
        }
      },
      cancel: {                         //关闭弹窗操作
        component: 'el-button',     
        properties: {
          type: 'default',
          size: 'small'
        },
        actionType: 'close',
        label: '取消'
      }
    }
  }
  }
}
```

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
该操作会发起一次请求
### 下载文件

### 表单提交
### 表单重置

### 弹窗/页面关闭

### 连接跳转
### 路由跳转

### 自定义操作
用户还可以通过指定操作方法(actionHandle)自定义操作
actionHandle为一个函数 参数有当前操作数据





 