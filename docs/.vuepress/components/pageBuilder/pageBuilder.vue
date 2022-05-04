<template>
  <main class="hz-low-code full-height page-cinainer">
    <div class="flex full-height relative">
      <section class="width30 full-height border-r">
        <js-editor v-model="fieldsContent" language='javascript'  class="full-height"></js-editor>
      </section>
      <iframe
        ref="previewIframe"
        src="/pageBuilder/preview"
        frameborder="0"
        class="full-height flex1 frame-container"
      ></iframe>
    </div>
  </main>
</template>
<script>
 
import jsEditor from "./jsEditor.vue"
import fields from "./fields.js";

const entityLabel = "古树名木";

export default {
  name: "pageBuilder",
  components: {jsEditor,},
  data() {
    return {
      // form字段
      fieldsContent:JSON.stringify(fields,null,'\t'),
      // 页面配置
    };
  },
  watch:{
    fieldsContent:{
      handler(content){
        this.$refs.previewIframe.contentWindow.postMessage({origin:'jsEditor',content},'*')
      },
      // immediate:true
    }
  }
};
</script>
<style lang="less" scoped>
 
.border-r{
  border-right: solid 1px var(--main-color);
}
.page-cinainer{
  height: calc(100vh - 42px);
}
/deep/ .CodeMirror{
  height: 100%;
}
.frame-container{
    background:#f3f4fa;

}
</style>
