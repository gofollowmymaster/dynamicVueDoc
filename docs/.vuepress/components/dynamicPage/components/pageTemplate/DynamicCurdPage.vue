<template>
  <div class=" hz-low-code flex flex-direction full-width">
    <!-- <BrandBar>
      <span slot="title">{{ title }}</span>
    </BrandBar> -->
    <main class="flex1">
      <DynamicCurd :optionsProps="pageOptions"></DynamicCurd>
    </main>
  </div>
</template>
<script>
import {
  buildFormFields,
  buildTableFields,
  buildSearchFields,
  deepMerge,
} from '../../utils/tool'
import {
  searchForm,
  pagination,
  tableOption,
  treeOptions,
  formOption,
  dialogFormOption
} from '../../presetConfig'
// import BrandBar from '@/components/content/BrandBar/BrandBar.vue'

export default {
  name: 'DynamicCurdPage',
  props: {
    pageOptionsprops: { type: Object },
    fields: {
      type: Array,
      required: true
    },
    formSections: {
      type: Object,
      default: function () {
        return {}
      }
    },
    title: {
      type: String,
      required: true
    },
  },
  computed: {
    pageOptions () {
      return deepMerge(
        {
          searchForm: { ...searchForm },
          topToolBar: {
            create: {
              component: 'el-button',
              label: '新增',
              actionType: 'dialogForm',
              permission:"新增",
              properties: {
                type: 'primary',
                key: 'create'
              },
              dialog: deepMerge(dialogFormOption, {
                body: {
                  formItemList: buildFormFields(this.fields, this.formSections)
                }
              })
            },
            bulkdelete: {
              component: 'el-button',
              label: '批量删除',
              permission:"批量删除",
              actionType: 'requestApi',
              loadCheckedData: true,
              properties: {
                type: 'default'
              },
              popconfirm: {
                'confirm-button-text': '好的',
                'cancel-button-text': '不用了',
                title: '确定删除选择的信息吗？',
                icon: 'el-icon-warning'
              },
              apiPromise: () => Promise.resolve(),
              dataAdapter: (data) => {
                return data?.data ?? {}
              },
              callback: {
                showTip: true,
                refresh:true
              }
            }
          },
          searchFields: buildSearchFields(this.fields),
          tableFields: buildTableFields(this.fields),
          tableOption: {
            ...tableOption,
            hasCheckbox: true,
            loadListApi: () => Promise.resolve(),
            'current-change': 'handleCurrentChange', // 事件 暂不支持
            lineActions: {
              update: {
                component: 'el-button',
                label: '更新',
                actionType: 'dialogForm',
                permission:"更新",
                properties: {
                  type: 'primary',
                  key: 'create',
                  size: 'small'
                },
                dialog: deepMerge(dialogFormOption, {
                  body: {
                    container:'el-drawer',
                    formItemList: buildFormFields(
                      this.fields,
                      this.formSections
                    )
                  },
                })
              },
              detail: {
                component: 'el-button',
                label: '查看',
                actionType: 'dialogForm',
                permission:"查看",
                properties: {
                  key: 'view',
                  size: 'small'
                },
                apiPromise: () => {},
                dataAdapter: (res) => res.data,
                dialog: deepMerge(dialogFormOption, {
                  body: {
                    container:'page',
                    props:{
                      textModel:true,
                      formProperties: {
                          'label-width': '100px',
                          'label-position': 'left'
                        }
                    },
                    formItemList: buildFormFields(
                      this.fields,
                      this.formSections
                    ),
                    btns: {
                      save: null,
                    }
                  }
                })
              },
              delete: {
                component: 'el-button',
                label: '删除',
                actionType: 'requestApi',
                permission:"删除",
                properties: {
                  type: 'default',
                  size: 'small'
                },
                popconfirm: {
                  'confirm-button-text': '好的',
                  'cancel-button-text': '不用了',
                  title: '确定删除选择的信息吗？',
                  icon: 'el-icon-warning'
                },
                apiPromise: () => {},
                dataAdapter: (data) => {
                  return data?.data ?? {}
                },
                callback: {
                  refresh: true,
                  showTip: true,
                }
              }
            }
          },
          treeOptions: { ...treeOptions, load: () => {} },
          pagination: pagination
        },
        this.pageOptionsprops
      )
    }
  },
  data: function () {
    return {
     
    }
  },
  // components: { BrandBar },
  methods: {}
}
</script>

<style lang="less" scoped>
 
</style>
