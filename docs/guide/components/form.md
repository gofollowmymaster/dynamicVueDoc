
# 动态表单
## 全局

- 通过 json 数据来生成表单；
- 通过 data 数据给表单每个元素赋值；
- 支持表单校验；
- 表单支持分块显示；
- 支持单区块收起、展开；
- 支持表单元素全局禁用；
- 支持给表单加一个外框，增加区分度；
- 支持将表单模式切换为纯文本显示模式；
- 支持设置表单多列,单列,自适应布局；
- 二次开发自定义表单元素难度极低；
- 支持表单数据联动
- 自动测试（批量填充数据）
- 支持数据新增,修改,详情展示
- 支持将表单显示模式切换：长表单/带 tab 切换的短表单；todo



 ## 开箱可用的表单组件

- 文本输入框  ------  [FormInput](#forminput) 
- 文本域输入框 ---- [FormTextarea](#formtextarea) 
- 普通下拉框  ------  [FormSelect](#formselect) 
- 普通多选下拉框 -- [FormMulSelect](./#FormMulSelect) 
- 单选框  --------  [FormRadio](./#FormRadio) 
- 多选框   --------  [FormCheckbox](./#FormCheckbox)  
- 开关    ---------   [FormSwitch](./#FormSwitch)  
- 日期输入框 -----  [FormDate](./#FormDate) 
- 日期范围输入框 -- [FormDateRange](./#FormDateRange) 
- 日期时间输入框 -- [FormDateTime](./#FormDateTime) 
- 普通数字输入框 -- [FormIntNumber](./#FormIntNumber) 
- 数字输入框 ----- [FormDecimalNumber](./#FormDecimalNumber) 
- 金额文本输入框  --  [FormMoneyInput](./#FormMoneyInput) 
- 数值范围  -------  [FormNumberRange](./#FormNumberRange) 
- 地图选点  ------- [FormSelectPoint](./#FormSelectPoint) 
- 地图划区  ------- [FormDrawElement](./#FormDrawElement) 
- 字典下拉多选框  --  [FormDynamicSelect](./#FormDynamicSelect)  
- 前端增删改查表单 -  [FormCurd](./#FormCurd) 
- 文件上传 -------- [FormUpload](./#FormUpload) 
- 输入搜索下拉框  -- (todo)

  
## 表单交互
- 方案一   被动式  模板语法/function
- 方案二   主动式  valueLink
<!-- - 方案三   监听全局事件 -->

两者可以同时生效    但valueLink同时对该条数据配置值和其他状态时  会有问题


表单组件数据更新   1.用updateFormData    2.表单组件v-model   围栏方便调试,强制建议不要直接修改


### FormInput
### FormTextarea
### FormSelect
### FormMulSelect

   

