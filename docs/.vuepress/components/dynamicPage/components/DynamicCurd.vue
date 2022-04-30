<template>
  <main class="p20 flex flex-direction">
    <DynamicSearchForm
    v-if="options.searchFields&&options.searchFields.length"
      :fields="options.searchFields"
      :options="options.searchForm"
      @search="onSearch"
    ></DynamicSearchForm>
    <section class="my12 "  v-if="options.topToolBar">
      <template v-for="(item, index) in options.topToolBar">

        <el-popconfirm
          class="ml6"
          v-if="item.popconfirm"
          v-bind="item.popconfirm"
          :key="index"
          @confirm="actionHandle(item)"
        >
          <component
            slot="reference"
            :is="item.component"
            v-permission="item.permission"
            v-text="item.label"
            v-bind="item.properties"
          ></component>
        </el-popconfirm>
        <component
          v-else
          :is="item.component"
          v-text="item.label"
          v-bind="item.properties"
          v-permission="item.permission"
          :key="index"
          @click="actionHandle(item)"
        ></component>
      </template>
    </section>
    <section class="grid-wrap  full-width">
      <div class="scroll p10 border grid-col-2" v-if="options.treeOptions">
        <el-tree
          v-bind="options.treeOptions"
          @node-click="treeClick"
        >
        </el-tree>
      </div>
      <section
        class="flex flex-direction"
        :class="[options.treeOptions ? 'grid-col-10' : 'grid-col-12']">
        <DynamicTable
          class="table-wraper flex1"
          :table="options.tableOption"
          :columns="options.tableFields"
          :apiPromise="loadListApiPromise"
          @selecct-change="selecctChange"
          @toRefreshTable="refresh"
        ></DynamicTable>
        <el-pagination
          class="mt16"
          background
          v-bind="options.pagination"
          :total="total"
          @size-change="handleSizeChange"
          :pageSize.sync="pagination.pageSize"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </section>
    </section>
    <DynamicFormDialog v-bind="currentDialogForm" @formSubmited="refresh">
    </DynamicFormDialog>
  </main>
</template>
<script>
import { deepCopy, deepMerge,objectFilter } from '../utils/tool'
import actionMixin from './actionMixin'
import {
  searchForm,
  pagination,
  tableOption,
  treeOptions,
  formOption,
  dialogFormOption
} from '../presetConfig'
export default {
  name: 'DynamicCurd',
  props: {
    optionsProps: {
      type: Object,
      require: true
    },
    isDebuggerMode:{
      type:Boolean,
      default:true
    }
  },
  mixins:[actionMixin],
  data: function () {
    return {
      currentDialogForm: {
        visible: { value: false }
      },
      searchParams: {refreshKey:''},
      pagination: {
        pageNo: 1,
        pageSize:pagination.pageSize
      },
      total: 1,
  
      options:objectFilter(deepMerge({
        searchForm,
        tableOption,
        treeOptions,
        pagination
      },this.optionsProps),(key,obj)=>{
        if(key=='showTestTool'){
            return this.isDebuggerMode?true:false
        }else{
          return obj[key]
        }
      })
    }
  },
  computed: {
    queryParams () {
      return { ...this.searchParams, ...this.pagination }
    },
    loadListApiPromise () {
      debugger
      return this.options.tableOption
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
    this.pagination.pageSize =
      this.options.pagination.pageSize || this.pagination.pageSize
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
        [this.options.treeOptions.fieldName]:
          data[this.options.treeOptions['node-key']]
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
      if (action.loadCheckedData && this.selected.length < 1) {
        this.$message({ type: 'warning', message: '您没有选择任何数据' })
        return
      }
      const actionData=action.loadCheckedData?this.selected:null
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
