import { deepCopy } from '../utils/tool'
import {DY_DIALOG,DY_DRAWER,DY_PAGE_WRAPER} from '../const'
export default {
  props: {},
  computed: {},

  methods: {
    actionHandles (action={}, actionData=null) {
      debugger
      let container=action.dialog?.container
      const extra= {}
      switch (action.actionType) {
       case 'dialogContent' :
        container==DY_DRAWER&&(extra.size=action.dialog.width)
        if(container==DY_PAGE_WRAPER){
          extra['custom-class']='page-dialog'
          extra['fullscreen']=true
          extra['modal']=false
          extra['close-on-click-modal']=false
          extra['close-on-click-modal']=false
        }
          this.dialogContentHandle(action, actionData, extra)
         break;
        case 'dialogForm':
          container==DY_DRAWER&&(extra.size=action.dialog.width)
          if(container==DY_PAGE_WRAPER){
            extra['custom-class']='page-dialog'
            extra['fullscreen']=true
            extra['modal']=false
            extra['close-on-click-modal']=false
            extra['close-on-click-modal']=false
          }
          this.dialogFormHandle(action, actionData,extra)
          break

        case 'requestApi':
          this.requestApiHandle(action, actionData)
          break
        case 'submit':
          if(this.$refs.DynamicFormContent){
            this.$refs.DynamicFormContent.validate((valid, data) => {
              console.log('---submit---', data)
              if (valid) {
                this.requestApiHandle(action, data)
              }
            })
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
       if(typeof vm.closeModal ==='function'){
        vm.closeModal()
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
          this.$emit('refreshCommand')
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
    dialogContentHandle(action, actionData=null, extra = {}){
      const dataAdapter =
        typeof action.dataAdapter === 'function'
          ? action.dataAdapter
          : (res) => {
            return res
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
            return res
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
        ...deepCopy(action.dialog),
        container: DY_DIALOG,
        size: action.dialog.width,
        visible: { value: true },
        ...extra
        // param: row,
      }
      data&&this.$set(this.currentDialogForm.body, 'data', data)
      this.$emit('openDialogForm',this.currentDialogForm)
    },
    setCurrentDialogContent (action,data=null,extra={}){
      this.currentDialogContent = {
        ...deepCopy(action.dialog),
        container: DY_DIALOG,
        size: action.dialog.width,
        visible: { value: true },
        ...extra
        // param: row,
      }
      data&&this.$set(this.currentDialogContent, 'data', data)
      this.$emit('openDialogContent',this.currentDialogContent)

    }
  }
}
