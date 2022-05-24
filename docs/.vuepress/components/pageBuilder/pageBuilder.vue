<template>
  <main class="hz-low-code relative  page-container">
    <div class="flex  full-height">
      <section class="relative width30 full-height border-r over-scroll"  ref="leftSection" id="left-section">
        <el-tabs type="card " v-model="current"  class="flex flex-direction full-height">
          <el-tab-pane label="字段配置" name="1" key="1" class="full-height">
            <MonacoEditor 
              class="editor-content "
              ref="fieldsEditor"
              v-show="current=='1'"
              :code="fieldsContent"
              :language="language"
              :changeThrottle="500"
               @mounted="editorMounted"
               @codeChange="onfieldsContentChange"
               :editorOptions="editorOptions"

            ></MonacoEditor>
          </el-tab-pane>
          <el-tab-pane label="页面管理" name="2" key="2">
            <MonacoEditor class="editor-content "
              v-if="current=='2'"
              ref="pageEditor"
              :code="pageConfig"
              :language="language"
              :changeThrottle="500"
               @codeChange="onpageConfigChange"
               :editorOptions="editorOptions"
            ></MonacoEditor>
          </el-tab-pane>
        </el-tabs>
    <apiSchemLoader ref="schemLoader" class="absolute top48 left16" @loaded="transApiSchem" ></apiSchemLoader>

      </section>
      <div class="resize" v-resize></div>
      <iframe
        ref="previewIframe"
        :src="$site.base+'pageBuilder/preview.html'"
        frameborder="0"
        class="full-height flex1 frame-container"
      ></iframe>
    </div>

  </main>
</template>
<script>

import apiSchemLoader from "./components/apiSchemLoader.vue";
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
  components: { apiSchemLoader },
  data() {
    return {
      // form字段
      fieldsContent: stringifyObj(fields),
      // 页面配置
      pageConfig:stringifyObj(pageConfig),
      current:'1',
      editorOptions:{
        selectOnLineNumbers: false,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: true,
        glyphMargin: true
      },
      language:'javascript'
    };
  },
  mounted(){
      const ro = new ResizeObserver( entries => {
        this.$refs.fieldsEditor&&this.$refs.fieldsEditor.editor?.layout()
        this.$refs.pageEditor&&this.$refs.pageEditor.editor?.layout()
      });
      // 观察一个或多个元素
      ro.observe(document.querySelector('#left-section'));
  },
  
  methods:{
    editorMounted(editor,other){
        
    this.$refs.fieldsEditor.monaco.languages.registerCompletionItemProvider(
        this.language,
        {
          triggerCharacters: ['ds.','.'],
          provideCompletionItems: (model, position) =>{
            const { lineNumber, column } = position
            // 光标前文本
            let textBeforePointer = model.getValueInRange({
              startLineNumber: lineNumber,
              startColumn: 0,
              endLineNumber: lineNumber,
              endColumn: column
            })
            console.log('---textBeforePointer---',textBeforePointer)
            textBeforePointer=textBeforePointer.split(' ').splice(-1).join('')
            
            if(['dyna'].includes(textBeforePointer)){

              return {suggestions: [  
                  {
                    label: 'connection("")', //显示的提示名称
                    detail: "说明",

                    insertText: 'connection("")', //选择后粘贴到编辑器中的文字
                    kind: 6

                  },
                  {
                    label: 'query("","")',
                    detail: "说明1",
                    insertText: 'query("","")',
                    kind: 7

                  },
                ]};
            }
            if(['ds.connection("").'].includes(textBeforePointer)){
              return {suggestions: [
                  {
                    label: 'query("")',
                    insertText: 'query("")',
                  },
                ]};
            }

          }
        }
      )
    },
    onfieldsContentChange(editor){
      const content =editor.getValue()
      this.$refs.previewIframe.contentWindow.postMessage(
        { origin: "jsEditor", type: "fields", content },
        "*"
      );
    },
    onpageConfigChange(editor){
      debugger
        const pageConfig =editor.getValue()
        this.$refs.previewIframe.contentWindow.postMessage(
          { origin: "jsEditor", type: "page", content: pageConfig },
          "*"
        );
    },
    transApiSchem(data){
      try{
      if(data.code){
          const code = JSON.parse(data.code)
      const fieldsContent=[{
        key:'keyword',
        label:'关键字',
        searchable:true,
      },{
        key:'index',
        type:'index',
        label:'序号',
        tableable:true
      }]
      
      let index=0
      for(let key in code){

         let fieldData={
           key,
           label:'label'+key.slice(0,8),
           type:'FormInput',
           formOption:{},
         }
          index<10&&(fieldData.tableOption={})
         fieldsContent.push(fieldData)
      }
      this.fieldsContent=JSON.stringify(fieldsContent,null,"\t")
       this.$refs.fieldsEditor&&this.$refs.fieldsEditor.editor.setValue(this.fieldsContent)
      }

      if(data.title){
          
        const pageConfig=JSON.parse(this.pageConfig)
        pageConfig.title=data.title 
        this.pageConfig=JSON.stringify(pageConfig)
      }

       this.$refs.schemLoader.close()

       
       }catch(err){
         this.$alert('解析数据失败:'+err)
       }





    }
  }
};
</script>
<style lang="less" scoped>
.border-r {
  border-right: solid 1px var(--main-color);
}
.page-container {
  height: calc(100vh - 3.6rem);
}
/deep/ .editor-content {
  height: 100%;
  min-height: 960px;
  width: 100%;
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
  // text-align: center;
  background: #969595;
  // border-radius: 5px;
  width: 2px;
  z-index: 1;
}
/deep/ .el-tabs__content{
  flex:1
}



/*拖拽区鼠标悬停样式*/
.resize:hover {
  background: #757575;
  // transform: scalex(2);
}
/deep/ .el-tabs__header{
  margin-bottom: 0px;
}
</style>
