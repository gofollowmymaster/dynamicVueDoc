<template>
  <main class=" ">
    <component
      v-bind="$attrs"
      :is="container"
      :visible.sync="visible.value"
      :fullscreen="fullscreen"
      class="dialog-min-width  "
      custom-class="hz-low-code"
      :append-to-body="true"
    >
      <section v-if="visible.value">
        <DynamicFormContent
          ref="DynamicFormContent"
          :data="body.data"
          :formItemList="body.formItemList"
          @formDataUpdated="formDataUpdateHandle"
          v-bind="body.props"
        >
        </DynamicFormContent>
        <section
          class="flex mt12 p12"
          :class="{ 'align-right': container == 'dialog' }"
        >
          <el-button
            v-for="btn in body.btns"
            v-bind="btn.properties"
            v-permission="btn.permission"
            :key="btn.label"
            @click="actionHandle(btn)"
          >
            {{ btn.label }}
          </el-button>
        </section>
      </section>
    </component>
  </main>
</template>
<script>
import actionMixin from '../actionMixin'

export default {
  name: 'DynamicFormDialog',
  mixins:[actionMixin],
  props: {
    visible: Object,
    container: String,
    fullscreen: Boolean,
    body: {
      type: Object,
      default: function () {
        return {}
      }
    },
    properties: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },

  computed: {},
  mounted () {},
  components: {},
  methods: {
    reset() {
      this.$refs["DynamicFormContent"].resetFields();
    },
    actionHandle (action) {
       this.actionHandles(action)
    },
    formDataUpdateHandle (formVm, param) {
      if (this.body.formDataUpdateHandle) {
        this.body.formDataUpdateHandle(formVm, param)
      }
    },
    refresh(){
      this.$emit('formSubmited')
    }, 
    closeModal(){
      this.visible.value=false
    }
  }
}
</script>
<style lang="css" scoped>
.flex {
  display: flex;
}
.align-right {
  justify-content: flex-end;
}
/deep/ .el-dialog__wrapper {
  position: absolute;
}
</style>
