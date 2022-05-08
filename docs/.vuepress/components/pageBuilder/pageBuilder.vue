<template>
  <main class="hz-low-code relative  page-container">
    <div class="flex  full-height">
      <section class="width30 full-height border-r over-scroll" >
        <el-tabs type="card " v-model="current"  >
          <el-tab-pane label="字段配置" name="1" key="1" >
            <js-editor
              v-show="current=='1'"
              v-model="fieldsContent"
              language="javascript"
            ></js-editor>
          </el-tab-pane>
          <el-tab-pane label="页面管理" name="2" key="2">
            <js-editor
              v-if="current=='2'"
              v-model="pageConfig"
              language="javascript"
            ></js-editor>
          </el-tab-pane>
        </el-tabs>
      </section>
      <div class="resize" v-resize></div>
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
import jsEditor from "./jsEditor.vue";
import fields from "./fields.js";
import pageConfig from "./pageConfig.js";
function    stringifyObj(json){
  return JSON.stringify(json, (k,v)=>{
        if(typeof v =='function'){
          return v.toString()
        }
        return v
      }, "\t")
}

export default {
  name: "pageBuilder",
  components: { jsEditor },
  data() {
    return {
      // form字段
      fieldsContent: stringifyObj(fields),
      // 页面配置
      pageConfig:stringifyObj(pageConfig),
      current:'1',
    };
  },
  watch: {
    fieldsContent: {
      handler(content) {
        this.$refs.previewIframe.contentWindow.postMessage(
          { origin: "jsEditor", type: "fields", content },
          "*"
        );
      },
      // immediate:true
    },
    pageConfig: {
      handler(pageConfig) {
        this.$refs.previewIframe.contentWindow.postMessage(
          { origin: "jsEditor", type: "page", content: pageConfig },
          "*"
        );
      },
      // immediate:true
    },
  },
};
</script>
<style lang="less" scoped>
.border-r {
  border-right: solid 1px var(--main-color);
}
.page-container {
  height: calc(100vh - 42px);
}
/deep/ .CodeMirror {
  height: 100%;
}
.frame-container {
  background: #f3f4fa;
}
.page-container /deep/ .CodeMirror-sizer{
  box-sizing: border-box;
}
.resize {
  cursor: col-resize;
  // position: absolute;
  // left: 195px;
  // top: calc(50% - 23px);
  line-height: 100px;
  text-align: center;
  background: #969595;
  // border-radius: 5px;
  width: 5px;
  z-index: 1;
}

/*拖拽区鼠标悬停样式*/
.resize:hover {
  background: #757575;
}
</style>
