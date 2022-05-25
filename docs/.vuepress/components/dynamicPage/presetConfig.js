import {appendToPreset, deepMerge} from "./utils/tool"
const isDebug=window._config?.isDebug
const showTestTool=process.env.NODE_ENV == 'development'?true:isDebug
export const searchOption = {
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
export const tableOption = {
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
    'row-style': { height: '36px' },
    'row-key': 'id'
  },
  colOptions: {
    // width:120,
    minWidth: 60,
    'show-overflow-tooltip': true,
    align: 'center',
    'header-align': 'center'
  },
  // loadListApi: this.apiPromises.list,
  // lineActions: {
  //   update: updateOptions,
  //   detail: detailOptions,
  //   delete: deleteOptions
  // }

  // style: "width: 100%",
}

export const pagination = {
  small: false,
  'current-page': 1,
  pageSize: 10,
  layout: 'total,sizes, prev, pager, next, jumper',
  'hide-on-single-page': true,
  'page-sizes': [10, 20, 30, 40, 50]
  // background:true
}

export const treeOption = {
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

export const formOption = {
  formProperties: {
    'hide-required-asterisk': false,
    'label-width': '100px',
    'label-position': 'top'
  },
  borderForm: false,
  showFoldBtn: true,
  showTestTool
}

export const submitActionOption = {
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
export const DynamicFormOption = {
  class: ['grid-col-24'],
  // apiPromise: () => Promise.resolve(),
  apiPromise: null,

  formItemList: [],
  formOption: {
    ...formOption,
    textModel: false
  },
  actions: {
    save: deepMerge(submitActionOption, {
      label: '保存'
    }),
    cancel: {
      actionType: 'close',
      label: '取消'
    }
  }
}


export const dialogFormOption = {
  container: 'el-dialog',
  properties: {
    title: '',
    width: '60%'
  },
  body: {
    props: formOption,
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

export const dialogPageActionOption = {
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

export const routerDialogPageActionOption = deepMerge(dialogPageActionOption, {
  actionType: 'routerDialogPage',
  routerAction: 'push',
  router: '', // String  or function
  sort: 100
})

export const dialogFormActionOption = {
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
  dialog: dialogFormOption
}

export const routerDialogFormActionOption = deepMerge(dialogFormActionOption, {
  actionType: 'routerDialogForm',
  routerAction: 'push',
  router: '',
  dialog: {
    container: 'dy-page',
    body: {
      actions: {}
    }
  }
})

export const requestApiActionOption = {
  component: 'el-button',
  label: '',
  permission: '',
  sort: 100,
  actionType: 'requestApi',
  properties: {
    type: 'default',
    size: 'small'
  },
  popconfirm: {
    'confirm-button-text': '好的',
    'cancel-button-text': '不用了',
    title: '确定执行该操作吗？',
    icon: 'el-icon-warning'
  },
  apiPromise: () => Promise.resolve(),
  callback: {
    showTip: true,
    refresh: true
  }
}

export const downloadActionOption = {
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


 


export const dynamicCurdPageOptions={
  searchOption,
  treeOption,
  pagination,
  searchFields: [],
  tableFields: [],
  topToolBar: {
    create: deepMerge(dialogFormActionOption, {
      label: '新增',
      permission: '新增',
      sort: 50,
      isLoadData: false,
      dialog: {
        properties: {
          title: '新增',
          width: '60%'
        }
      }
    }),
    bulkdelete: deepMerge(requestApiActionOption, {
      label: '批量删除',
      permission: '批量删除',
      popconfirm: {
        title: '确定删除选择的信息吗？'
      }
    })
  },
  searchFields: [],
  tableFields: [],
  listOption: {
    ...tableOption,
    'current-change': 'handleCurrentChange', // 事件 暂不支持
    lineActions: {
      update: deepMerge(dialogFormActionOption, {
        label: '更新',
        permission: '更新',
        dialog: {
          properties: {
            title: '新增',
            width: '60%'
          }
        }
      }),
      detail: deepMerge(dialogFormActionOption, {
        label: '查看',
        permission: '查看',
        dialog: {
          properties: {
            title: '详情'
          },
          body: {
            props: {
              textModel: true
            },
            formItemList: [],
            actions: {
              save: null
            }
          }
        }
      }),
      delete: deepMerge(requestApiActionOption, {
        label: '删除',
        permission: '删除'
      })
    }
  }
}
export const dynamicCurdOption = {
  fields: [],
  entityLabel: '',
  isDebuggerMode: false,

  optionsProps: dynamicCurdPageOptions
}

export const routerActionOption = {
  component: 'el-button',
  label: '',
  permission: '',
  actionType: 'router',
  sort: 100,
  properties: {
    type: 'default',
    size: 'small'
  },
  router: '',
  routerAction: 'push'
}
export default {
  searchOption,tableOption,pagination,treeOption,formOption,DynamicFormOption,
  dialogFormOption,dialogPageActionOption,dialogFormActionOption,requestApiActionOption,
  dynamicCurdOption,routerActionOption,dynamicCurdPageOptions,downloadActionOption,
  routerDialogPageActionOption,routerDialogFormActionOption,submitActionOption

}
