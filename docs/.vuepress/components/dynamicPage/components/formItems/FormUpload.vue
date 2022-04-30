<template>
  <!-- 普通输入框 -->
  <div
    :style="item.style || {}"
    :class="`form-unqiue-${item.key} ${getTextModel ? '' : 'hz-img-box'} ${bindOptions['list-type']==='table'&&'upload-table-list'}`"
    class="form-input-box form-item-box"
  >
    <el-upload
      v-if="!getTextModel"
      accept=""
      action=""
      :file-list="fileListInit"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      v-bind="bindOptions"
      :disabled="getDisabled"
    >
      <i v-if="bindOptions['list-type']=='picture-card'" class="el-icon-plus"></i>
      <el-button v-else  size="small" >{{item.btn_text||'上传'}}</el-button>
      <div slot="tip" class="el-upload__tip">{{item.tip}}</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible"  :append-to-body="true">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog> 
     <DynamicCurd v-if="bindOptions['list-type']=='table'||getTextModel" 
        :style="{padding:0}"
       :optionsProps="tableOptions"  ></DynamicCurd>
  </div>
</template>

<script>
import FormMixin from "./mixin";
import moment from 'moment'
import {
  buildFormFields,
  buildTableFields,
  deepMerge
} from '../../utils/tool'

import {
  pagination,
  tableOption,
  formOption
} from '../../presetConfig'

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
        class: ['grid-col-12']
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
        class: ['grid-col-12']
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
        class: ['grid-col-12']
      },
    }
     
  },
  
]
const formFields=buildFormFields( fileFields)

function getAccepts(accept){
    switch(accept){
        case 'img':
            return 'image/*';
        case 'word':
            return '.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        case 'word':
            return '.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } 
}
export default {
  name: "FormUpload",
  mixins: [FormMixin],
  data() {
    const self=this
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      tableOptions:{
        topToolBar: null,
        searchFields: null,
        tableFields: buildTableFields( fileFields),
        tableOption: {
          ...tableOption,
          hasCheckbox: false,
          loadListApi:  ()=>{
            debugger
            console.log(self.fileList)
            return Promise.resolve({list:self.fileList,totalCount:self.fileList.length})
          },
          lineActions: {
            detail: {
              component: 'el-button',
              label: '查看',
              actionType: 'dialogForm',
              properties: {
                key: 'detail',
                size: 'small',
              },
              apiPromise: info=>Promise.resolve(info),
              dialog: {
                title: "文件详情",
                width: "60%",
          
                body: { 
                  props: deepMerge(formOption,{ textModel: true, formProperties: {
                          'label-width': '100px',
                          'label-position': 'left'
                        },}),
                  formItemList: formFields,
                  data: {},
                  btns: {
                    save: null,
                    cancel:  {
                      actionType: "close",
                      label: "取消",
                    },
                  },
                },
              },
            },
            delete:{
              component:'el-button',
              label:'删除',
              actionType: "requestApi",
              properties: {
                key: "delete",
                size: "small",
              },
              popconfirm: {
                "confirm-button-text": "好的",
                "cancel-button-text": "不用了",
                title: "确定删除该项内容吗?",
                icon: "el-icon-warning",
                "icon-color": "yellow",
              },
              apiPromise: (file)=> {
                  
                  const fileListNew=[]
                  for(let fileItem in self.fileList){
                    if(fileItem.fileId!==file.fileId){
                      fileListNew.push(fileItem)
                    }
                  }
                  self.handleRemove(file, fileListNew)
                return Promise.resolve({})
              },
              callback:{
                    refresh:true,
                    showTip:true,
                }
            }
          }
        },
        treeOptions: null,
        pagination,
} ,
    fileListInit:[],
    // fileList:[],
    };

  },
  computed:{
             // 扩展属性，直接将属性配置，传到表单组件内部（即 Element UI 上）
        // 忽略属性【key、size】
        bindOptions () {
            let obj = Object.assign({}, this.item);
            obj={...obj,...obj.properties}
            
            obj.name=obj.key
            obj['http-request']=obj.apiPromise
            obj.multiple=obj.limit == 1 ? false : true
            obj.disabled= this.getTextModel?true:obj.disabled
            // obj['list-type']= obj['list-type']
            // :accept="item.accept"
            obj.accept=getAccepts(obj.accept)
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
                return this.value?.map(file=>file.fileId)||[];
            },
            
            set(v) {
                this.$emit('input', v);

                // 只有非子表单的情况下，才会冒泡上去数据变更
                if (this.formItemType !== 'childForm') {
                    this.statusChangeFn.valueUpdateEvent({
                        [this.item.key]: v,
                    });
                } else {
                    // 如果是子表单的话，执行内置的变更
                    this.childChangeData.valueUpdateEvent();
                }
            }
        },
        fileList() {
        return this.value?.filter(file=>file.fileId)||[];
    },

  },
  mounted(){
          
        this.fileListInit= this.value?.filter(file=>file.fileId).map(file=>{
          return {
            fileUrl:file.fileUrl,
            fileId:file.fileId,
          }
        })||[];
 
       
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
      debugger
      this.val = list.filter((unit) => unit.fileId)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
        handleSuccess (res, file, fileList) {
          debugger
      // if (fileList.every((unit) => unit.status !== 'uploading')) {
      //   this.closeLoading()
      // }
      if(!res)return      //有重复请求   OPTION?
      const list = fileList.map((unit) => {
        if (unit.response) {
            let fileId,fileUrl,fileName,fileSize,uploadTime

            fileId = unit.response.fileId
            fileUrl = unit.response.fileUrl||unit.url
            fileName = unit.raw.name
            fileSize = unit.raw.size
            uploadTime= moment(new Date()).format( 'YYYY-MM-DD HH:mm:SS')
            return {
          fileId,
          fileUrl,
          fileName,fileSize,uploadTime
        }
        }

        return unit
      })
      this.val = list.filter((unit) => unit.fileId)
    },
    handleError(err){
      console.error(err)
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
