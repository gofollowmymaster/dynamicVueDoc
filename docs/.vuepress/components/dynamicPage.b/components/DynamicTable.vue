<template>
  <main class="dynamic-table-container">
    <el-table
      :data="tableData"
      v-bind="table.properties"
      ref="table"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
    >
      <template v-for="col in columnsComputed">
        <el-table-column
          v-if="col.type == 'index'"
          :key="col.key"
           v-bind="{ ...col.tableOption }"
          type="index"
          :index="indexHandle"
        >
        </el-table-column>
        <el-table-column
          v-else-if="col.type == 'selection'"
          v-bind="{ ...col.tableOption }"
          :key="col.key"
          type="selection"
        >
        </el-table-column>
        <el-table-column
          v-else-if="col.type == 'lineActions'"
          v-bind="{ ...table.colOptions, ...col.tableOption }"
          :key="col.key"
        >
          <template slot-scope="scope">
          <DynamicActions
                :actions="col.actions"
                :actionData="scope.row"
                :actionBarWraper="$parent.$el"></DynamicActions>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :prop="col.key"
          v-bind="{ ...table.colOptions, ...col.tableOption }"
          :key="col.key"
        >
          <template slot-scope="scope">
            <component
              v-if="
                col.tableOption.template &&col.tableOption.template(scope.row, col.key)&&
                col.tableOption.template(scope.row, col.key).component
              "
              :is="col.tableOption.template(scope.row, col.key).component"
              :rowData="scope.row"
              :field="col.key"
              :item="col.tableOption.template(scope.row, col.key)"
            ></component>
            <ColTeml v-else-if="col.tableOption.template" v-bind="{}">
              {{
                col.tableOption.template(scope.row, col.key) ||
                scope.row[col.key]
              }}</ColTeml
            >
            <ColTeml v-else v-bind="{}"> {{ scope.row[col.key] }}</ColTeml>
          </template>
        </el-table-column>
      </template>
    </el-table>
   
  </main>
</template>
<script>
import { deepCopy,loadPresetConfig } from '../utils/tool'

export default {
  name: 'DanamicTable',
  props: {
    dataList: {
      type: Array,
      default: function () {
        return []
      }
    },
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    table: {
      type: Object,
      default: function () {
        return loadPresetConfig('tableOption')
      }
    },

    apiPromise: {
      type: Promise,
      default: function () {
        return null
      }
    }
  },
  data: function () {
    return {
      tableData: [],
    }
  },
  computed: {
    columnsComputed () {
      const columns = this.columns.map((item) => {
        return {
          ...item,
          tableOption: {
            ...item.tableOption,
            label: item.tableOption?.label || item.label
          }
        }
      })

      if (this.table.hasCheckbox) {
        columns.unshift({
          key: 'selection',
          type: 'selection',
          tableOption: {
            width: 55
          }
        })
      }
     
      if (this.table.lineActions) {
        const actions = Object.values(this.table.lineActions).filter(
          (action) => action.component
        )
        columns.push({
          type: 'lineActions',
          key: 'lineActions',
          tableOption: {
            width: actions.length * 86,
            label: '操作',
            fixed: 'right'
          },
          actions:this.table.lineActions
        })
      }

      return columns
    }
  },
  watch: {
    apiPromise: {
      handler (api) {
        if (api instanceof Promise) {
          api.then((dataList) => {
            this.tableData = dataList
          })
        }
      },
      deep: true,
      immediate: true
    },
    tableData: {
      handler (tableData) {
        this.$nextTick(() => {
          this.$refs.table.doLayout()
        })
      },
      deep: true
      // immediate: true,
    },
    dataList: {
      handler (dataList) {
        this.tableData = dataList
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {},
  components: {},
  methods: {
    handleSelectionChange (list) {
      this.$emit('selecct-change', list)
    },
    handleRowClick (row, column, event) {
      this.$emit('row-click', row, column, event)
    },
 

     indexHandle(index) {
       debugger
        return index+1;
      } 
  }
}
</script>
<style lang="less" scoped>
.dynamic-table-container {
  /deep/ .el-table .el-table__cell {
    // padding: 0;
  }
}
</style>
