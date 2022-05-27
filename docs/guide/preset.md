# 预定义配置信息
## 配置详情
### 搜索配置选项
``` json
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
      textModel:false
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
### 表单弹窗配置
``` js
{
  container: 'el-dialog',
  properties: {
    title: '',
    width: '60%'
  },
  body: {
    props: {
      formProperties: {
        'hide-required-asterisk': false,
        'label-width': '100px',
        'label-position': 'top'
      },
      borderForm: false,
      showFoldBtn: true,
      showTestTool
    },
    formItemList: [],
    data: {},
    formDataUpdateHandle (formVm, param) {},
    actions: {
      save: deepMerge(submitActionOption, {
        label: '保存'
      }),
      cancel: {
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
```

### 表单弹窗操作配置
``` json
{
  component: 'el-button',
  label: '',
  actionType: 'dialogForm',
  permission: '',
  isLoadData: true,
  sort: 100,
  properties: {
    type: 'detault',
    size: 'small',
    key: ''
  },
  dialog: dialogFormOption
}
```

### dialogPageActionOption
``` json
{
  component: 'el-button',
  label: '',
  actionType: 'dialogPage',
  isLoadData: true,
  sort: 100,
  properties: {
    type: 'default',
    size: 'small',
    key: ''
  },
  permission: '',
  dialog: {
    properties: {
      title: ''
    },
    container: 'dy-page',
    layout: 'LayoutGrid',
    // layout:{
    //   name:'LayoutTabs',
    //   properties:{
    //       type:"card",
    //   }
    // },
    body: []
  }
}
```

### 请求操作配置

``` js
{
  component: 'el-button',
  label: '',
  permission: '',
  sort: 100,
  actionType: 'requestApi',
  properties: {
    type: 'default',
    size: 'small'
  },
  actionPop: {
    component:'popConfirm',
    properties:{
      'confirm-button-text': '好的',
      'cancel-button-text': '不用了',
      title: '确定执行该操作吗？',
      icon: 'el-icon-warning'
    }
  
  },
  apiPromise: () => Promise.resolve(),
  callback: {
    showTip: true,
    refresh: true
  }
}
```



### 下载操作配置

``` js
{
  component: 'el-button',
  label: '',
  permission: '',
  sort: 100,
  actionType: 'download',
  properties: {
    type: 'default',
    size: 'small'
  },

  apiPromise: () => Promise.resolve(),
  callback: {
    showTip: true
  }
}
```

### 提交操作配置
``` js
{
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
}
```


### 分页配置
``` js
 {
  small: false,
  'current-page': 1,
  pageSize: 10,
  layout: 'total,sizes, prev, pager, next, jumper',
  'hide-on-single-page': true,
  'page-sizes': [10, 20, 30, 40, 50]
  // background:true
}
```


### tree配置
``` js
{
  load:()=>Promis.reslove({})
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
<!-- 
| listOption  | 列表选项配置 |  [listOption](./preset#列表选项配置)  |
| DynamicFormOption  | 动态表单配置 |  [DynamicFormOption](./preset#动态表单配置)  | 
| dialogFormOption  | 表单弹窗配置 |  [dialogFormOption](./preset#表单弹窗配置)  | grid-offset-sm-* |
| dialogFormActionOption  | 表单弹窗操作配置 |  [dialogFormActionOption](./preset#表单弹窗操作配置)  | grid-offset-sm-* |
| dialogPageActionOption  | 内容弹窗操作配置 |  [dialogPageActionOption](./preset#内容弹窗操作配置)  | grid-offset-sm-* |
| requestApiActionOption  | 请求操作配置 |  [requestApiActionOption](./preset#请求操作配置)  | grid-offset-sm-* |
| downloadActionOption  | 下载操作配置 |  [downloadActionOption](./preset#下载操作配置)  | grid-offset-sm-* |
| submitActionOption  | 提交操作配置 |  [submitActionOption](./preset#提交操作配置)  | grid-offset-sm-* |
| routerDialogFormActionOption  | 表单页面操作配置 |  [routerDialogFormActionOption](./preset#表单页面操作配置)  | grid-offset-sm-* |
| routerDialogPageActionOption  | 内容页面操作配置 |  [routerDialogPageActionOption](./preset#内容页面操作配置)  | grid-offset-sm-* |
| routerActionOption  | 路由操作配置 |  [routerActionOption](./preset#路由操作配置)  | grid-offset-sm-* |
| pagination  | 分页配置  |  [pagination](./preset#分页配置) | grid-offset-xs-* |
| treeOption  | tree配置  |  [pagination](./preset#树配置) | grid-offset-pp-* | -->

 