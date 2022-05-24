<template>
  <div
    :style="item.style || {}"
    :class="`form-unqiue-${item.key} ${getTextModel ? '' : 'hz-img-box'}`"
    class="form-input-box form-item-box"
  >
    <DynamicCurd
      :optionsProps="item.options"
      :fields="item.fields"
      :apiPromises="apiPromises"
      :entityLabel="item.entityLabel"
      ref="dynamiCurd"
    ></DynamicCurd>

  </div>
</template>

<script>
import FormMixin from "./mixin";

export default {
  name: "FormCurd",
  mixins: [FormMixin],
  data() {
    return {
      apiPromises: {
        update: this.tableUpdateApi,
        create: this.tableSaveApi,
        detail: this.tableDetailApi,
        delete: this.tableDeleteApi,
        list: this.loadtableApi,
      },
    };
  },
  computed: {
    val: {
      get() {
        return this.value?.map((file) => file.fileId) || [];
      },

      set(v) {
        this.$emit("input", v);

        // 只有非子表单的情况下，才会冒泡上去数据变更
        if (this.formItemType !== "childForm") {
          this.statusChangeFn.valueUpdateEvent({
            [this.item.key]: v,
          });
        } else {
          // 如果是子表单的话，执行内置的变更
          this.childChangeData.valueUpdateEvent();
        }
      },
    },
    localTableName(){
      return 'locaTable-'+this.item.key
    }
  },
  methods: {
    resetFields(){
      localStorage.removeItem(this.localTableName);
      this.$refs.dynamiCurd.refresh()
    },
    loadtableApi(params) {
      const { pageNo, pageSize } = params;
      let tableList = localStorage.getItem(this.localTableName);
      if (!tableList) {
        tableList = "{}";
      }
      tableList = JSON.parse(tableList);
      const start = (pageNo - 1) * pageSize,
        end = start + pageSize;
      return Promise.resolve().then(() => {
        return {
          list: Object.values(tableList).slice(start, end),
          totalCount: tableList.length,
        };
      });
    },

    tableUpdateApi(data) {
      let tableList = localStorage.getItem(this.localTableName);
      if (!tableList) {
        tableList = "{}";
      }
      tableList = JSON.parse(tableList);
      tableList[data.id] = data;
      localStorage.setItem(this.localTableName, JSON.stringify(tableList));
      return Promise.resolve().then(() => ({}));
    },
    tableSaveApi(data) {
      let tableList = localStorage.getItem(this.localTableName);
      if (!tableList) {
        tableList = "{}";
      }
      tableList = JSON.parse(tableList);
      const id = new Date().getTime();
      data.id = id;
      tableList[id] = data;
      localStorage.setItem(this.localTableName, JSON.stringify(tableList));
      return Promise.resolve().then(() => ({}));
    },
    tableDetailApi(data) {
      const id = data.id;
      let tableList = localStorage.getItem(this.localTableName);
      if (!tableList) {
        tableList = "{}";
      }
      tableList = JSON.parse(tableList);
      return Promise.resolve().then(() => tableList[id]);
    },
    tableDeleteApi(data) {
      const id = data.id;
      let tableList = localStorage.getItem(this.localTableName);
      if (!tableList) {
        tableList = "{}";
      }
      tableList = JSON.parse(tableList);
      delete tableList[id];
      localStorage.setItem(this.localTableName, JSON.stringify(tableList));

      return Promise.resolve().then(() => ({}));
    },
  },
};
</script>

<style scoped lang="less">
.form-input-box /deep/ .el-input {
  position: relative;
  width: 100%;
  height: 36px;
}
</style>
