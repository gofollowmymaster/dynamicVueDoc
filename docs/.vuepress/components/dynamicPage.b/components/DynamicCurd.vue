<template>
  <main class="p20 flex flex-direction">
    <DynamicSearchForm
    v-if="curdOpions.searchFields&&curdOpions.searchFields.length"
      :fields="curdOpions.searchFields"
      :options="curdOpions.searchForm"
      @search="onSearch"
    ></DynamicSearchForm>
    <section class="my12 "  v-if="curdOpions.topToolBar">
      
        <DynamicActions
                :actions=" curdOpions.topToolBar"
                :actionData="selected"
                :actionBarWraper="$parent.$el"
              ></DynamicActions>
    
    </section>
    <section class="grid-wrap  full-width">
      <div class="scroll p10 border grid-col-4   grid-col-xs-12 grid-col-pp-24" v-if="curdOpions.treeOption">
        <el-tree
          v-bind="curdOpions.treeOption"
          @node-click="treeClick"
        >
        </el-tree>
      </div>
      <section
        class="flex flex-direction"
        :class="[curdOpions.treeOption ? 'grid-col-20  grid-col-xs-12 grid-col-pp-24' : 'grid-col-24']">
        <DynamicTable
          class="table-wraper flex1"
          :table="curdOpions.tableOption"
          :columns="curdOpions.tableFields"
          :apiPromise="loadListApiPromise"
          @selecct-change="selecctChange"
        ></DynamicTable>
        <el-pagination
          class="mt16"
          background
          v-bind="curdOpions.pagination"
          :total="total"
          @size-change="handleSizeChange"
          :pageSize.sync="pagination.pageSize"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </section>
    </section>

  </main>
</template>
<script>
import { deepCopy, deepMerge,objectFilter,buildFormFields,buildSearchFields ,buildTableFields} from '../utils/tool'
import actionMixin from './actionMixin'
import {
  searchForm,
  pagination,
  tableOption,
  treeOption,
  dialogFormActionOption,
  requestApiActionOption,
} from '../presetConfig'
export default {
  name: 'DynamicCurd',
  props: {
    fields:{
      type: Array,
      required: false,
      default(){
        return []
      }
    },
    optionsProps: {
      type: Object,
      require: true
    },
    isDebuggerMode:{
      type:Boolean,
      default:true
    },
     apiPromises: {
      type: Object,
      default(){
        return {}
      }
    },
    entityLabel:String
  },
  mixins:[actionMixin],
  data: function () {
      console.log('--optionsProps--',this.optionsProps)

    return {
      searchParams: {refreshKey:''},
      pagination: {
        pageNo: 1,
        pageSize:pagination.pageSize
      },
      total: 1,
       }
  },
  computed: {
    curdOpions(){
       return objectFilter(deepMerge({
        searchForm,
        treeOption,
        pagination,
        topToolBar: {
          create: deepMerge(dialogFormActionOption,{
            label: '新增',
            permission:"新增",
            isloadData: false,
            dialog:{
              properties:{
                title: '新增'+this.entityLabel,
                width: '60%',
              },
              body: {
                formItemList: buildFormFields(this.fields, this.formSections),
                actions: {
                  save: {
                    apiPromise:  this.apiPromises['create'],
                  }
                }
              }
            }
          }),
          bulkdelete: deepMerge(requestApiActionOption,{
            label: '批量删除',
            permission:"批量删除",
            popconfirm: {
              title: '确定删除选择的信息吗？',
            },
            apiPromise:   this.apiPromises['bulkdelete']||this.apiPromises['delete'] ,
          })
        },
        searchFields: buildSearchFields(this.fields),
        tableFields: buildTableFields(this.fields),
        tableOption: {
          ...tableOption,
          loadListApi: this.apiPromises['list'],
          'current-change': 'handleCurrentChange', // 事件 暂不支持
          lineActions: {
            update:  deepMerge(dialogFormActionOption,{
              label: '更新',
              permission:"更新",
              sort:0,
              dialog:   {
                properties:{
                title: '新增表单'+this.entityLabel,
                width: '60%',
              },
                body: {
                  formItemList: buildFormFields(
                    this.fields,
                    this.formSections
                  ),
                  actions: {
                    save: {
                      label: '更改',
                      apiPromise:this.apiPromises['update']
                    }
                }
                },
              }
            }),
            detail:  deepMerge(dialogFormActionOption,{
              label: '查看',
              permission:"查看",
              sort:0,
              apiPromise:  this.apiPromises['detail'],
              dialog: {
                properties:{
                  title: this.entityLabel+'详情',
                },
                body: {
                  props:{
                    textModel:true,
                  },
                  formItemList: buildFormFields(
                    this.fields,
                    this.formSections
                  ),
                  btns: {
                    save: null,
                  }
                }
              }
            }),
            delete: deepMerge(requestApiActionOption,{
              label: '删除',
              sort:10,
              permission:"删除",
              apiPromise: this.apiPromises['delete']||this.apiPromises['bulkdelete']
            })
          }
        },
        
      },this.optionsProps,true),(key,obj)=>{
        if(key=='showTestTool'){
            return this.isDebuggerMode?true:false
        }else{
          return obj[key]
        }
      })
   
    },
    queryParams () {
      return { ...this.searchParams, ...this.pagination }
    },
    loadListApiPromise () {
      debugger
      return this.curdOpions.tableOption
        .loadListApi(this.queryParams)
        .then((data = {}) => {
          data = data.data || data
          this.total = data.totalCount
          return data.list
        })
    }
  },
  created () {
    this.selected = []
    this.pagination.pageSize = this.curdOpions.pagination.pageSize || this.pagination.pageSize
    this.$dynamicBus.$on('dynamicRefresh',()=>{
      this.refresh()})
     console.log('----this.curdOpions----',this.curdOpions)
  },

  methods: {
    handleSizeChange (pageSize) {
      this.refresh()
    },
    handleCurrentChange (pageNo) {
       
      this.pagination.pageNo = pageNo
      this.onSearch({ pageNo })
    },

    treeClick (data, node) {
      debugger
      this.onSearch({
        [this.curdOpions.treeOption.fieldName]:
          data[this.curdOpions.treeOption['node-key']]
      })
    },
    onSearch (params) {
      this.searchParams = { ...this.searchParams, ...params }
    },
    refresh () {
      const refreshKey = this.searchParams.refreshKey++
      this.onSearch({ refreshKey })
    },

    actionHandle (action) {
      if (action.isloadData && this.selected.length < 1) {
        this.$message({ type: 'warning', message: '您没有选择任何数据' })
        return
      }
      const actionData=action.isloadData?this.selected:null
      this.actionHandles(action,actionData)
       
    },
    selecctChange (selected) {
      this.selected = selected
    }
  }
}
</script>

<style lang="less" scoped>
 
.table-wraper {
  height: 540px;
}
.scroll {
  overflow: auto;
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #efefef;
    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #bbb;
  }
  ::-webkit-scrollbar-corner {
    background: #efefef;
  }
}
</style>
