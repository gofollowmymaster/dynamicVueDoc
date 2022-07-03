<template>
  <!-- 普通输入框 -->
  <div
    :style="item.style || {}"
    :class="`form-unqiue-${item.key} ${getTextModel ? '' : 'hz-img-box'} ${bindOptions['list-type']==='table'&&'upload-table-list'}`"
    class="form-input-box form-item-box"
  >
    <el-upload
      v-if="!getTextModel"
      action=""
      :file-list="fileListInit"
      :before-upload="handleBeforeUpload"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      v-bind="bindOptions"
      :disabled="getDisabled"> 
     <div v-if="bindOptions.drag">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">{{item.tip}}</div>
      </div>
      <div v-else>
           <i v-if="bindOptions['list-type']=='picture-card'" class="el-icon-plus"></i>
           <el-button v-else  size="small" >{{item.btn_text||'上传'}}</el-button>
      </div>
      <div slot="tip" class="el-upload__tip">{{item.tip}}</div>
    </el-upload>

    <!-- 图片详情展示 -->
    <section  v-if="getTextModel&&fileList.length&&accept=='img'"   >
      <el-image  v-for="file in fileList" :key="file.fileUrl" class="mr12"
        style="width: 100px; height: 100px"
        :src="file.fileUrl" 
        :preview-src-list="fileList.map(file=>file.fileUrl)">
      </el-image>
    </section>

    <!-- 视屏详情展示 -->
    <section  v-if="getTextModel&&fileList.length&&accept=='video'"   >
      <video  v-for="file in fileList" :key="file.fileUrl" class="mr12"
        style="width: 100px; height: 100px"
        :src="file.fileUrl" >
      </video>
    </section>

    <!-- 图片预览 -->
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
     <!-- 文件详情展示 -->
    <DynamicCurd v-if="bindOptions['list-type']=='table'||(getTextModel&&accept!='img'&&accept!='video')" 
      :style="{padding:0}"
      :fields="fileFields"
      :apiPromises="apiPromises"
      :optionsProps="curdOptions" 
      entityLabel="附件"></DynamicCurd>
  </div>
</template>

<script>
import FormMixin from "./mixin";
import moment from 'moment'
import { appendToPreset } from '../../utils/tool';
const host=window._config?.staticHost
 
const  fileFields=[
  {
    type:'index',
    key:'index',
    label:'序号',
    tableOption:{
      width:60
    },
  },
  {
    key: "fileName",
    label: "名称",
    tableOption:{
    },
    formOption:{
      wraperProperties: {
        class: ['grid-col-24']
      },
    }

  },
  {
    key: 'fileSize',
    type: 'FormInput',
    label: '大小',
    // tableable:true,
     formOption:{
      wraperProperties: {
        class: ['grid-col-24']
      },
    }
     
  },
    {
    key: 'uploadTime',
    type: 'FormInput',
    label: '上传时间',
    tableable:true,
     formOption:{
      wraperProperties: {
        class: ['grid-col-24']
      },
    } 
  },
]

function getAccepts(accept){

    switch(accept){
        case 'img':
            return 'image/*';
        case 'video':
            return 'video/*';
        case 'doc':
            return `.doc,.docx,.xml,application/msword,
            application/pdf,application/vnd.ms-excel,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document,
            application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,`;
        default :
            return '*';
    } 
}
export default {
  name: "FormUpload",
  mixins: [FormMixin],
  data() {
    const self=this
    console.log('----this.downloadApi----',this.downloadApi)
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileFields,
      imgPrevUrl:host,
      apiPromises:{
        bulkdelete:(file)=> {
            const fileListNew=[]
            for(let fileItem in self.fileList){
              if(fileItem.fileId!==file.fileId){
                fileListNew.push(fileItem)
              }
            }
            self.handleRemove(file, fileListNew)
          return Promise.resolve({})
        },
        list:()=> Promise.resolve({list:self.fileList,totalCount:self.fileList.length}),
        detail: info=>Promise.resolve(info),
      },
      curdOptions:{
        topToolBar: null,
        searchFields: null,
        listOption: {
          hasCheckbox:false,
          lineActions: {
            update:null,
            detail:null,
            download:appendToPreset('downloadActionOption',{
              apiPromise:this.item.downloadApi,
              label:'下载'
            }) 
          }
        },
        treeOption: null,
      } ,
      fileListInit:[],
    };
  },
  computed:{
     accept(){
          let  accept=''
          const listType=this.item.properties?.['list-type']||this.item['list-type']
              if(['picture','picture-card'].includes(listType)){
                accept= 'img'
              }
          return accept||this.item.properties?.accept||this.item.accept
        },
        // 扩展属性，直接将属性配置，传到表单组件内部（即 Element UI 上）
        // 忽略属性【key、size】
        bindOptions () {
            let obj = Object.assign({}, this.item);
            obj={...obj,...obj.properties}
            
            obj.name=obj.key
            obj['http-request']=obj.apiPromise
            obj.multiple=obj.limit == 1 ? false : true
            obj.disabled= this.getTextModel?true:obj.disabled
            obj.accept=getAccepts(this.accept)

            if(obj.drag){
              obj['list-type']='text'
            }
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
                return this.value?.map(file=>file.fileId||file.id)||[];
            },
            set(v) {
                this.$emit('input', v);

                this._valueLink(v);
                this.statusChangeFn.valueUpdateEvent({
                    [this.item.key]: v,
                });
            }
        },
        fileList() {
          return this.value?.filter(file=>file.fileId||file.id).map(file=>{
            file.fileUrl=this.imgPrevUrl+file.fileUrl
            file.uploadTime=file.createTime||file.upLoadTime
            file.fileName=file.fileName||file.sourceName||file.saveName||file.name
            file.fileId=file.fileId||file.id
            return  file
          })||[];
        },
  },
  mounted(){
          
        this.fileListInit= this.value?.filter(file=>file.fileId||file.id).map(file=>{

          const fileUrl=this.imgPrevUrl+file.fileUrl.replace(/\\\\/g,'/')
          debugger
          console.log('----replace---', fileUrl)

          return {
            url:fileUrl,
            fileId:file.fileId||file.id,
            name:file.fileName||file.sourceName||file.saveName||file.name,
            fileSize: file.fileSize,
            fileType: file.fileType,
            uploadTime:file.createTime||file.upLoadTime,
          }
        })||[];
 
       
  },
  methods: {
    handleRemove(file, fileList) {
      debugger
      this.val = this.value.filter((unit) => unit.uid!=file.uid&&unit.fileId!==file.fileId)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess (res, file, fileList) {

      if(!res)return      //有重复请求   OPTION?
      if(!file.response)return      // 
    
      let fileId,fileUrl,fileName,fileSize,uploadTime,uid

      fileId = file.response.fileId
      fileUrl = file.response.fileUrl||file.url
      fileName = file.raw.name
      fileSize = file.raw.size
      uploadTime= moment(new Date()).format( 'YYYY-MM-DD HH:mm:SS')
      uid=file.uid
      const current=this.value||[]
      current.push({
        fileId,
        fileUrl,
        fileName,fileSize,uploadTime,
        uid
      })
      this.val=current
    },
    handleError(err){
      console.error(err)
    },
    handleBeforeUpload(){

    }
  },
};
</script>

<style scoped lang="css">
.form-input-box /deep/ .el-input {
  position: relative;
  width: 100%;
  height: 36px;
 
}
.upload-table-list  >>> .el-upload-list {
  display: none;
}
 
</style>
