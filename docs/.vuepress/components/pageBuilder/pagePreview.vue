<template>
  <DynamicCurdPage
  class="page-wraper"
    :entityLabel="entityLabel"
    :fields="fields"
    :pageOptionsprops="pageOptions"
    :apiPromises="apiPromises"
  ></DynamicCurdPage>
</template>
<script>
import { buildTableFields } from "../dynamicPage/utils/tool";
const entityLabel = "实体";

import fields from "./fields.js";
import { mockDyFields } from "../vuePlugins/utils";
import Mock from "mockjs";



 

function oldtreeUpdateApi(params) {
  return Promise.resolve({});
}

function oldtreeSaveApi(params) {
  return Promise.resolve({});
}

function oldtreeDeleteApi(ids) {
  ids = Array.isArray(ids) ? ids.join(",") : ids;
  return Promise.resolve({});
}

function oldtreeDetailApi(data) {
  return Promise.resolve(Mock.mock(mockDyFields(buildFormFields(fields))));
}
function buildDynamicSelectOption(){
   return {}
}

import {
  buildFormFields,
  appendToPreset,
  deepMerge,
} from "../dynamicPage/utils/tool";

export default {
  name: "pagePreview",
  components: {
    // CurdPage
  },
  data() {
    return {
      // form字段
      fields,
      entityLabel,
      // 页面配置
      apiPromises: {
        create: oldtreeSaveApi,
        bulkdelete: oldtreeDeleteApi,
        list:   (params)=> {
          return Promise.resolve(
            Mock.mock({
              "list|10": [mockDyFields(this.fields)],
              totalCount: 20,
            })
          );
        },
        // detail: oldtreeDetailApi,
        update: oldtreeUpdateApi,
      },
      // 页面配置
      pageOptions: {
        listOption: {
          lineActions: {
            detail: null,
            aview: appendToPreset("dialogPageActionOption", {
              sort: 1,
              label: "查看",
              permission: "查看",
              dialog: {
                properties: {
                  title: "查看" + entityLabel,
                },
                layout: {
                  name: "LayoutTabs",
                  properties: {
                    type: "card",
                  },
                },
                body: [
                  appendToPreset("DynamicForm", {
                    label: "基本信息",
                    props: {
                      apiPromise: oldtreeDetailApi,
                      formOption: {
                        formItemList: buildFormFields(this.fields),
                        borderForm: false,
                        formProperties: {
                          "label-position": "left",
                        },
                      },
                    },
                  }),
                  appendToPreset("DynamicForm", {
                    label: "管理信息",
                    props: {
                      apiPromise: oldtreeDetailApi,
                      formOption: {
                        formItemList: buildFormFields(this.fields),
                        borderForm: false,
                        formProperties: {
                          "label-position": "right",
                        },
                      },
                    },
                  }),

                  {
                    component: "div",
                    name: "@object@",
                    label: "信息详情3",
                    children: [
                      {
                        component: "DyTmpl",
                        props: {
                          tmpl: "test",
                        },
                      },
                    ],
                  },
                ],
              },
            }),
          },
        },
      },
    };
  },
  created() {
    const self = this;
    window.addEventListener("message", (ev, data) => {
      if (
        ev.origin.indexOf(location.hostname) > -1 &&
        ev.data.origin == "jsEditor"
      ) {
        // try {
        //   if (ev.data.type == "fields") {
        //     self.fields = self.parseObjByEval(ev.data.content);
        //   }
        //   if (ev.data.type == "page") {
        //     self.pageOptions = deepMerge(
        //       self.pageOptions,
        //       self.parseObjByEval(ev.data.content)
        //     );
        //   }
        // } catch (err) {
        //   console.error(err);

         const contentParsed= self.parseObject(ev.data.content)
        if(!contentParsed)return 

        if (ev.data.type == "fields") {
          self.fields = contentParsed;
        }
        if (ev.data.type == "page") {
          self.pageOptions = deepMerge(
            self.pageOptions,
            contentParsed
          );
        }
        self.$forceUpdate();
      }
    });
  },
  methods: {
    parseObjByEval(obj) {
      return eval(obj);
    },
    parseObjectByJson(obj) {
      return JSON.parse(obj, (k, v) => {
        if (typeof v === "string" && v.startsWith("function")) {
          return window.eval("(" + v + ")");
        }
        return v;
      });
      },
   
    parseObject(obj) {
      let res;
      try {
        res = JSON.parse(obj, (k, v) => {
          if (typeof v === "string" && v.startsWith("function")) {
            return window.eval("(" + v + ")");
          }
          return v;
        });
      } catch (er) {
        try{
        res= eval(obj)
        }catch(err){
          console.error(err);
        }
        
      }
      return res;
    },
  },
};
</script>
<style lang="css" scoped>
.page-wraper{
  position: relative;
}</style>
