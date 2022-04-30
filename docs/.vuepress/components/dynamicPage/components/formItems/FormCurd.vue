<template>
  <!-- 普通输入框 -->
  <div
    :style="item.style || {}"
    :class="`form-unqiue-${item.key} ${getTextModel ? '' : 'hz-img-box'}`"
    class="form-input-box form-item-box"
  >
    <DynamicCurd :optionsProps="item.options"  ></DynamicCurd>

    <!-- {{item}} -->
   
  </div>
</template>

<script>
import FormMixin from "./mixin";
 
export default {
  name: "FormCurd",
  mixins: [FormMixin],
  data() {
    return {
      
    };
  },
  computed:{
             // 扩展属性，直接将属性配置，传到表单组件内部（即 Element UI 上）
        // 忽略属性【key、size】
        bindOptions () {
            let obj = Object.assign({}, this.item);
            obj={...obj,...obj.properties}
            
           
            obj.disabled= this.getTextModel?true:obj.disabled
            // :accept="item.accept"
            obj.accept=getAccepts(obj.accept)
            delete obj.key;
            delete obj.size;
            delete obj.type;
            delete obj.label;
            delete obj.readonly;
            delete obj.rules;
            delete obj.placeholder;
            delete obj.prepend;
            delete obj.append;
            delete obj.defaultValue;
            return obj;
        },
        val: {
            get() {
                return this.value?.map(file=>file.fileId)||[];
            },
            
            set(v) {
                this.$emit('input', v);

                // 只有非子表单的情况下，才会冒泡上去数据变更
                if (this.formItemType !== 'childForm') {
                    this.statusChangeFn.valueUpdateEvent({
                        [this.item.key]: v,
                    });
                } else {
                    // 如果是子表单的话，执行内置的变更
                    this.childChangeData.valueUpdateEvent();
                }
            }
        },
    
  },
  methods: {
    
       
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
