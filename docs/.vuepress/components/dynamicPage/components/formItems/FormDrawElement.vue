<template>
  <!-- 普通输入框 -->
  <main
    :style="item.style || {}"
    :class="`form-unqiue-${item.key} ${getTextModel ? '' : 'hz-untext-box'}`"
    class="form-input-box form-item-box"
  >
  <div class='flex'>
<el-input
      :value="value"
      :placeholder="getPlaceholder(item)"
      :disabled="getDisabled"
      @blur="(e) => onBlur(item, e)"
      type="text"
      v-bind="bindOptions"
      readonly
      v-if="!getTextModel"
    >
    </el-input>
    <div v-else :style="item.textStyle||{}" class="form-input-text">{{ value || '-' }}   </div>
   <el-button  v-if="!getTextModel" @click="selectPoint" size="small" :disabled="getDisabled">选择</el-button>
  </div>
    
    <DrawElementGis
      v-if="!getTextModel"
      v-model="val"
      :visible="visible"
      :zoom="zoom" 
      :title="title"
      :drawType="bindOptions.drawType"
    ></DrawElementGis>
  </main>
</template>

<script>
import FormMixin from "./mixin";
import DrawElementGis from "../common/DrawElementGis.vue";

export default {
  components: { DrawElementGis },
  name: "FormDrawElement",
  mixins: [FormMixin],
  props: {
    zoom: {
      type: Number,
      default: function () {
        return 11;
      },
    },
    title: {
      type: String,
      default: function () {
        return "选择位置";
      },
    },
 
  },
  computed:{
 
    val: {
        get () {
          let value
          try{
            value=JSON.parse(this.value)
            
          }catch(e){
            value=[]
          }
          return value
        },
        set (lnglat) {
          this.$emit('input', JSON.stringify(lnglat));
          
          // 只有非子表单的情况下，才会冒泡上去数据变更
          if (this.formItemType !== 'childForm') {
              this.statusChangeFn.valueUpdateEvent({
                  [this.item.key]: lnglat,
              });
          } else {
              // 如果是子表单的话，执行内置的变更
              this.childChangeData.valueUpdateEvent();
          }
        }
    },
  },
  data: function () {
    return {
      visible: {value:false},
    };
  },
  created(){
 
  },

  methods: {
    selectPoint() {
         
      this.visible.value = true;
    },
 
  },
};
</script>

<style scoped lang="less">
</style>
