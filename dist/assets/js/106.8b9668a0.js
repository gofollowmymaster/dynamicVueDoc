(window.webpackJsonp=window.webpackJsonp||[]).push([[106],{999:function(e,t,n){"use strict";n.r(t);var s={name:"DynamicPage",props:{data:{},visible:Object,container:String,fullscreen:Boolean,body:{type:Array,default:function(){return[]}},properties:{type:Object,default:function(){return{}}}},computed:{},mounted:function(){console.log("----this.$attrs----",this.$attrs)},components:{},methods:{reset:function(){this.$refs.searchForm.resetFields()},actionHandle:function(e){var t=this;switch(e.actionType){case"submit":this.$refs.DynamicFormContent.validate((function(n,s){if(console.log(s),n){var a="function"==typeof e.dataAdapter?e.dataAdapter:function(e){return e},o="function"==typeof e.callback?e.callback:e.showTip&&function(e){t.visible.value=!1,t.$message&&t.$message("success",e.msg||e.message||"操作成功")};e.apiPromise(s).then(a).then(o)}}));break;case"close":this.visible.value=!1}}}},a=n(36),o=Object(a.a)(s,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("main",{staticClass:" "},[e.visible.value?n("section",{staticClass:"grid-wrap"},e._l(e.body,(function(t){return n(t.component,e._b({key:t.name,tag:"component"},"component",t.props,!1))})),1):e._e()])}),[],!1,null,"ce331a1e",null);t.default=o.exports}}]);