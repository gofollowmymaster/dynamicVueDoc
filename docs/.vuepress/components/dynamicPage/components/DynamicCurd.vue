<template>
  <main class=" flex flex-direction">
    <DynamicSearchForm
      v-if="options.searchFields && options.searchFields.length"
      :fields="options.searchFields" 
      :options="options.searchOption"
      @search="onSearch"
    ></DynamicSearchForm>
    <section class="mb12" v-if="!isEmpty(options.topToolBar)">
      <DynamicActions
        :actions="options.topToolBar"
        :actionData="actionData"
        :actionBarWraper="$parent.$el"
      ></DynamicActions>
    </section>
    <section class="grid-wrap full-width">
      <div
        class="scroll p10 border-grey grid-col-4 grid-col-xs-12 grid-col-pp-24"
        v-if="!isEmpty(options.treeOption)"
      >
        <el-tree v-bind="options.treeOption" @node-click="treeClick"> </el-tree>
      </div>
      <section
        class="flex flex-direction"
        :class="[
          options.treeOption
            ? 'grid-col-20  grid-col-xs-12 grid-col-pp-24'
            : 'grid-col-24'
        ]">
        <DynamicTable
          class="table-wraper flex1"
          :table="options.listOption"
          :columns="options.tableFields"
          :apiPromise="loadListApiPromise"
          @selection-change="selectChange"
        ></DynamicTable>
        <el-pagination
          class="mt16"
          background
          v-bind="options.pagination"
          :total="total"
          @size-change="handleSizeChange"
          :pageSize.sync="pagination.pageSize"
          @current-change="handleCurrentChange">
        </el-pagination>
      </section>
    </section>
  </main>
</template>
<script>
import {
  compose,
  deepMerge,
  objectFilter,
  buildFormFields,
  buildSearchFields,
  buildTableFields,
  buildDetailFields,
  isEmpty,
  generateDefaultValue,
} from '../utils/tool'
import {
  searchOption,
  pagination,
  tableOption,
  treeOption,
} from '../presetConfig'
import actionPresetMixin from "./actionPresetMixin"

export default {
  name: 'DynamicCurd',
  mixins:[actionPresetMixin],
  props: {
    fields: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    optionsProps: {
      type: Object,
      require: true
    },
    isDebuggerMode: {
      type: Boolean,
      default: true
    },
    mode:{type:String,default:'dialog'},
    apiPromises: {
      type: Object,
      default () {
        return {}
      }
    },
    formSections: {
      type: Object,
      default () {
        return {}
      }
    },
    entityLabel: String,
  },
  data: function () {
    return {
      isEmpty,
      searchParams: { refreshKey: '' },
      pagination: {
        pageNo: 1,
        pageSize: pagination.pageSize
      },
      total: 1,
      selected:[],
    }
  },


  computed: {
    options () {

      const {createOptions,bulkdeleteOptions,updateOptions,detailOptions,deleteOptions}=this.generateActionOptions(this.mode)
      const searchFields = buildSearchFields(this.fields)
      const tableFields = buildTableFields(this.fields)

      const optionsOrigin = deepMerge(
        {
          searchOption,
          treeOption,
          pagination,
          topToolBar: {
            create: createOptions,
            bulkdelete: bulkdeleteOptions
          },
          searchFields,
          tableFields,
          listOption: {
            ...tableOption,
            loadListApi: this.apiPromises.list,
            lineActions: {
              update: updateOptions,
              detail: detailOptions,
              delete: deleteOptions
            }
          }
        },
        this.optionsProps,
        true
      )
      const res = objectFilter(optionsOrigin, (key, obj) => {
        if (key == 'showTestTool') {
          return !!this.isDebuggerMode
        } else {
          return obj[key]
        }
      },true)
      return res
    },
    queryParams () {
      return { ...this.searchParams, ...this.pagination }
    },
    loadListApiPromise () {
      const queryParams={...this.queryParams}
      delete queryParams.refreshKey
      return this.options.listOption
        .loadListApi(queryParams)
        .then((data = {}) => {
          debugger
          data = data.data || data
          this.total = data.totalCount
          return data.list
        })
    },
    actionData(){
      return {selected:this.selected,queryParams:this.queryParams}
    }
  },
  created () {
    this.searchParams= {...this.searchParams, ...generateDefaultValue(this.options.searchFields||[])}
    this.pagination.pageSize =
      this.options.pagination.pageSize || this.pagination.pageSize
    this.$dynamicBus.$on('dynamicRefresh', () => {
      this.refresh()
    })
  },
  mounted(){
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
      
      this.onSearch({
        [this.options.treeOption.fieldName]:
          data[this.options.treeOption['node-key']]
      })
    },
    onSearch (params) {
      debugger
      this.searchParams = { ...this.searchParams, ...params }
    },
    refresh () {
      const refreshKey = this.searchParams.refreshKey++
      this.onSearch({ refreshKey })
    },
 
    selectChange (selected) {
      this.selected = selected
    },
   
  }
}
</script>

<style lang="less" scoped>
.table-wraper {
  height: 540px;
}
.border-grey {
  border: 1px solid var(--grey);
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
