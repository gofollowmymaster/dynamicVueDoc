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
  hasCheckbox: true,
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
  showTestTool: true,
  textModel:false
}

export const DynamicForm={
 
    class:["grid-col-24"],
    apiPromise:  ()=>Promise.resolve(),
    data:{},
    formOption ,
    formItemList: [],       

    actions: {
      //  save:null,
      cancel: {
        actionType: 'close',
        label: '取消'
      }
    }
  
}

export const dialogFormOption = {
  
  container:"el-dialog",
  properties:{
    title: '',
    width: '70%',
  },
  body: {
    props: formOption,
    formItemList: [],
    data: {},
    formDataUpdateHandle (formVm, param) {},
    actions: {
      save: {
        component: 'el-button',
        permission:"",
        actionType: 'submit',
        label: '保存',
        isloadData: false,
        apiPromise: ()=>Promise.resolve(),
        properties: {
          type: 'primary',
          size:'mini'
        },
        callback: {
          closeModal: true,
          showTip: true,
          refresh:true,
        }
      },
      cancel: {
        component: 'el-button',
        isloadData: false,
        properties: {
          type: 'default',
          size:'small'
        },
        actionType: 'close',
        label: '取消'
      }
    }
  }
}
export const dialogPageActionOption={
  component: 'el-button',
  label: '',
  actionType: 'dialogPage',
  properties: {
    type: 'default',
    size:'small',
    key: '' 
  },
  permission:'',
  dialog: {
    properties:{
      title: '',
    },
    container:"dy-page",
    layout:'LayoutGrid',
    // layout:{
    //   name:'LayoutTabs',
    //   properties:{
    //       type:"card",
    //   }
    // },
    body: [
     
    ]
  }
}

export const dialogFormActionOption={
  component: 'el-button',
  label: '',
  actionType: 'dialogForm',
  permission:"",
  isloadData: true,
  properties: {
    type: 'primary',
    size:'small',
    key: ''
  },
  dialog: dialogFormOption,
}

export const requestApiActionOption={
  component: 'el-button',
  label: '',
  permission:"",
  actionType: 'requestApi',
  properties: {
    type: 'default',
    size:'small'
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
    refresh:true
  }
}
export default {
  searchForm,tableOption,pagination,treeOption,formOption,DynamicForm,
  dialogFormOption,dialogPageActionOption,dialogFormActionOption,requestApiActionOption
}

