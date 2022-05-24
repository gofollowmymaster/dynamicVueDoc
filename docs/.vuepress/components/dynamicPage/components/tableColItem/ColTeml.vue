<template>
  <!-- 普通展示 -->
  <div
    :style="item.style || {}"
    :class="`form-unqiue-${item.key}`"
    class="table-col-box"
  >
    {{ content }}
  </div>
</template>

<script>
import TableColMixin from './mixin'

export default {
  name: 'ColTeml',
  mixins: [TableColMixin],
  computed: {},
  data () {
    return {
      content: ''
    }
  },
  mounted () {
    const content = this.rowData[this.field]
    if (typeof this.colOptions.tableOption?.template === 'function') {
      this.content = this.colOptions.tableOption?.template(
        this.rowData,
        this.field
      )
      return
    }
    if (['FormSelect', 'FormRadio'].includes(this.colOptions.type)) {
      const optionMap = this.colOptions.options.reduce((prev, next) => {
        prev[next.value] = next.label
        return prev
      }, {})
      this.content = optionMap[content]
      return
    }

    this.content = content
  }
}
</script>

<style scoped lang="less"></style>
