(window.webpackJsonp=window.webpackJsonp||[]).push([[88],{643:function(e,t,n){},707:function(e,t,n){"use strict";n(643)},842:function(e,t,n){"use strict";n.r(t);n(239),n(118),n(82),n(11),n(83);var o,a=(null===(o=window._config)||void 0===o?void 0:o.amapStyleConfig)||{};delete a.region;var i={name:"DrawElementGis",props:{visible:{type:Object,default:function(){return{value:!1}}},zoom:{type:Number,default:function(){return 11}},title:{type:String,default:function(){return"选择位置"}},drawType:{type:String,default:function(){return"polygon"}},elementdata:{type:[Array],default:function(){return[]}}},model:{prop:"elementdata",event:"change"},data:function(){return{amapStyleConfig:a,center:[106.680603,29.402348],events:{},drawTypeClone:""}},computed:{elementType:function(){return"el-amap-"+this.drawType},elementInfo:function(){switch(this.drawType){case"marker":return{position:this.elementdata};case"polygon":case"polyline":return Array.isArray(this.elementdata)?{path:this.elementdata}:void console.warn("数据格式错误："+this.elementdata);case"circle":case"ellipse":case"rectangle":return this.elementdata;default:throw"不支持的图形:"+this.drawType}}},mounted:function(){},methods:{selectPointConfirm:function(){var e=this;this.elementdata.length<1?this.$alert("您还没有选择任何要素","",{confirmButtonText:"确定",showCancelButton:!0,callback:function(t){"confirm"===t&&(e.visible.value=!1)}}):this.visible.value=!1},clearDrawElement:function(){this.$emit("change",[]),this.initDrawTool()},handleClose:function(){this.$emit("change",[])},mapCreated:function(e){var t=this;console.log("----mapCreated---"),e.plugin(["AMap.MouseTool"],(function(){t.mouseTool=new AMap.MouseTool(e),t.initDrawTool()}))},initDrawTool:function(){var e=this;this.mouseTool[this.drawType]();AMap.event.addListener(this.mouseTool,"draw",(function(t){var n=t.obj.getPath(),o=[];n.forEach((function(e){o.push([e.lng,e.lat])})),console.log(o),e.mouseTool.close(!0),e.$emit("change",o)}))}}},l=(n(707),n(36)),s=Object(l.a)(i,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-dialog",{staticClass:"select-point-container",attrs:{title:e.title,visible:e.visible.value,width:"45vw","show-close":!0,"close-on-click-modal":!1,"close-on-click-escape":!1,"append-to-body":!0},on:{"update:visible":function(t){return e.$set(e.visible,"value",t)}}},[n("el-amap",e._b({staticClass:"amap-box",attrs:{vid:"amap-vue",events:e.events},on:{created:e.mapCreated}},"el-amap",e.amapStyleConfig,!1),[n(e.elementType,e._b({tag:"component",attrs:{editable:!0}},"component",e.elementInfo,!1))],1),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:e.clearDrawElement}},[e._v("清 除")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.selectPointConfirm}},[e._v("确 定")])],1)],1)}),[],!1,null,"6cb57cc3",null);t.default=s.exports}}]);