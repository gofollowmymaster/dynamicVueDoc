<template>
 
    <component
      v-bind="properties"
      :is="container"
      :visible.sync="visible.value"
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
          :class="{ 'align-right': container == 'dialog' }">
          <el-button
            v-for="action in body.actions"
            v-bind="action.properties"
            v-permission="action.permission"
            :key="action.label"
            @click="actionHandle(action)"
          >
            {{ action.label }}
          </el-button>
        </section>
      </section>
    </component>

</template>
<script>
import actionMixin from '../actionMixin'

export default {
  name: 'DynamicFormDialog',
  mixins:[actionMixin],
  props: {
    visible: {
      type:Object,
      default(){
        return {value:false}
      }
    },
    container: {
      type:String,
      default:'el-dialog'
    },
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
  mounted () {
    debugger
    console.log(this)
  },
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
    // refresh(){
    //   this.$emit('formSubmited')
    // }, 
    closeModal(){
      this.visible.value=false
    }
  }
}
</script>
<style lang="css" scoped>

</style>
