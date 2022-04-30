import { selectDictDataInfoApi,elementUploadFileApi } from "./api/global";



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
    key: "distribution",
    label: "分布特点",
    type: 'FormDynamicSelect',
    options: {
      key: 'id',
      value: 'dictValue',
      label: 'dictLabel',
      apiPromise: () => {
        return selectDictDataInfoApi({
          dictType: 'tree_manage_distribution'
        }).then((res) => res.data || [])
      }
    },
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
    options: {
      key: 'id',
      value: 'dictValue',
      label: 'dictLabel',
      apiPromise: () => {
        return selectDictDataInfoApi({
          dictType: 'tree_manage_ownership'
        }).then((res) => res.data || [])
      }
    },
  },
  {
    key: "famousWood",
    type: "FormDynamicSelect",
    label: "名木",
    options: {
      key: 'id',
      value: 'dictValue',
      label: 'dictLabel',
      apiPromise: () => {
        return selectDictDataInfoApi({
          dictType: 'tree_manage_famous_wood'
        }).then((res) => res.data || [])
      }
    },
    tableOption: {
      sort:6
    },
    formOption:{
      rules:['required']
    }
  },
{
  key: "age",
  type: "FormDecimalNumber",
  label: "树龄（年）",
  tableOption: {
    sort:5
  },
  formOption:{
    rules:['required']
  }
},
{
  key: "protectLev",
  type: "FormDynamicSelect",
  label: "保护等级",
  searchable:true,
  options: {
    key: 'id',
    value: 'dictValue',
    label: 'dictLabel',
    apiPromise: () => {
      return selectDictDataInfoApi({
        dictType: 'tree_manage_protect_lev'
      }).then((res) => res.data || [])
    }
  },
  formOption:{
    rules:['required']
  },
  tableOption: {
    sort:8
  },
},
{
  key: "treeHigh",
  type: "FormDecimalNumber",
  label: "树高（米）",
  formOption:{
    rules:['required']
  }
},
{
  key: "crownWidth",
  type: "FormDecimalNumber",
  label: "平均冠幅(米)",
  formOption:{
    rules:['required']
  }
},
{
  key: "bust",
  type: "FormDecimalNumber",
  label: "胸（地）围(厘米)",
  formOption:{
    rules:['required']
  }
},
{
  key: "crownWidthNorthSouth",
  type: "FormDecimalNumber",
  label: "冠幅-南北向(米)",
  formOption:{
   
  }
},
{
  key: "crownWidthEastWest",
  type: "FormDecimalNumber",
  label: "冠幅- 东西向(米)",
  formOption:{
   
  }
},
{
  key: "treeDesc",
  type: "FormTextarea",
  label: "树木奇特性状描述",
  formOption:{
    wraperProperties: {
      class: ['grid-col-12']
    },
  }
},
{
  key: "district",
  type: "FormAdministrativeSelector",
  formSection:'地理位置',
  label: "行政区划",
  searchable:true,
  tableOption: {
    width: 180,
    sort:9,
    sortable: false,
    template (row) {
      return row.admName
    }
  },
  formOption:{
    rules:['required']
  }
},

 
{
  label: '详细地址',
  formSection:'地理位置',
  key: 'address',
  type: 'FormSelectPoint',
  formOption: {
    rules: ['required'],
    properties: {},
    valueLink: {
      '@*any*@': [
        {
          linkKey: 'lonLat',
          linkValue: function (data) {
            return data.formattedAddress
          }
        }
      ]
    }
  }
},
{
  label: '经纬度',
  key: 'lonLat',
  formSection:'地理位置',
  formOption: {
    properties: {
      disabled: true
    }
  }
},

// {
//   key: "growingPlace",
//   type: "FormDynamicSelect",
//   label: "生长场所",
//   formSection:'地理位置',
//   options: {
//     key: 'id',
//     value: 'dictValue',
//     label: 'dictLabel',
//     apiPromise: () => {
//       return selectDictDataInfoApi({
//         dictType: 'tree_manage_growing_place'
//       }).then((res) => res.data || [])
//     }
//   },
//   formOption:{
//   },
 
// },

