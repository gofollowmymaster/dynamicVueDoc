# 预定义配置信息
::: tip 
为了简化配置,快速上手.Dy-Vue 预定义了大量组建/操作配置可以满足大部分常规需求,不过您也可以自由的定义自己的配置,使用appendToPreset方法将会吧您自定义的配置与预定义配置深度合并
:::

| 配置名 | 含义 | 默认值 |
| ------ | ---- | ------ |
| searchOption                 | 搜索配置选项     | [searchOption](./preset#搜索配置选项)                     |
| tableOption                 | 表格配置选项     | [tableOption](./preset#表格配置选项)                     |
| dynamicFormOption            | 动态表单配置     | [DynamicFormOption](./preset#动态表单配置)                |
| pagination                   | 分页配置         | [pagination](./preset#分页配置)                           |
| treeOption                  | tree配置         | [pagination](./preset#树配置)                             |
| formOption                  | 表单配置         | [formOption](./preset#表单配置)                             |
| popTipOptions                  | 操作气泡提醒         | [pagination](./preset#操作气泡提醒配置)                             |
| msgBoxTipOptions                  | 操作消息提醒         | [msgBoxTipOptions](./preset#操作消息提醒配置)             |
| actionTip                  | 操作提醒方式         |     可选 pop msg          |
| baseFormSectionName                  | 基础表单区块信息名         |       基础信息       |
| dialogWidth                  | 弹窗默认宽度         |   50%         |
| btnSize                  | 按钮尺寸         |  small            |
| isDebug                  | 是否调试模式（快速填充表单）         |  true            |
| mainKey                  | 数据主键         |  id            |
| defaultDialogMode                  | 弹窗类型         |  dialog  drawer  router            |





<!--      
    tinymceLanguageUrl: '/dyvue2-admin/static/tinymce/langs/zh_CN.js',
    tinymceSkinUrl: '/dyvue2-admin/static/tinymce/skins/ui/oxide',
    amapWebKey,
    amapWebMapKey,
    mapCenter: [106.680603, 29.402348],
    tandiMapKey,
    amapStyleConfig,
    regionCode: '500103000000',
      -->


<!--     
 
        formWraperClass: ['grid-col-xs-24', 'grid-col-pp-24'],
        detailWraperClass: ['grid-col-xs-24', 'grid-col-pp-24'],
        searchFormWraperClass: [
            'grid-col-sm-8',
            'grid-col-ss-8',
            'grid-col-xs-12',
            'grid-col-pp-24'
        ] -->
## 配置详情
### 搜索配置选项

``` js
{
   properties: {
        'label-width': '108px',       
        'label-position': 'right',
        size: 'small'
    },
    borderForm: false,      
    trigger: 'click',
    resetable: true,
    searchLabel: '搜索',
    searchClasses: [
        'grid-col-sm-6',
        'grid-col-ss-8',
        'grid-col-xs-12'
    ],
    mainNum: 3,
    testTool: false
}
```
### 表格配置
``` js
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
      align: 'left',
      'row-key': 'id',
      'header-align': 'left',
      'row-style': { height: '48px' },
      // 'cell-style' :{padding:'4px 8px'},
      'header-row-style': { height: '48px', 'line-height': '48px', padding: '0px 8px' },
      'header-cell-style': { 'text-overflow': 'ellipsis', padding: '0px 0px 0px 0px', height: '36px', 'line-height': '36px' }
  },
  colOptions: {
  // width:120,
      minWidth: 90,
      'show-overflow-tooltip': true,
      align: 'left',
      'header-align': 'left'
  },
  actionColWidth: 0, // 操作栏宽度
  actionBtnType: 'text', // 操作按钮类型
  indexCol: {
      width: 48,
      fixed: 'left',
      label: '序号',
  }
}
```

### 表单配置

``` js
{
    formProperties: {
      'hide-required-asterisk': false,
      'label-position': 'right',
      'label-width': '130px'
    },
    borderForm: true,
    showFoldBtn: true,
    'label-width': '130px',
    'label-position': 'right',
    pageLabelWidth: '160px',
    colNum: 2

}

```
### 动态表单配置
``` json
{
  class: ['grid-col-24'],
  // apiPromise: () => Promise.resolve(),
  apiPromise: null,

  formItemList: [],
  formOption:{
      formProperties: {
        'hide-required-asterisk': false,
        'label-width': '100px',
        'label-position': 'top'
      },
      borderForm: false,
      showFoldBtn: true,
      showTestTool:true,
      textMode:false
    },
  actions: {
    save:{
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
    cancel: {
      actionType: 'close',
      label: '取消'
    }
  }
}

```
### 分页配置
``` js
{
  small: false,
  'current-page': 1,
  pageSize: 10,
  layout: 'total,sizes, prev, pager, next, jumper',
  'hide-on-single-page': false,
  'page-sizes': [10, 20, 30, 40, 50]
}
```

### 树配置
``` js
{
  lazy: true,
    'node-key': 'deptId',
    props: {
        label: 'deptName',
        children: 'children',
        isLeaf: 'leaf'
    },
    'current-node-key': null,
    'highlight-current': true,
    fieldName: 'test'
}
```

### 操作气泡提醒配置
``` js
 {
    actionPopComponent: 'popConfirm',
    actionPopProperties: {
        'confirm-button-text': '确定',
        'cancel-button-text': '取消',
        title: '确定执行该操作吗？',
        icon: 'el-icon-warning'
    }
}
```
### 操作消息提醒配置
``` js
 {
    title: '提示',
    message: '确定执行该操作吗？',
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    lockScroll: true
}
```
 