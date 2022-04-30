export default {
  props: {
    // 全部表单元素禁用。通常用于提交时使用
    allDisabled: {
      type: Boolean,
      default: false
    },
    // 是否给表单显示border 外框，包含区块外侧有一个 boder，以及区块标题的灰色背景
    borderForm: {
      type: Boolean,
      default: true
    },
    // 文字模式。不显示表单组件，而是只显示纯文字内容
    // 同时，纯文本模式（即值为 true 的时候），会隐藏表单要素 label 左边的星号
    textModel: {
      type: Boolean,
      default: false
    },
    // 自定义表单每个要素的列。
    // 如果是 6 则为 一行 4 列，12 则为 1 行 2 列。
    // 优先级高于表单要素本身的设置
    // 如果为 0，则使用表单要素本身的设置
    formCol: {
      type: [Number, String],
      default: 1
    }

  },
  computed: {},

  methods: {
    isBlocked (formSection) {
      return this.foldBlockList.indexOf(formSection.label) > -1
    },
    // 获取区块的样式
    getBlockClass (blockItem) {
      const c = blockItem.class
      return Object.assign({}, c, {
        'block-item': this.borderForm,
        'block-hide': this.foldBlockList.indexOf(blockItem.label) > -1
      })
    },

    // 获取 label
    getFormItemLabel (formItem) {
      debugger
      if (
        this.textModel &&['left','right'].includes(this.formProperties['label-position'])) {
        return formItem.label + ':'
      }
      return formItem.label
    },

 
  }
}
