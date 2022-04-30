<template>
  <!--  字典下拉框（指通过数据字典获取选项）  -->
  <div
    :style="item.style || {}"
    :class="`form-unqiue-${item.key} ${getTextModel ? '' : 'hz-untext-box'}`"
    class="form-item-box"
  >
    <el-select
      style="width: 100%"
      v-model="val"
      :disabled="getDisabled"
      :placeholder="getPlaceholder(item)"
      v-if="!getTextModel">
      <el-option
        v-for="option in dynamicDict"
        :key="option[dictKey]"
        :label="option[dictLabel]"
        :value="option[dictValue]"/>
    </el-select>
    <div v-else :style="item.textStyle || {}" class="form-input-text">
      {{ textModelValue || "-" }}
    </div>
  </div>
</template>

<script>
import FormMixin from "./mixin";


export default {
  name: "FormDynamicSelect",
  mixins: [FormMixin],

  data: function () {
    return {
      dynamicDict: {},
      dictKey: "id",
      dictLabel: "dictLabel",
      dictValue: "dictValue",
    };
  },
  mounted() {
 
    if (this.item.options.key) {
      this.dictKey = this.item.options.key;
    }
    if (this.item.options.label) {
      this.dictLabel = this.item.options.label;
    }
    if (this.item.options.value) {
      this.dictValue = this.item.options.value;
    }

    this.item.options.apiPromise().then((res) => {
      this.dynamicDict = res.reduce((prev, next) => {
        prev[next[this.dictKey]] = next;
        return prev;
      }, {});
    });
  },
  computed: {
    textModelValue() {
      const content =
        this.dynamicDict[this.dictKey] &&
        this.dynamicDict[this.dictKey].find((item) => {
          return item[this.dictValue] === this.val;
        });
      return (content && content[this.dictValue]) || "";
    },

    val: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
        this._valueLink(v);
        // 只有非子表单的情况下，才会冒泡上去数据变更
        if (this.formItemType !== "childForm") {
          this.statusChangeFn.valueUpdateEvent({
            [this.dictKey]: v,
          });
        } else {
          // 如果是子表单的话，执行内置的变更
          this.childChangeData.valueUpdateEvent();
        }
      },
    },
  },
};
</script>

<style scoped lang="less">
 
</style>
