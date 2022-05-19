<template>
  <main class="  relative  page-container">
       <el-button icon="el-icon-sort" type="primary" circle @click="openDialog"></el-button>
        <el-dialog :visible.sync="dialogVisible"  :append-to-body="true" title="导入接口Json" class="hz-low-code">
            <el-input v-model="data.title" placeholder="请输入名称" ></el-input>
           <MonacoEditor 
              class="editor-content mt12"
              ref='moEditor'
              :code="this.data.code"
              :language="language"
              :changeThrottle="1000"
               :editorOptions="editorOptions"
            ></MonacoEditor>
            <el-button class="mt12" type="primary" @click="confirm">导入</el-button>
        </el-dialog>
  </main>
</template>
<script>
 
 

export default {
  name: "apiSchemLoader",
  components: {   },
  data() {
    return {
       editorOptions:{
        selectOnLineNumbers: false,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: true,
        glyphMargin: true
      },
      language:'javascript',
      data:{
        title:'',
        code:''
      },
      dialogVisible:false
    };
  },
  watch: {
    
  },
  methods:{
    
    confirm(){
      this.data.code=this.$refs.moEditor.editor.getValue()
      this.$emit('loaded',this.data)

    },
    openDialog(){
      this.dialogVisible=true
    },
    close(){
      this.dialogVisible=false

    }
  }
};
</script>
<style lang="less" scoped> 
.editor-content{
  min-height: 320px;
}
</style>
