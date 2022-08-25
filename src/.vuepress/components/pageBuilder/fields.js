// import { buildDynamicSelectOption,elementUploadFileApi } from "../api/global.js";
// import request from '../api/request'
 

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



export default `[
	{
		"key": "keyWord",
		"type": "FormInput",
		"label": "关键字",
		"searchOption": true
	},
	{
		"key": "ownership",
		"type": "FormSelect",
		"options": [
			{
				"value": 1,
				"label": "11"
			},
			{
				"value": 2,
				"label": "22"
			},
			{
				"value": 3,
				"label": "33"
			},
		],
		"label": "属性",
		"tableOption": {
			"sort": 3
		},
		"formOption": {
			"changeHandle":(data,vm)=> {
				debugger
				vm.updateFormData({
					ownership2:data + 1
				})
			}
		}
	},
	{
		"key": "sciName",
		"type": "FormInput",
		"label": "学名",
		"formOption": {
			"expressProp":{
				"disabled": "#{ownership}==1" 
			}
		},
		"tableOption": {
			"sort": 2
		}
	},
	{
		"key": "latinSciName",
		"type": "FormInput",
		"label": "拉丁学名",
		"formOption": {
			"expressProp":{
				"required": "#{ownership}==2" 
			}
		}
	},
	{
		"key": "ownership1",
		"type": "FormInput",
		"label": "属性1",
		"options": [
			{
				"value": 1,
				"label": "11"
			},
			{
				"value": 2,
				"label": "22"
			},
      		{
				"value": 3,
				"label": "33"
			},
      		{
				"value": 4,
				"label": "44"
			}
		],
		"formOption": {
			"expressProp":{
				"value": "2*(#{ownership}||0) +''+ (#{sciName}||'')" 
			}
    	},
		"tableOption": {
			"sort": 3
		}
	},
	{
		"key": "investNumber",
		"type": "FormNumber",
		"label": "调查顺序号",
		formSection:"其他信息",
		"formOption": {
			"expressProp":{
				"hidden": "#{ownership}!=3" 
			}
		}
	},
	{
		"key": "ownership2",
		"type": "FormRadio",
		"label": "属性2",
		formSection:"其他信息",
		"options": [
			{
				"value": 1,
				"label": "11"
			},
			{
				"value": 2,
				"label": "22"
			},
      		{
				"value": 3,
				"label": "33"
			},
      		{
				"value": 4,
				"label": "44"
			}
		],
		"tableOption": {
			"sort": 3
		},
		"formOption": true
	}
]`;