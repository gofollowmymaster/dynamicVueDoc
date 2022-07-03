import {appendToPreset, deepMerge,buildFormFields,buildDetailFields,  } from '../utils/tool'
export default {
  props: {},
  computed: {},
  methods: {
    generateCreateOptions(mode='dialog'){
      const presetConfig= mode=='router'?'routerDialogFormActionOption':'dialogFormActionOption'

      return appendToPreset(presetConfig, {
        label: '新增',
        permission: '新增',
        router:'create',
        sort:50,
        isLoadData: false,
        dialog: {
          properties: {
            title: '新增' + this.entityLabel,
            width: '60%'
          },
          body: {
            formItemList: buildFormFields(this.fields, this.formSections),
            actions: {
              save: {
                apiPromise: this.apiPromises.create
              }
            }
          }
        }
      })
    },
    generateBulkDeleteOptions(){
      return appendToPreset('requestApiActionOption', {
        label: '批量删除',
        permission: '批量删除',
        popconfirm: {
          title: '确定删除选择的信息吗？'
        },
        actionDataKey:'selected',
        apiPromise: this.apiPromises.bulkdelete || this.apiPromises.delete
      })  
    },
    generateDeleteOptions(){
      return appendToPreset('requestApiActionOption', {
        sort:200,
        label: '删除',
        permission: '删除',
        apiPromise: this.apiPromises.delete || this.apiPromises.bulkdelete
      })  
    },
    generateUpdateOptions(mode='dialog'){
      const presetConfig= mode=='router'?'routerDialogFormActionOption':'dialogFormActionOption'

      return appendToPreset(presetConfig, {
        label: '编辑',
        router:'update',
        permission: '编辑',
        apiPromise: this.apiPromises.detail,
        dialog: {
          properties: {
            title: '编辑' + this.entityLabel,
            width: '60%'
          },
          body: {
            formItemList: buildFormFields(this.fields, this.formSections),
            actions: {
              save: {
                label: '保存',
                apiPromise: this.apiPromises.update
              }
            }
          }
        }
      })
    },
    generateDetailOptions(mode='dialog'){

      const presetConfig= mode=='router'?'routerDialogFormActionOption':'dialogFormActionOption'

      return appendToPreset(presetConfig, {
        label: '详情',
        router:'detail',
        permission: '详情',
        apiPromise: this.apiPromises.detail,
        properties:{
          type:'default'
        },
        dialog: {
          properties: {
            title: this.entityLabel + '详情'
          },
          body: {
            props: {
              textModel: true,
              formProperties: {
                 'label-position': 'left',
                  'label-width': '130px',
               },
            },
            formItemList: buildDetailFields(this.fields, this.formSections),
            actions: {
              save: null
            }
          }
        }
      })
    },
    generateActionOptions (mode='dialog') {
      const createOptions = this.generateCreateOptions(mode)
      const bulkdeleteOptions =  this.generateBulkDeleteOptions()   
      const updateOptions = this.generateUpdateOptions(mode )
      const detailOptions = this.generateDetailOptions(mode )
      const deleteOptions = this.generateDeleteOptions()
      return {
        createOptions,bulkdeleteOptions,updateOptions,detailOptions,deleteOptions
      }
    },
    generatePageActionOptions (mode='dialog') {
      const create = this.generateCreateOptions(mode)
      const update = this.generateUpdateOptions(mode )
      const detail = this.generateDetailOptions(mode )
      return {
        create,update,detail
      }
    },
   
  }
}
