// import { buildDynamicSelectOption,elementUploadFileApi } from "../api/global.js";

export function buildDynamicSelectOption(dictType){

  return {
    key: 'id',
    value: 'value',
    label: 'label',
    apiPromise: () => {
      debugger
      return Promise.resolve([{
        value:1,
        label:'11',
        id:1
      },
      {
        value:2,
        label:'22',
        id:2

      }])
    }
  }
}



export default [
  { key: "keyWord", type: "FormInput", label: "关键字", searchable: true },
   
  
  {
    key: "sciName",
    type: "FormInput",
    label: "学名",
    formOption: {
      properties:{
        disabled:true
      }
    },
    tableOption: {
      sort:2
    },
  },
  {
    key: "latinSciName",
    type: "FormInput",
    label: "拉丁学名",
    formOption: {
      properties:{
        disabled:true
      }
    },
  },
  {
    key: "originalTreeNumber",
    type: "FormInput",
    label: "原古树名木编号",   
    formOption: {
    },
  }, 
  {
    key: "investNumber",
    type: "FormIntNumber",
    label: "调查顺序号",
    formOption:{
    }
  },
  {
    key: "ownership",
    type: "FormSelect",
    options:[
      {
        value:1,
        label:'11'
      },
      {
        value:2,
        label:'22'
      },
    ],
    label: "权属",
    tableOption: {
      sort:3
    }, 
    formOption:{
      valueLink: {
        '@*any*@': [
          {
            linkKey: 'ownership2',
            linkValue: function (data) {
              console.log('-------data-------',data)
              return data
            },
            linkDisable:false
          }
        ]
      }
    }
  },
  {
    key: "ownership1",
    type: "FormSelect",
    label: "权属1",
    options:[
      {
        value:1,
        label:'11'
      },
      {
        value:2,
        label:'22'
      },
    ],
    formable:true,
    tableOption: {
      sort:3
    }, 
  },
  {
    key: "ownership2",
    type: "FormDynamicSelect",
    label: "权属2",
    // options:[
    //   {
    //     value:1,
    //     label:'11'
    //   },
    //   {
    //     value:2,
    //     label:'22'
    //   },
    // ],
    options:  buildDynamicSelectOption('tree_manage_distribution'), 
    tableOption: {
      sort:3
    }, 
    formable:true,

  }

















   
  
    
  
];