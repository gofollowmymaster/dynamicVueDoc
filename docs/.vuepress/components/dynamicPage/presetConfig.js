export const searchForm = {
  properties: {
    'label-width': '80px',
    'label-position': 'right'
  },
  showTestTool: true,
  borderForm: false,
  trigger:'click',
  resetable:true,
}
export const tableOption = {
  dataList: [],
  properties: {
    stripe: true,
    border: true,
    'row-class-name': '',
    // height: "250",
    // "max-height": "250",
    'highlight-current-row': true,
    selectable: true,
    expand: true,
    'show-header': true,
    'empty-text': '暂无数据',
    align: 'center',
    'header-align': 'center',
    'row-style': { height: '40px' }
  },
    colOptions: {
    // width:120,
    minWidth: 60,
    'show-overflow-tooltip': true
  }

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

export const treeOptions = {
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
  showTestTool: true
}

export const dialogFormOption = {
  title: '',
  width: '70%',
  body: {
    container:"el-dialog",
    props: formOption,
    formItemList: [],
    data: {},
    formDataUpdateHandle (formVm, param) {},
    btns: {
      save: {
        actionType: 'submit',
        label: '保存',
        apiPromise: ()=>Promise.resolve(),
        properties: {
          type: 'primary'
        },
        callback: {
          closeModal: true,
          showTip: true,
          emitEvent:'formSubmited'
        }
      },
      cancel: {
        actionType: 'close',
        label: '取消'
      }
    }
  }
}
