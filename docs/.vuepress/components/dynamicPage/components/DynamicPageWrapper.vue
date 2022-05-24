<template>
  <main>
    <slot></slot>
    <DynamicFormDialog v-bind="currentDialogForm"> </DynamicFormDialog>
    <DynamicPageDialog v-bind="currentDialogPage"> </DynamicPageDialog>
  </main>
</template>
<script>
export default {
  name: 'DynamicPageWrapper',
  props: {},
  data () {
    return {
      currentDialogForm: {
        visible: { value: false }
      },
      currentDialogPage: {
        visible: { value: false }
      }
    }
  },

  provide () {
    return {
      setGlobalDialogForm: this.setCurrentDialogForm,
      setGlobalDialogPage: this.setCurrentDialogPage
    }
  },
  mounted () {},
  components: {},
  methods: {
    setCurrentDialogForm (currentDialogForm) {
      currentDialogForm.visible = { value: true }
      this.currentDialogForm = currentDialogForm
    },

    setCurrentDialogPage (currentDialogPage) {
      currentDialogPage.visible = { value: true }
      this.currentDialogPage = currentDialogPage
    },
    close(){
      this.currentDialogForm.visible = { value: false }
      this.currentDialogPage.visible = { value: false }


    }
  }
}
</script>
<style lang="css" scoped></style>
