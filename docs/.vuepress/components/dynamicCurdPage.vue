<template>
  <CurdPage
    title="古树名木管理"
    :fields="fields"
    :pageOptionsprops="pageOptions"
  ></CurdPage>
</template>
<script>
import CurdPage from './dynamicPage/components/pageTemplate/DynamicCurdPage.vue' // 增删改查页面

import {
  oldtreeUpdateApi,
  oldtreeSaveApi,
  oldtreeDetailApi,
  oldtreeListApi,
  oldtreeDeleteApi
} from './api/oldtree.js'
import {
  buildFormFields,
  buildTableFields,
  buildSearchFields,
  deepMerge
} from './dynamicPage/utils/tool'
import fields from "./fields.js"

export default {
  name: 'dynamicCurdPage',
  components: {
    CurdPage
  },
  data () {
    return {
      // form字段
      fields,
      // 页面配置
      pageOptions: {
        searchForm: { showTestTool: false },
        topToolBar: {
          create: {
            dialog: {
              title: '新增表单',
              body: {
                props: { showTestTool: false },
                btns: {
                  save: {
                    apiPromise:  oldtreeSaveApi,
                    callback: {
                      showTip: true
                    }
                  }
                }
              }
            }
          },
          bulkdelete: {
            component: 'el-button',
            label: '批量删除',

            apiPromise:  oldtreeDeleteApi ,
            dataAdapter: (data) => {
              return data?.data || {}
            }
          }
        },

        tableOption: {
          loadListApi:  oldtreeListApi,

          lineActions: {
            update: {
              component: 'el-button',
              label: '更新',
              apiPromise: oldtreeDetailApi,
              dialog: {
                title: '更新表单',
                width: '60%',
                body: {
                  props: {
                    showTestTool: false
                  },
                  btns: {
                    save: {
                      label: '更改',
                      apiPromise:oldtreeUpdateApi
                    }
                  }
                }
              }
            },
            detail: null,
            aview: {
              component: 'el-button',
              label: '查看',
              actionType: 'dialogContent',
              properties: {
                key: 'view',
                size: 'small'
              },
              dialog: {
                title: '查看表单',
                width: '60%',
                data: {},
                body: [
                  {
                    component: 'dynamicForm',
                    name:'@object@',

                    props: {
                      class:["grid-col-12"],
                      dataRquest: {
                          apiPromise:  oldtreeDetailApi,
                        
                        },
                      
                      formOption: {
                        formProperties: {
                          'label-width': '100px',
                          'label-position': 'left'
                        },
                        borderForm: false,
                        showFoldBtn: false,
                        showTestTool: true,
                        textModel: true,
                        formItemList: buildFormFields(fields),
                        data: {},
                        
                      },

                      actions: {
                        //  save:null,
                        cancel: {
                          actionType: 'close',
                          label: '取消'
                        }
                      }
                    }
                  }
                ]
              }
            },
            delete: {
              component: 'el-button',
              label: '删除',
              actionType: 'requestApi',
              apiPromise:  oldtreeDeleteApi,
              dataAdapter: (data) => {
                return data?.data || {}
              },
              callback :{}
            }
          }
        },

 
        pagination: { 'hide-on-single-page': false }
        // tableOption: { formOption: { showFoldBtn: false } }
      }
    }
  }
}
</script>
<style lang="css" scoped></style>
