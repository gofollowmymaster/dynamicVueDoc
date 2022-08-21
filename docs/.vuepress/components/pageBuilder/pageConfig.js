 
export default `({
  "searchOption":{},
 
    "topToolBar":{
      
    },
    "tableUp":{
      "component":"DyTmpl",
      "properties":{
        "tmpl":"总数量:<span class='text-blue py4 px4'>#{num}</span>,总数量1:<span class='text-red py4 px4'>#{num1}</span>",
        "data":{
         "num":123254,
          "num1":5546,
        }
      }
    },
    
   "listOption": {
    "lineActions": {
      "detail": null,
      "aview":  {
        "actionType":'dialogPageActionOption',
        "sort": 1,
        "label": "查看",
        "permission": "查看",
        "containerProperties": {
          "title": "查看",
        },
        "layout":  "LayoutTabs",
        "layoutProperties": {
          "type": "card",
        },
      
        "body": [
            {
              "component": 'DynamicForm',
            "label": "基本信息",
            "props":  {
              "apiPromise": oldtreeDetailApi,
                "formItemList": formFields,
  
              "formOption": {
                textMode:true,
                "borderForm": false,
                "formProperties": {
                  "label-position": "left",
                },
              },
            },
          },
          {
              "component": 'DynamicForm',
            "label": "管理信息",
            "props":   {
              "apiPromise": oldtreeDetailApi,
                "formItemList": formFields,
  
              "formOption": {
                "borderForm": false,
                "formProperties": {
                  "label-position": "right",
                },
              },
            },
          },
  
          {
            "component": "div",
            "name": "@object@",
            "label": "信息详情3",
            "children": [
              {
                "component": "DyTmpl",
                "props": {
                  "tmpl": "test",
                },
              },
            ],
          },
        ],
      },
  
    },
  }

 


})`;

 