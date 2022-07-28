
# 动态表单
::: tip
表单是管理页面开发中的重点，也是最繁琐的部分，功能各异的表单项重复出现在项目的各个角落，表单项间相互依赖关系（交互联动）千变万化，
为了快速开发表单，各厂同学都有下足了工夫，动态表单项目不断推出。对此DyVue在前人的肩膀上也提供了自己的方案，相较而言，DyVue的动态表单方案上手简单，功能健全，预设了大量开箱即用的表单组件，并支持便捷的开发集成自定义组件。
能够轻松的构建复杂业务逻辑的表单
:::
## 功能特点

- 通过 json 数据来生成表单；
- 通过 data 数据给表单每个元素赋值；
- 支持设置表单多列,单列,自适应布局；
- 支持数据新增,修改,详情展示（切换为纯文本显示模式）；
- 支持多种方式实现表单数据联动 1.表达式语法   2.changeHandle
- 支持表单校验，预制了常见验证规则，配置简洁；
- 表单支持分块显示，支持单区块收起、展开；
- 二次开发自定义表单元素难度极低；
- 自动测试（批量填充数据）
- 支持将表单显示模式切换：**长表单**/带 tab 切换的短表单； 



 ## 开箱可用的表单组件

- 文本输入框  ------  [FormInput](#forminput) 
- 文本域输入框 ------ [FormTextarea](#formtextarea) 
- 富文本编辑 -------- [FormRichEditor](#FormRichEditor) 
- 普通下拉框  ------  [FormSelect](#formselect) 
- 普通多选下拉框 ---- [FormMulSelect](./#FormMulSelect) 
- 级联选择 ---------- [FormCascader](./#FormCascader) 
- 单选框  ----------  [FormRadio](./#FormRadio) 
- 多选框   ---------  [FormCheckbox](./#FormCheckbox)  
- 开关    ---------   [FormSwitch](./#FormSwitch)  
- 日期输入框 --------  [FormDate](./#FormDate) 
- 日期范围输入框 ----- [FormDateRange](./#FormDateRange) 
- 日期时间输入框 ----- [FormDateTime](./#FormDateTime) 
- 日期时间范围输入框 -- [FormDateTime](./#FormDateTimeRange) 
- 普通数字输入框 ----- [FormIntNumber](./#FormIntNumber) 
- 浮点数字输入框 ----- [FormDecimalNumber](./#FormDecimalNumber) 
- 百分比输入框 ------- [FormRateInput](./#FormRateInput) 
- 金额文本输入框  ---  [FormMoneyInput](./#FormMoneyInput) 
- 数值范围  --------  [FormNumberRange](./#FormNumberRange) 
- 滑块选择  --------  [FormNumberRange](./#FormNumberRange) 
- 文件上传 ---------- [FormSlider](./#FormSlider) 
- 颜色选择 ---------- [FormColorPicker](./#FormColorPicker) 
- 树型选择器 --------- [FormTreeSelect](./#FormTreeSelect) 
- 纯文本 ------------- [FormText](./#FormText) 
- 隐藏字段 ----------- [FormHide](./#FormHide) 
- 增删改查表格表单 ---- [FormCurd](./#FormCurd) 
- 可编辑表格 ---------- [FormTableEditable](./#FormTableEditable) 
- 子表单 -------------- [FormChildrenForm](./#FormChildrenForm) 
## 模板项目中附带的表单组件  
- 地图选点  --------- [FormSelectPoint](./#FormSelectPoint) 
- 地图划区  --------- [FormDrawElement](./#FormDrawElement) 
- 字典下拉多选框  --  [FormDynamicSelect](./#FormDynamicSelect)  
- 输入搜索下拉框  -- (todo)


  
## 表单交互
表单交互是开发业务开发中的重点，也是动态表单开发的难点，DyVue提供了两项配置实现表单的交互联动
- 方案一   被动式  模板语法/function
- 方案二   主动式  changeHandle

::: warning  注意
两者可以同时生效    但同时对一条数据配置值时，会因优先级问题出现问题
:::

## 表单开放Api
1. updateFormData   
更新表单数据
``` js
    formVm.updateFormData({
            key: value
        })
```
2. setElementRequired
``` js
   formVm.setElementRequired(key,isRequired)
```
3. setElementDisable
 ``` js
   formVm.setElementDisable(key,isDisable)
```
4. setElementHidden
``` js
   formVm.setElementHidden(key,isHidden)
```
5. resetFields
重置表单数据
``` js
   formVm.resetFields()
```
 


### FormInput
### FormTextarea
### FormSelect
### FormMulSelect

   

