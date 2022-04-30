<template>

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
      type="text"
      v-bind="bindOptions"
      readonly
    v-if="!getTextModel"
    >
    </el-input>
    <div v-else :style="item.textStyle||{}" class="form-input-text">{{ value || '-' }}   </div>
   <el-button v-if="!getTextModel" @click="selectPoint" size="small" :disabled="getDisabled">选择</el-button>
  </div>
    
    <selectPointGis
     v-if="!getTextModel&&visible.value"
      v-model="val"
      :visible="visible"
      :zoom="zoom"
      :title="title"
    ></selectPointGis>
  </main>
</template>

<script>
import FormMixin from "./mixin";

export default {
  name: "FormSelectPoint",
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
                debugger
                return this.value?this.value.split(','):[]
            },
            set (lnglat) {
                debugger
                this.$emit('input', lnglat.join(','));
                  
                this.geocoder.getAddress(lnglat, (status, result)=> {
                        if (status === 'complete'&&result.regeocode) {
                            this._valueLink( result.regeocode);
                        }else{
                            console.error('根据经纬度查询地址失败')
                        }
                    });
               
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
      this.geocoder = new AMap.Geocoder({
        // city: "010", //城市设为北京，默认：“全国”
        // radius: 1000 //范围，默认：500
    });
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
