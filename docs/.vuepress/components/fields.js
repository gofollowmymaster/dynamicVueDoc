// import { selectDictDataInfoApi,elementUploadFileApi } from "./api/global.js";



export default [
  { key: "keyWord", type: "FormInput", label: "关键字", searchable: true },
  {
    key: "treeNameId",
    type: "FormSelectTreeSpecies",
    label: "树种名称",
    tableOption: {
      width: 180,
      sort:2
    },
    formOption: {
      rules: [
        'required'
      ],
      valueLink:{
        '@*any*@': [
          {
            linkKey: 'sciName',
            linkValue: function (data) {
              debugger
              return data[0].sciName
            }
          },
          {
            linkKey: 'latinSciName',
            linkValue: function (data) {
              debugger
              return data[0].sciName
            }
          }
        ]
      }
    },
  },
  
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
    type: "FormDynamicSelect",
    label: "权属",
    tableOption: {
      sort:3
    }, 
  }

















   
  
    
  
];