(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{601:function(t,e,i){},670:function(t,e,i){"use strict";i(601)},798:function(t,e,i){"use strict";i.r(e);var n={name:"DyPage",props:{visible:{type:Boolean,required:!0},title:{type:String,default:""},navType:{type:String,default:"dialog"}},data:function(){return{}},computed:{},watch:{},mounted:function(){},components:{},methods:{goBack:function(){var t=this;"router"==this.navType&&this.$router.go(-1),this.$emit("update:visible",!1),this.$nextTick((function(){t.$emit("closed")}))}}},s=(i(670),i(36)),a=Object(s.a)(n,(function(){var t=this.$createElement,e=this._self._c||t;return e("transition",{attrs:{name:"slide-fade-left"}},[this.visible?e("main",{staticClass:"absolute top0 bottom0 left0 right0  flex flex-direction bg-white  z-index10 "},[e("header",{staticClass:"flex align-center vertical-center height50 border-b pl16"},[e("el-page-header",{attrs:{content:this.title},on:{back:this.goBack}})],1),this._v(" "),e("section",{staticClass:"p16 over-scroll flex1"},[this._t("default")],2)]):this._e()])}),[],!1,null,"792eec98",null);e.default=a.exports}}]);