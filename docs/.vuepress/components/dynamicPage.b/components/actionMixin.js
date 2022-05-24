import { deepCopy } from '../utils/tool'
import {DY_DIALOG,DY_DRAWER,DY_PAGE_WRAPER} from '../const'
export default {
  props: {},
  computed: {},

  methods: {
    actionHandles (action={}, actionData=null) {
       
      let  dialog
      switch (action.actionType) {
       case 'dialogPage' :
         dialog=action.dialog
        if(dialog.container==DY_DRAWER){
          dialog.properties={size:dialog.properties.width,direction:'rtl',...dialog.properties}
        }
          this.dialogPageHandle(action, actionData)
         break;
        case 'dialogForm':
           dialog=action.dialog
          if(dialog.container==DY_DRAWER){
            dialog.properties={size:dialog.properties.width,direction:'rtl',...dialog.properties}
          }
          this.dialogFormHandle(action, actionData)
          break

        case 'requestApi':
          this.requestApiHandle(action, actionData)
          break
        case 'submit':
          const DynamicFormContent=this.$refs.DynamicFormContent||this.$parent.$refs.DynamicFormContent
          if(DynamicFormContent){
            DynamicFormContent.validate((valid, data) => {
              console.log('---submit---', data)
              if (valid) {
                this.requestApiHandle(action, data)
              }
            })
          }else{
            console.warn('submit 动作 在组件中没有定义对应的 DynamicFormContent 表单 ref,')
          }

          break
          case 'reset':
            const DynamicFormContent2=this.$refs.DynamicFormContent||this.$parent.$refs.DynamicFormContent
            if(DynamicFormContent2){
              DynamicFormContent2.resetFields()
            }else{
              console.warn('submit 动作 在组件中没有定义对应的 DynamicFormContent 表单 ref,')
            }
  
            break
        case 'close':
          this.closeModalHandle(action)
          break
        case 'link':
            this.linkHandle(action)
            break
        case 'router':
            this.routerHandle(action)
              break
        default:
          this.customActionHandle(action, actionData)
      }
    },
  
    requestApiHandle (action, actionData) {
      const dataAdapter =
        typeof action.dataAdapter === 'function'
          ? action.dataAdapter
          : (res) => {
            return res
          }
          
      action
        .apiPromise(actionData)
        .then(dataAdapter)
        .then((res) => {
          
          if( action.callback instanceof Object){
            for(const callbackItem in action.callback){
              debugger
                typeof this[callbackItem+'Handle'] =='function' && this[callbackItem+'Handle'](action.callback[callbackItem],res)
            }
          }
        })
    },
    closeModalHandle(action){
        this.closeModal(this)
    },
    closeModal(vm){
      if(vm.visible){
        if( vm.visible instanceof Object){
          vm.visible.value = false
          return 
        }
        vm.visible=false
        return
      }
       if(typeof vm.close ==='function'){
        vm.close()
        return 
      } 
      vm.closeModal(this.$parent)
    },

    refreshHandle(refresh){
      if(typeof refresh==='function'){
        refresh()
        return
      }
      if(refresh===true){
        if(typeof this.refresh =='function'){
          this.refresh()
        }else{
          this.$dynamicBus.$emit('dynamicRefresh')
        }
      }
      
    },
    emitEventHandle(eventName,data){
      (typeof eventName =='string')&&this.$emit(eventName, data) // formSubmited
    },
    showTipHandle(showTip,data){
      (showTip===true) &&
      this.$message &&
      this.$message({
        type: 'success',
        message: data.msg || data.message || '操作成功'
      })
    },
    linkHandle(action){
      window.open( action.link, action.window)
    },
    routerHandle(action){
      const routerAction= this.$router[action.routerAction]||this.$router.push
      routerAction(action.router)
    },

    customActionHandle (action,actionData) {
      if(typeof action.actionHandle=='function'){
        action.actionHandle(actionData)
        return
      }
      console.warn('定义了未被识别的动作'+JSON.stringify(action))
    },
    dialogPageHandle(action, actionData=null, extra = {}){
      debugger
      const dataAdapter =
        typeof action.dataAdapter === 'function'
          ? action.dataAdapter
          : (res) => {
            return res||{}
          }
          if (!action.apiPromise) {
            const data = dataAdapter(actionData)
            this.setCurrentDialogContent(action,data,extra)
            return
          }
    
          action
            .apiPromise(actionData) // todo  自定义主键
            .then(dataAdapter)
            .then((data) => {
              this.setCurrentDialogContent(action,data,extra)
            })      
    },
    dialogFormHandle (action, actionData=null, extra = {}) {
      const dataAdapter =
        typeof action.dataAdapter === 'function'
          ? action.dataAdapter
          : (res) => {
            return res||{}
          }
      if (!action.apiPromise) {
        const data = dataAdapter(actionData)
        this.setCurrentDialogForm(action,data,extra)
        return
      }
      action
        .apiPromise(actionData) // todo  自定义主键
        .then(dataAdapter)
        .then((data) => {
          this.setCurrentDialogForm(action,data,extra)
        })
    },
    setCurrentDialogForm(action,data=null,extra={}){
      
      this.currentDialogForm = {
        container: DY_DIALOG,
        ...deepCopy(action.dialog),
        // size: action.dialog.width,
        // visible: { value: true },
        ...extra,
      }
      this.currentDialogForm.body.data= data

      // this.$emit('openDialogForm',this.currentDialogForm)
      debugger
      this.$globalDialogForm(this.currentDialogForm,this.actionBarWraper)

    },
    setCurrentDialogContent (action,data=null,extra={}){

      this.currentDialogContent = {
        container: DY_DIALOG,
        ...deepCopy(action.dialog),
        // ...action.dialog,
        ...extra,
      }
      this.currentDialogContent.data=data
      // this.$emit('openDialogContent',this.currentDialogContent)
      debugger
      this.$globalDialogPage(this.currentDialogContent,this.actionBarWraper)

    
    }
  }
}