{
  key: "growingPlace",
  type: "FormDynamicSelect",
  formSection:'地理位置',
  label: "生长场所",
  options: {
    key: 'id',
    value: 'dictValue',
    label: 'dictLabel',
    apiPromise: () => {
      return selectDictDataInfoApi({
        dictType: 'tree_manage_growing_place'
      }).then((res) => res.data || [])
    }
  },
  formOption:{
  },
 
},
{
  key: "slope",
  type: "FormDecimalNumber",
  formSection:'地理位置',
  label: "坡度(度)",
  formOption:{
  },
 
},
{
  key: "slopeDirection",
  type: "FormDecimalNumber",
  formSection:'地理位置',
  label: "坡向",
  formOption:{
  },
 
},

{
  key: "altitude",
  type: "FormDecimalNumber",
  formSection:'地理位置',
  label: "海拔(米)",
  formOption:{
  },
},
{
  key: "slopePosition",
  type: "FormDecimalNumber",
  formSection:'地理位置',
  label: "坡位",
  formOption:{
  },
},


{
  key: "growthSituation",
  type: "FormDynamicSelect",
  formSection:'生长信息',
  label: "生长态势",
  searchable:true,
  options: {
    key: 'id',
    value: 'dictValue',
    label: 'dictLabel',
    apiPromise: () => {
      return selectDictDataInfoApi({
        dictType: 'tree_manage_growth_situation'
      }).then((res) => res.data || [])
    }
  },
  formOption:{
    rules:['required']
  },
  tableOption:{
    sort:10
  }
},


{
  key: "growthStatus",
  type: "FormDynamicSelect",
  formSection:'生长信息',
  label: "生长现状",
  options: {
    key: 'id',
    value: 'dictValue',
    label: 'dictLabel',
    apiPromise: () => {
      return selectDictDataInfoApi({
        dictType: 'tree_manage_growth_status'
      }).then((res) => res.data || [])
    }
  },
  formOption:{
  },
 
},

{
  key: "growthEnvironment",
  type: "FormDynamicSelect",
  formSection:'生长信息',
  label: "生长环境",
  options: {
    key: 'id',
    value: 'dictValue',
    label: 'dictLabel',
    apiPromise: () => {
      return selectDictDataInfoApi({
        dictType: 'tree_manage_growth_environment'
      }).then((res) => res.data || [])
    }
  },
  formOption:{
    rules:['required']
  },
 
},
{
  key: "soilType",
  type: "FormInput",
  formSection:'生长信息',
  label: "土壤类型",
  formOption:{

  },
},
{
  key: "soilThickness",
  type: "FormDecimalNumber",
  formSection:'生长信息',
  label: "土层厚度（厘米）",
  formOption:{
  },
},


{
  key: "unit",
  type: "FormInnerOrgSelector",
  formSection:'管理信息',
  label: "管理单位",
  formOption:{
    rules: ['required']
  },
},
{
  key: 'manageUser',
  type: 'FormInnerOrgSelPersonSelector',
  label: '管理人',
  formSection: '管理信息',
  tableOption: {
    sort: 8,
    width: 180
  },
  formOption: {
    // 验证规则单独存放
    rules: ['required'],
    valueLink:{
      '@*any*@': [
        {
          linkKey: 'manageUserPhone',
          linkValue: function (data) {
            return data[0].phoneNum
          }
        }
      ]
    }
  }
},
{
  key: 'manageUserPhone',
  type: 'FormInput',
  label: '管理人电话',
  formSection: '管理信息',
  formOption: {
    rules: ['required', /^[\d|-]{9,12}$/],
    properties: {
      disabled:true
    }
  },

},
{
  key: 'maintenanceDesc',
  type: 'FormTextarea',
  label: '管养方案',
  formSection: '管理信息',
  formOption: {
    wraperProperties:{
      class:['grid-col-12']
    },
    rules: [ ],
 
  },

},
{
  key: 'files',
  label: '附件',
  type: 'FormUpload',
  formSection:'管理信息',
  formOption: {
    wraperProperties: {
      class: ['grid-col-12']
    },
    properties: {
      // disabled: true,
      // 'list-type': 'table',
      apiPromise: elementUploadFileApi
    },
    extra: {
      btn_text: '上传',
      tip: '单个附件大小限制20Mb，最多上传200个附件'
    }
  }
},

















   
  
    
  
];