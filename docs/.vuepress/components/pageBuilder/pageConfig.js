 
export default `
 const title='chakan';

 //以下为配置
  ( 
    {
      apiPromises:{
        create: saveApi,
        bulkdelete: deleteApi,

        detail: detailApi,
        update: updateApi,
      },
      pageOptions:{
  "searchOption":{},
 
    "topToolBar":{
      
    },
    "tableUp":{
     
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
          "title": title,
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
              "apiPromise": detailApi,
                "formItemList": formFields,
  
              "formOption": {
                textMode:true,
                "borderForm": false,
                "formProperties": {
                  "label-position": "right",
                },
              },
            },
          },
          {
              "component": 'DynamicForm',
            "label": "管理信息",
            "props":   {
              "apiPromise": detailApi,
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

 
}

})`;

 