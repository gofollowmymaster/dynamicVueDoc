// import { selectDictDataInfoApi,elementUploadFileApi } from "./api/global.js";



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
    label: "原实体编号",   
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
    label: "属性",
    tableOption: {
      sort:3
    }, 
  },
  {
    key: "ownership1",
    type: "FormDynamicSelect",
    label: "属性1",
    tableOption: {
      sort:3
    }, 
  },
  {
    key: "ownership2",
    type: "FormDynamicSelect",
    label: "属性2",
    tableOption: {
      sort:3
    }, 
  }

















   
  
    
  
];