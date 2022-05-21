# 动态表单
1. 简介
   - 通过JSON配置生成表单
   - 
2. 全局功能
    - 通过 json 数据来生成表单；
    - 通过 data 数据给表单每个元素赋值；
    - 支持表单校验；
    - 表单支持分块显示；
    - 支持单区块收起、展开；
    <!--- 支持将表单显示模式切换：长表单/带 tab 切换的短表单；-->
    - 支持表单元素全局禁用（例如提交时）；
    - 支持给表单加一个外框，增加区分度；
    - 支持将表单模式切换为纯文本显示模式；
    - 支持设置表单为一行四列/两列/一列；
    - 二次开发自定义表单元素难度极低；
    - 自动测试（批量填充数据）
 3.表单元素功能
    - 文本输入框 FormInput
    - 金额文本输入框 FormMoneyInput
    - 文本域输入框  FormTextarea
    - 普通下拉框 FormSelect
    - 普通多选下拉框  FormMulSelect
    - 日期输入框   FormDate
    - 日期范围输入框 FormDateRange
    - 日期时间输入框  FormDateTime
    - 普通数字输入框  FormIntNumber
    - 数字输入框  FormDecimalNumber（自动千分位，支持整数限制、非负数限制、小数点后自动补零、前方添加特殊符号（比如￥），后方添加特殊符号）   
    - 单选框    FormRadio
    - 地图选点  FormSelectPoint
    - 地图划区  FormDrawElement
    - 字典下拉多选框  FormDynamicNulSelect    (todo)
    - 多选框  FormCheckbox    (todo)
    - 输入搜索下拉框   (todo)


4.声明配置解读

```

[{
    key: "name",                  
    type: "FormInput",           
    label: "公园名称",           
    formSection: "基础信息",      
    formOption: {                  
      wraperProperties:{    //会传入elment 表单组件FormItem的参数props
        style: {},
        class: [],
      },
      rules: [                  //表单验证验证规则
       'required'  ,'email'    //系统预置规则包括    required email url integer
       /^[1-9]\d{5}(?!\d)$/     //正则表单式验证
       {                        //自定义规则
            message: '请输入***',
            trigger: 'blur',
            required: true
       }
      ],
      properties: {    //会传入elment 表单组件本身  支持表达式语法
        disabled: '${natureDictId}==1',
        readOnly: '${natureDictId}==3',
        required:'${natureDictId}==2',
        clearable:true
      },
    },
  },
  {
    key: "natureDictId",
    type: "FormSelect",
    label: '多选框',
    options: [          //select radio 相关组件有必填options信息
      {
        value: "1",
        label: "选我会给输入框赋值】",
      },
      {
        value: "2",
        label: "选我会隐藏输入框",
      },
    ],
    formOption: {
        valueLink: {    // 实现事件式数据联动
          "1": [        //当前natureDictId 为1时 的联动
              {
                linkKey: "name",       当前natureDictId 为1时 对name字段的操作
                linkValue: function (value) {    //设置name 字段值
                  return value+1
                },
                linkRequired: false,              //设置name 字段非必填
                linkDisable: true,                // 设置name 字段 不可用
                linkHidden: true,                 //设置name 字段 隐藏
              },
            ],
          '@*any*@':[           当前natureDictId 为任何值 对name字段的操作
            {
              linkKey: "address",
              linkValue: function (data) {
                return data.formattedAddress
              },
            },
          ],
        },
        properties:{
          onFocus(data){
          }
        },
        event:{
            onFocus: function remarkOnFocus({event,option,value}) {
              console.log("----onfocus----",option,value);
            },
            onblur:function remarkonblur({event,option,value}) {
              console.log("----onblur----",option,value);
            }
        }
    },
  },]

```
 

数据交互的两种方式: 模板语法 vs valueLink
模板语法为数据驱动(计算属性)   valueLink(变动后hook)
两者可以同时生效    但valueLink同时对该条数据配置值和其他状态时  会有问题


表单组件数据更新   1.用updateFormData    2.表单组件v-model   围栏方便调试,强制建议不要直接修改


一份json配置演化三表单
一般来说，表单分为三态：【新增（无初始数据）】、【编辑（有初始数据）】、【详情（有初始数据但纯文本显示）】
     

 [Akismet插件介绍](https://cn.bluehost.com/blog/wordpress/7397.html)