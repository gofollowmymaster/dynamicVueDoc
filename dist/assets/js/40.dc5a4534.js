(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{414:function(e,t,r){"use strict";r.d(t,"j",(function(){return f})),r.d(t,"i",(function(){return m})),r.d(t,"k",(function(){return h})),r.d(t,"a",(function(){return b})),r.d(t,"e",(function(){return g})),r.d(t,"m",(function(){return v})),r.d(t,"f",(function(){return k})),r.d(t,"g",(function(){return O})),r.d(t,"l",(function(){return x})),r.d(t,"b",(function(){return I})),r.d(t,"d",(function(){return j})),r.d(t,"c",(function(){return D})),r.d(t,"h",(function(){return L}));var n=r(49),i=r(37),o=r(5),a=r(39),l=(r(117),r(156),r(158),r(11),r(29),r(59),r(119),r(118),r(121),r(122),r(20),r(247),r(24),r(157),r(84),r(38),r(238),r(246),r(120),r(31),r(30),r(243),r(244),r(245),r(242),{required:{message:"请[action][label]",trigger:"change",required:!0},email:{type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]},url:{type:"url",message:"请输入正确的网址",trigger:["blur","change"]},integer:{type:"integer",message:"请输入正确的[label]",trigger:["blur","change"]},regexp:{type:"regexp",message:"请[action]正确的[label]",trigger:["blur","change"]},customRegexp:{validator:function(e,t,r){e.regexp.test(t)?r():r(new Error(e.message))},message:"请[action]正确的[label]",trigger:["blur","change"]}});function s(e,t,r){if("string"==typeof e){var n=l[e];return Object(o.a)(Object(o.a)({},n),{},{message:c(n.message,u[t],r)})}if(e instanceof RegExp){var a=l.customRegexp;return Object(o.a)(Object(o.a)({},a),{},{regexp:e,message:c(a.message,u[t],r)})}return"object"==Object(i.a)(e)?e:{validator:e,trigger:"blur",required:!0}}function c(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"完善",r=arguments.length>2?arguments[2]:void 0;return(e=e.replace(/\[label\]/,r)).replace(/\[action\]/,t)}var u={FormRadio:"选择",FormSelect:"选择",FormInput:"填写",FormDate:"填写",FormDateRange:"填写",FormDateTime:"填写",FormMoneyInput:"填写",FormNumberInput:"填写",FormNormalNumber:"填写",FormRateNumber:"填写",FormTextareaNumber:"填写"},d=r(415);function f(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=["",void 0,null];return(r=t?r.concat(["undefined","null"]):r).includes(e)}var p=function(e){return Object.prototype.toString.call(e).toLowerCase().replace(/^\[object\s(\w+)\]$/,(function(){return arguments.length<=1?void 0:arguments[1]}))};function m(e){return null!=e}function h(e){return!!["[]","{}"].includes(JSON.stringify(e))}function b(e){return JSON.parse(JSON.stringify(e))}function g(e){var t=["object","array"];if(!t.includes(p(e)))return"必须传入对象或数组";var r=Array.isArray(e)?[]:{};for(var n in e)e.hasOwnProperty(n)&&(t.includes(p(e[n]))?r[n]=g(e[n]):r[n]=e[n]);return r}function y(e){return["object","array"].includes(p(e))}function v(e,t){var r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(["object","array"].includes(p(e)))for(var n in e)["object","array"].includes(p(e[n]))?v(e[n],t):(e[n]=t(n,e),r&&!m(e[n])&&delete e[n]);return e}function k(e,t){var r,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];for(r in e=g(e),t)if(e[r]&&t[r]&&["object"].includes(p(e[r]))){if(p(e[r])==p(t[r])){e[r]=k(e[r],t[r],n);continue}console.warn("合并对象异常,类型不匹配："+r)}else if(Array.isArray(e[r])){if(Array.isArray(t[r])){e[r].some((function(e){return y(e)}))?e[r]=Array.from(new Set([].concat(Object(a.a)(e[r]),Object(a.a)(t[r])))):e[r]=t[r];continue}console.warn("合并数组异常,类型不匹配："+r)}else m(t[r])||!n?e[r]=t[r]:delete e[r];return e}function O(e,t){var r,n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(!["object","array"].includes(p(e)))return e;for(r in n&&(e=g(e)),t)if(e[r]&&t[r]&&["object","array"].includes(p(e[r]))){if(p(e[r])==p(t[r])){e[r]=O(e[r],t[r],n);continue}console.warn("合并对象异常,类型不匹配："+r)}else m(t[r])?e[r]=t[r]:delete e[r];return e}function x(e){return d.a[e]||{}}var F={wraperProperties:{class:["grid-col-8","grid-col-lg-6","grid-col-sm-8","grid-col-ss-12","grid-col-xs-24","grid-col-pp-24"]},rules:[],properties:{},events:{},valueLink:{}};function I(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"array"!==p(e)?[]:(e=(e=g(e)).filter((function(e){return e.formable||e.formOption})).map((function(e){var t=k(F,e.formOption,!0);delete e.tableOption,delete e.formOption,delete e.searchable,delete e.formable,delete e.tableable;var r=t.extra;return delete t.extra,e.type=e.type||"FormInput",Object(o.a)(Object(o.a)(Object(o.a)({},e),t),r)})).map((function(e){return e.rules=e.rules.filter((function(e){return["object","function","string"].includes(Object(i.a)(e))})).map((function(t){return s(t,e.type,e.label)})),e})).reduce((function(e,t){var r=t.formSection?t.formSection:"";return t.formSection=void 0,e[r]?e[r]=e[r].concat([Object(o.a)({},t)]):e[r]=[Object(o.a)({},t)],e}),{}),1==(e=Object.entries(e).map((function(e){var r=Object(n.a)(e,2),i=r[0],a=r[1],l=t[i]||{};return Object(o.a)({label:i,children:a},l)}))).length&&(e[0].label=void 0),e)}var w={template:function(e,t){var r;return null!==(r=e[t])&&void 0!==r?r:""}};function j(e){if("array"!==p(e))return[];var t=g(e);return t=t.filter((function(e){return e.tableable||e.tableOption})).map((function(e){return e.tableOption=k(w,e.tableOption,!0),Object(o.a)(Object(o.a)({},e),Object(o.a)({sort:100},e.tableOption))})).sort((function(e,t){return e.tableOption.sort-t.tableOption.sort})).map((function(e){return delete e.formOption,delete e.searchable,delete e.formable,delete e.tableable,delete e.tableOption.sort,e}))}var E={wraperProperties:{class:["grid-col-6","grid-col-lg-4","grid-col-sm-6","grid-col-ss-8","grid-col-xs-12","grid-col-pp-24"]},properties:{}};function D(e){if("array"!==p(e))return[];var t=g(e);return(t=t.filter((function(e){return e.searchable||e.searchOption})).map((function(e){var t=k(E,e.searchOption,!0);delete e.tableOption,delete e.formOption,delete e.searchOption;var r="FormRadio"==e.type?"FormSelect":e.type;return Object(o.a)(Object(o.a)({},e),{},{type:r},t)}))).length>0?[{children:t}]:[]}function L(e){return Math.round(Math.random()*e)}},415:function(e,t,r){"use strict";r.d(t,"e",(function(){return n})),r.d(t,"f",(function(){return i})),r.d(t,"c",(function(){return o})),r.d(t,"g",(function(){return a})),r.d(t,"b",(function(){return u})),r.d(t,"d",(function(){return d}));r(11);var n={properties:{"label-width":"80px","label-position":"right"},showTestTool:!0,borderForm:!1,trigger:"click",resetable:!0},i={dataList:[],hasCheckbox:!0,properties:{stripe:!0,border:!0,"row-class-name":"","highlight-current-row":!0,selectable:!0,expand:!0,"show-header":!0,"empty-text":"暂无数据",align:"center","header-align":"center","row-style":{height:"40px"}},colOptions:{minWidth:60,"show-overflow-tooltip":!0}},o={small:!1,"current-page":1,pageSize:10,layout:"total,sizes, prev, pager, next, jumper","hide-on-single-page":!0,"page-sizes":[10,20,30,40,50]},a={lazy:!0,"node-key":"deptId",props:{label:"deptName",children:"children",isLeaf:"leaf"},"current-node-key":null,"highlight-current":!0,fieldName:"test"},l={formProperties:{"hide-required-asterisk":!1,"label-width":"100px","label-position":"top"},borderForm:!1,showFoldBtn:!0,showTestTool:!0,textModel:!1},s={class:["grid-col-24"],apiPromise:function(){return Promise.resolve()},data:{},formOption:l,formItemList:[],actions:{cancel:{actionType:"close",label:"取消"}}},c={container:"el-dialog",properties:{title:"",width:"70%"},body:{props:l,formItemList:[],data:{},formDataUpdateHandle:function(e,t){},actions:{save:{component:"el-button",permission:"",actionType:"submit",label:"保存",isloadData:!1,apiPromise:function(){return Promise.resolve()},properties:{type:"primary",size:"mini"},callback:{closeModal:!0,showTip:!0,refresh:!0}},cancel:{component:"el-button",isloadData:!1,properties:{type:"default",size:"small"},actionType:"close",label:"取消"}}}},u={component:"el-button",label:"",actionType:"dialogForm",permission:"",isloadData:!0,properties:{type:"primary",size:"small",key:""},dialog:c},d={component:"el-button",label:"",permission:"",actionType:"requestApi",properties:{type:"default",size:"small"},popconfirm:{"confirm-button-text":"好的","cancel-button-text":"不用了",title:"确定执行该操作吗？",icon:"el-icon-warning"},apiPromise:function(){return Promise.resolve()},callback:{showTip:!0,refresh:!0}};t.a={searchForm:n,tableOption:i,pagination:o,treeOption:a,formOption:l,DynamicForm:s,dialogFormOption:c,dialogPageActionOption:{component:"el-button",label:"",actionType:"dialogPage",properties:{type:"default",size:"small",key:""},permission:"",dialog:{properties:{title:""},container:"dy-page",layout:"LayoutGrid",body:[]}},dialogFormActionOption:u,requestApiActionOption:d}},432:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));r(63),r(89),r(11),r(126),r(20),r(24),r(118),r(31),r(30);var n=r(90);function i(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=Object(n.a)(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var i=0,o=function(){};return{s:o,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,l=!0,s=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return l=e.done,e},e:function(e){s=!0,a=e},f:function(){try{l||null==r.return||r.return()}finally{if(s)throw a}}}}},433:function(e,t,r){"use strict";var n=r(2),i=r(1),o=r(124),a=r(85),l=r(32),s=r(21),c=r(160),u=r(62),d=r(88)("splice"),f=i.TypeError,p=Math.max,m=Math.min;n({target:"Array",proto:!0,forced:!d},{splice:function(e,t){var r,n,i,d,h,b,g=s(this),y=l(g),v=o(e,y),k=arguments.length;if(0===k?r=n=0:1===k?(r=0,n=y-v):(r=k-2,n=m(p(a(t),0),y-v)),y+r-n>9007199254740991)throw f("Maximum allowed length exceeded");for(i=c(g,n),d=0;d<n;d++)(h=v+d)in g&&u(i,d,g[h]);if(i.length=n,r<n){for(d=v;d<y-n;d++)b=d+r,(h=d+n)in g?g[b]=g[h]:delete g[b];for(d=y;d>y-n+r;d--)delete g[d-1]}else if(r>n)for(d=y-n;d>v;d--)b=d+r-1,(h=d+n-1)in g?g[b]=g[h]:delete g[b];for(d=0;d<r;d++)g[d+v]=arguments[d+2];return g.length=y-n+r,i}})},598:function(e,t,r){"use strict";var n=r(2),i=r(60).findIndex,o=r(159),a=!0;"findIndex"in[]&&Array(1).findIndex((function(){a=!1})),n({target:"Array",proto:!0,forced:a},{findIndex:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),o("findIndex")},998:function(e,t,r){"use strict";r.r(t);var n=r(432),i=(r(119),r(255),r(82),r(11),r(83),r(29),r(120),r(59),r(240),r(123),r(84),r(20),r(24),r(598),r(156),r(433),r(414)),o={name:"DynamicFormContent",props:{data:{type:Object,default:function(){return{}}},formProperties:{type:Object,default:function(){return{}}},formItemList:{type:Array,default:function(){return[]}},showTestTool:Boolean,showFoldBtn:{type:Boolean,default:!1},allDisabled:{type:Boolean,default:!1},borderForm:{type:Boolean,default:!0},textModel:{type:Boolean,default:!1}},data:function(){return{currentFileds:[],changeData:{allDisabled:this.allDisabled,textModel:this.textModel},foldBlockList:[],scanType:"normal",singleScanBlock:""}},watch:{data:{handler:function(e){console.log("----this.data----"+JSON.stringify(e)),this.computeExpressions()},deep:!0,immediate:!0}},components:{},provide:function(){return{statusChangeFn:{setElementDisable:this.setElementDisable,setElementHidden:this.setElementHidden,setElementRequired:this.setElementRequired,updateFormData:this.updateFormData,valueUpdateEvent:this.valueUpdateEvent},changeData:this.changeData,formItemType:"",childChangeData:{},transExpression:this.transExpression}},created:function(){},methods:{getFormItemListInit:function(){return this.formItemListInit||(this.formItemListInit=Object(i.e)(this.formItemList),Object.freeze(this.formItemListInit)),this.formItemListInit},computeExpressions:function(){var e=this;this.getFormItemListInit().forEach((function(t,r){var n=/\$\{(.+)?\}/;if("string"==typeof t.hidden&&n.test(t.hidden)&&(e.formItemList[r].hidden=e.transExpression(t.hidden)),"string"==typeof t.disabled&&n.test(t.disabled)){var o=e.transExpression(t.disabled);e.setSectionElementDisable(e.formItemList[r].children,o)}!e.textModel&&t.children.forEach((function(t,o){for(var a in t.properties){var l=t.properties[a];if("string"==typeof l&&n.test(l)){if("required"==a){e.setElementRequired(t.key,e.transExpression(l));continue}if("value"==a){var s=e.transExpression(l);s!=e.data[t.key]&&e.$set(e.data,t.key,s);continue}e.formItemList[r].children[o].properties[a]=e.transExpression(l)}if("function"==typeof l){var c=l(e.data[t.key],Object(i.e)(e.data));c!==e.data[t.key]&&e.$set(e.data,t.key,c)}}"string"==typeof t.hidden&&n.test(t.hidden)&&(e.formItemList[r].children[o].hidden=e.transExpression(t.hidden))}))}))},transExpression:function(e){var t=this.data;return-1==(e=e.replace(/\$\{(.+?)\}/g,"instance.$1")).indexOf("return")&&(e="return ".concat(e)),new Function("instance",e)(t)},valueUpdateEvent:function(e){var t=this;this.$emit("formDataUpdated",this,e),this.formItemMap((function(e){e.formDataUpdateHandle&&e.formDataUpdateHandle(t.data[e.key],t.data)}))},getData:function(){return this.filterData(this.data)},updateFormData:function(e){var t=this;Object.keys(e).forEach((function(r){t.$set(t.data,r,e[r])}))},validate:function(e){var t=this;this.$refs.form.validate((function(r){if(r){var n=Object(i.a)(t.getData()),o=[];if(t.formItemList.forEach((function(e){e.children&&e.children.length>0&&e.children.forEach((function(e){"child-form"===e.type&&o.push(e.key)}))})),0===o.length)e(!!r,n);else{var a=o.map((function(e){return t.$refs[e][0].validateForm()}));Promise.all(a).then((function(){e(!!r,n)})).catch((function(){e(!1,n)}))}}}))},filterData:function(e){var t={};return this.formItemMap((function(r){"slot"!==r.type&&(t[r.key]=e[r.key])})),t},formItemMap:function(e){var t,r=Object(n.a)(this.formItemList);try{for(r.s();!(t=r.n()).done;){var i=t.value;if(i.children&&i.children.length>0){var o,a=Object(n.a)(i.children);try{for(a.s();!(o=a.n()).done;){if(e(o.value))return}}catch(e){a.e(e)}finally{a.f()}}}}catch(e){r.e(e)}finally{r.f()}},setElementRequired:function(e){var t=this,r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.formItemMap((function(n){if(n.key==e){var i=n.rules;if(i.length){var o=i.findIndex((function(e){return void 0!==e.required}));o>=0?i[o].required=r:i=i.push({required:r,message:"请输入",trigger:["change"]})}else i=[{required:r,message:"请输入",trigger:["change"]}];return t.$set(n,"rules",i),!0}}))},setSectionElementDisable:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.forEach((function(e,n){t.setElementDisable(e.key,r)}))},setElementDisable:function(e){var t=this,r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.formItemMap((function(n){if(n.key==e)return n.properties instanceof Object?t.$set(n.properties,"disabled",r):t.$set(n,"properties",{disabled:r}),!0}))},setElementHidden:function(e){var t=this,r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.formItemMap((function(n){if(n.key==e)return t.$set(n,"hidden",r),!0}))},resetFields:function(){var e=this;this.$refs.form.resetFields(),this.formItemMap((function(t){if(["FormChildForm","FormCurd"].includes(t.type)){var r=e.$refs[t.key];r instanceof Array?r[0].resetFields():r.resetFields()}}))},foldBlock:function(e){var t=e.label,r=this.foldBlockList.indexOf(t);-1===r?this.foldBlockList.push(e.label):this.foldBlockList.splice(r,1)},isBlocked:function(e){return this.foldBlockList.indexOf(e.label)>-1},getBlockClass:function(e){var t=e.class;return Object.assign({},t,{"block-item":this.borderForm,"block-hide":this.foldBlockList.indexOf(e.label)>-1})},getFormItemLabel:function(e){return this.textModel&&["left","right"].includes(this.formProperties["label-position"])?e.label+":":e.label}}},a=r(36),l=Object(a.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("main",{staticClass:"dynamic-form"},[r("el-form",e._b({ref:"form",class:{"border-form":e.borderForm},attrs:{model:e.data,"validate-on-rule-change":!0}},"el-form",e.formProperties,!1),[e._l(e.formItemList,(function(t){return[t.hidden?e._e():r("main",{key:t.label,staticClass:"pb12",class:e.getBlockClass(t)},[t.label?r("header",{staticClass:"block-nav flex justify-between "},[r("span",{staticClass:"block-text"},[e._v(e._s(t.label))]),e._v(" "),e.showFoldBtn&&e.borderForm&&!e.textModel&&"normal"===e.scanType?r("span",{staticClass:"block-fold-btn",on:{click:function(r){return e.foldBlock(t)}}},[e._v("\n          "+e._s(e.isBlocked(t)?"展开":"收起")+"\n          "),r("i",{class:["el-icon-arrow-"+(e.isBlocked(t)?"down":"up")]})]):e._e()]):e._e(),e._v(" "),r("article",{staticClass:"block-content relative y0 "},[r("section",{staticClass:"grid-wrap"},[e._l(t.children,(function(t){return["slot"==t.type?r(t.wrapertype,e._b({key:t.key,tag:"component",attrs:{label:e.getFormItemLabel(t)}},"component",t.wraperProperties,!1),[e._t(t.key)],2):"FormHide"==t.type?r("FormHide",{key:t.key,model:{value:e.data[t.key],callback:function(r){e.$set(e.data,t.key,r)},expression:"data[formItem.key]"}}):t.hidden?e._e():r("el-form-item",e._b({key:t.key,attrs:{rules:!e.textModel&&t.rules,label:e.getFormItemLabel(t),prop:t.key}},"el-form-item",t.wraperProperties,!1),[r(t.type||"FormInput",{key:t.key,ref:t.key,refInFor:!0,tag:"component",attrs:{item:t},model:{value:e.data[t.key],callback:function(r){e.$set(e.data,t.key,r)},expression:"data[formItem.key]"}})],1)]}))],2)])])]}))],2),e._v(" "),e.showTestTool&&!e.data.id?r("testTool",{attrs:{fields:e.formItemList,refFormName:"form"}}):e._e()],1)}),[],!1,null,"d2ad22a4",null);t.default=l.exports}}]);