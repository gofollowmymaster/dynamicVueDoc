---
pageClass:  wide-width-container
---
# 增删改查模板

props：
|  键   | 意义  |类型| 必选  |类型  |默认值   |备注   |
|  ----  | ----  |----  |----  |----  |----  |----  |----  |
| fields  | 字段列表 |array| √ | array | [] |   | 
| pageOption  | 页面配置 |Object|√  | Object | {} |   | 
| apiPromises  | 增删改查Api |Object|√  | Object | {} |  成员包括 create delete update list detail | 
| entityLabel  | 页面名称 |string|√  |String|  '' |   | 


## 字段配置
在搜索栏，列表，表单（新增、修改），详情场景中都会使用到字段信息，且通常情况下，字段是重叠的，所以Dy-Vue采用了一个字段列表来配置页面的字段。并通过相应的子项配置具体场景的特别配置信息，子项内的配置会覆盖通用配置
 
### 基础通用配置  
通用配置包括会在各种场景中公用的信息，具体信息包括：
|  键   | 意义  |类型| 必选  |默认值  |备注   
|  ----  | ----  |----  |----  |----  |----  |----  |
| key  | 字段名 | string |√ | - |formSection |  
| label  | 中文名 | string |× |'' |  |  
| type  | 表单组件名 | string |×  |FormInput | 支持的[表单组件](./form.html#表单组件)  | 
| formSection  | 表单区块 | string |×  |'' |按区块展示在表单、详情中 | 
| formOption  | 表单配置 |Object |×  |{} |有值时会在表单中展示 | 
| searchOption  | 搜索栏配置 | Object|×  |{} |有值时会在搜索栏中展示 | 
| listOption  | 列表配置 | Object|×  |{} |有值时会在列表中展示 |  
| detailOption  | 详情配置 | Object |×  |{} |有值时会在详情中展示， 会在表单基础上叠加，只在详情中有与表单中不一样的情况才需要配置 | 
 

### 字段表单配置子项 
> 字段表单配置子项，是针对表单新增，修改，详情（detailOption为非false）有效。通过配置可以实现表单内数据回显、校验、交互、提交，等**交互功能**，也可以定义表单**样式、布局**；
> 表单组件中，字段顺序是按照，字段先后顺序排列；所以无需特别配置

 |  键   | 意义  |类型| 必选  |默认值  |备注   
|  ----  | ----  |----  |----  |----  |----  |----  |
| wraperProperties  | 表单项包裹容器属性 | object |× | {} |包裹容器都为form-item 组件 Dy-Vue会将所有属性绑定到该组件 |  
| rules  | 验证规则 | array |× |[] | 成员可为字符串、正则、对象  字符串是系统预定义的验证规则 包括required email url integer |  
| properties  | 表单属性 | object |×  |{} |  成员值支持表达式语法，实现表单内容联动    required、value可配置在其内 实现动态定义表单项值以及必填验证    | 
| valueLink  | 表单联动配置 |Object |×  |{} |  表单联动配置 | 
| defaultValue  | 默认值 |Object |×  |{} |  默认值 | 
| hidden  | 是否显示 | reg |×  | | 控制该表单的显隐，支持表达式语法 | 
| extra  | 额外信息 | string |×  |'' |额外的表单属性，会一通绑定到表单上 | 

::: tip 字段表单配置说明
字段表单配置较灵活，原则上可以根据表单组件属性无限拓展，拓展属性即可放在extra内也可与extra同级，甚至可以不放在formOption中，Dy-Vue最终会将字段对象扁平化，删除wraperProperties、rules、properties、valueLink、defaultValue，searchOption，listOption等配置后，绑定到表单组件。 
:::

::: demo
``` html
<template>
<ClientOnly>

  <DynamicForm
    class="relative"
    :formOption="formOption"
    :formItemList="formItemList"
    :actions="actions"
  ></DynamicForm>
</ClientOnly>
  
</template>
<script>
const fields  =[
  {
    key: "name",                  
    type: "FormInput",           
    label: "姓名",           
    formSection: "基础信息",      
    formOption: {                  
      wraperProperties:{    //会传入elment 表单组件FormItem的参数props
        style: {},
        class: ['grid-col-24'],
      },
      rules: [                  //表单验证验证规则
       'required'  ,      //系统预置规则包括    required email url integer
      ],
      properties: {    //会传入elment 表单组件本身  支持表达式语法
        disabled: '#{status}==1',
        readOnly: '#{status}==3',
        required:'#{status}==2',
        clearable:true
      },
    },
  },
  {
    key: "status",
    type: "FormSelect",
    label: '多选框',
    formSection: "基础信息",      
    options: [          //select radio 相关组件有必填options信息
      {
        value: "1",
        label: "选我会给设置姓名disabled",
      },
      {
        value: "2",
        label: "选我会设置姓名必填",
      },
      {
        value: "3",
        label: "选我会设置姓名只读",
      },
    ],
    formOption: {
        valueLink: {    // 实现事件式数据联动
          '@*any*@':[          //为任何值 对address字段的操作
            {
              linkKey: "address",
              linkValue: function (data) {
                return '地址'+data
              },
            },
             {
              linkKey: "name",
              linkValue: function (data) {
                return '姓名'+data
              },
            },
          ],
        },
    },
  },
   {
    key: "cName",
    label: "公司名称",
    formSection: "职业信息",      
    formOption: {},
  },
  {
    key: "email",
    label: "邮箱",
    formSection: "职业信息",      
    formOption: {
         rules: [                  //表单验证验证规则
        'email',    //系统预置规则包括    required email url integer
       {                        //自定义规则
            message: '请输入***',
            trigger: 'blur',
            required: true
       }
      ],
    },
  },
    {
    key: "phone",
    label: "公司电话",   
    formSection: "职业信息",      
    formOption: {
      rules:[
         /^[1-9]\d{5}(?!\d)$/,     //正则表单式验证
      ]
    },
  }, 
  {
    key: "address",
    label: "公司地址",   
    formSection: "职业信息",      
    formOption: {
    },
  }, 
]

export default {
  data () {
    return {
      formOption:this.$appendToPreset('formOption',{
         
      }),
      formItemList:this.$buildFormFields(fields),
      actions:{
        save:{
          
        }
      }
    }
  }
}
 
</script>
```
:::

### 搜索栏配置子项 
> 搜索栏， 实质也是表单，所以理论上凡是表单配置子项都可以无缝配置在搜索栏子项中。
> 不过常态下搜索栏无需验证，表单项间无交互，所以rules，valueLink，hidden通常是无需配置的，总之搜索栏配置是表单配置的子集
>  默认情况下搜索字段顺序和表单相同是按照字段先后顺序排列；若需要更改循序需要添加sort，Dy-Vue会按照sort从小到大正序排列


|  键   | 意义  |类型| 必选  |默认值  |备注   
|  ----  | ----  |----  |----  |----  |----  |----  |
| wraperProperties  | 表单项包裹容器属性 | object |× | {} |包裹容器都为form-item 组件 Dy-Vue会将所有属性绑定到该组件 |  
| properties  | 表单属性 | object |×  |{} |  成员值支持表达式语法，实现表单内容联动    required、value可配置在其内 实现动态定义表单项值以及必填验证    | 
| defaultValue  | 默认值 |Object |×  |{} |  默认值 | 
| sort  | 顺序 | integer | ×  |10 | 相同时会按照字段本身先后循序排列 | 
| extra  | 额外信息 | string |×  |'' |额外的表单属性，会一通绑定到表单上 | 


::: tip 字段搜索栏配置说明
和字段表单配置一样，原则上可以根据表单组件属性无限拓展，拓展属性即可放在extra内也可与extra同级，甚至可以不放在searchOption中，Dy-Vue最终会将字段对象扁平化，删除wraperProperties、rules、properties、valueLink、defaultValue，searchOption，listOption等配置后，绑定到搜索表单组件。 
:::

::: demo
```html
<template>
<ClientOnly>

  <DynamicSearchForm
    class="relative"
    :options="searchOption"
    :fields="fields"
  ></DynamicSearchForm>
</ClientOnly>
  
</template>
<script>

const fields  =[
  {
    key: "name",                  
    type: "FormInput",           
    label: "姓名",           
    searchOption: {                  
      wraperProperties:{    //会传入elment 表单组件FormItem的参数props
        style: {},
        class: ['grid-col-8'],
      },
      properties: {    //会传入elment 表单组件本身  支持表达式语法
        clearable:true
      },
    },
  },
  
  {
    key: "status",
    type: "FormSelect",
    label: '多选框',
    options: [          //select radio 相关组件有必填options信息
      {
        value: "1",
        label: "11",
      },
      {
        value: "2",
        label: "22",
      },
      {
        value: "3",
        label: "33",
      },
    ],
    searchOption: {
      sort:1
    },
  },
   {
    key: "cName",
    label: "公司名称",
    formOption: {},
  },
  {
    key: "email",
    label: "邮箱",
    searchOption: true,
  },
   
]

export default {
  data () {
    return {
      searchOption:this.$appendToPreset('searchOption',{
         
      }),
      fields:this.$buildSearchFields(fields),
    }
  }
}
 
</script>
```
:::


### 表格配置子项 
> 表格配置,支持template属性，制定展示内容
> 默认情况下搜索字段顺序和表单相同是按照字段先后顺序排列；若需要更改循序需要添加sort，Dy-Vue会按照sort从小到大正序排列
> 对于配有options数组的字段，没有配置展示组件时，Dy-Vue会自动获取对应label作为展示用


|  键   | 意义  |类型| 必选  |默认值  |备注   
|  ----  | ----  |----  |----  |----  |----  |----  |
| template  | 默认值 |function |×  |{} |  默认返回原始值，可返回字符串或对象  | 
| sort  | 顺序 | integer | ×  |10 | 相同时会按照字段本身先后循序排列 | 
 

::: demo
```html
<template>
<ClientOnly>

  <DynamicTable
    class="relative"
    :table="tableOption"
    :columns="columns"
    :data="data"
  ></DynamicTable>
</ClientOnly>
  
</template>
<script>

const fields  =[
  {
    key: "name",                  
    type: "FormInput",           
    label: "姓名",           
    tableOption: {                  
        sort:2
    },
  },
  
  {
    key: "status",
    type: "FormSelect",
    label: '多选框',
    options: [          //select radio 相关组件有必填options信息
      {
        value: 1,
        label: "11",
      },
      {
        value: 2,
        label: "22",
      },
      {
        value: 3,
        label: "33",
      },
    ],
    tableOption: {
    },
  },
   {
    key: "cName",
    label: "公司名称",
    tableOption: {
      sort:1,
        template(row){
         return row.cName+'有限公司'
       }
    },
  },
  {
    key: "email",
    label: "邮箱",
    tableOption: true,
  },
   
]

export default {
  data () {
    return {
      tableOption:this.$appendToPreset('tableOption',{
         
      }),
      columns:this.$buildTableFields(fields),
      data:[
        {
          name:'李华',
          status:1,
          cName:'腾威网络',
          email:'q231542@163.com'
        }
      ]
    }
  }
}
 
</script>
```
:::


### 详情配置子项 

> 详情配置子项，本质上也是表单组件渲染，可通过配置表单展示模式，将表单展示为更界面友好的详情页，详情页面无需验证，valueLink交互，这些配置没有意义 
> 字段详情配置子项，通常无需配置，Dy-Vue会默认使用formOption配置，  特许场景下支持detailOption自定义配置，detailOption中配置将覆盖formOption配置  
> 默认情况下搜索字段顺序和表单相同是按照字段先后顺序排列；若需要更改循序需要添加sort，Dy-Vue会按照sort从小到大正序排列

 |  键   | 意义  |类型| 必选  |默认值  |备注   
|  ----  | ----  |----  |----  |----  |----  |----  |
| wraperProperties  | 表单项包裹容器属性 | object |× | {} |包裹容器都为form-item 组件 Dy-Vue会将所有属性绑定到该组件 |  
| properties  | 表单属性 | object |×  |{} |  成员值支持表达式语法，实现表单内容联动    required、value可配置在其内 实现动态定义表单项值以及必填验证    | 
| hidden  | 是否显示 | reg |×  | | 控制该表单的显隐，支持表达式语法 | 
| sort  | 顺序 | integer | ×  |10 | 相同时会按照字段本身先后循序排列 | 


::: demo
``` html
<template>
<ClientOnly>

  <DynamicForm
    class="relative"
    :formOption="formOption"
    :formItemList="formItemList"
    :actions="actions"
    :data="data"
  ></DynamicForm>
</ClientOnly>
  
</template>
<script>
const fields  =[
  {
    key: "name",                  
    type: "FormInput",           
    label: "姓名",           
    formSection: "基础信息",      
    formOption: {                  
      wraperProperties:{    //会传入elment 表单组件FormItem的参数props
        style: {},
        class: ['grid-col-24'],
      },
    },
  },
  {
    key: "status",
    type: "FormSelect",
    label: '多选框',
    formSection: "基础信息",      
    options: [          //select radio 相关组件有必填options信息
      {
        value: 1,
        label: "选我会给设置姓名disabled",
      },
      {
        value: 2,
        label: "选我会设置姓名必填",
      },
      {
        value: 3,
        label: "选我会设置姓名只读",
      },
    ],
    formOption: {
        
    },
  },
   {
    key: "cName",
    label: "公司名称",
    formSection: "职业信息",      
    formOption: {
      properties: {    //会传入elment 表单组件本身  支持表达式语法
        value: '${status}==3?"333":"222"',
      },
    },
  },
  {
    key: "email",
    label: "邮箱",
    formSection: "职业信息",      
    formOption: {
         
    },
  },
    {
    key: "phone",
    label: "公司电话",   
    formSection: "职业信息",      
    formOption: {
      
    },
  }, 
  {
    key: "address",
    label: "公司地址",   
    formSection: "职业信息",      
    formOption: {
    },
  }, 
]

export default {
  data () {
    return {
      formOption:this.$appendToPreset('formOption',{
         textModel:true
      }),
      formItemList:this.$buildFormFields(fields),
      data:{
        name:'李佩',
        cName:'滕王',
        status:1,
        email:'2312@we.com',
        phone:'18002356365',
        address:'重庆天一路',
      },
      actions:{
        cancel:{
          component:'el-button',
          label:'取消'
        }
      }
    }
  }
}
 
</script>
```
:::


## 页面配置
>常规增删改查页面几乎不需要特别配置，Dy-Vue已经预置了相关配置，但业务总是多变的，非常规页面的配置是开发的重点

::: demo 只配置字段示例
```html
<template>
<ClientOnly>

  <DynamicCurdPage
    :entityLabel="entityLabel"
    :fields="fields"
    :pageOptionsprops="pageOptions"
    :apiPromises="apiPromises"
  ></DynamicCurdPage>
</ClientOnly>

</template>
<script>

const entityLabel = '****'
 
const fields  =[
 { key: "keyWord",  label: "关键字", searchable: true },
  {key:'id'},
  {
    key: "sName",
    label: "姓名",
    formOption: {},
    tableOption: {
    },
  },
  {
    key: "latinSciName",
    label: "外号",
    tableable:true,
    formOption: {
    },
  },
  {
    key: "originalNumber",
    label: "原编号",   
    tableable:true,
    formOption: {
    },
  }, 
]

export default {
  data () {
    return {
      // 页面配置
      pageOptions: {
      },
      // 字段配置
      fields,
      entityLabel,
      // Api配置
      apiPromises:{
        create:mockApi,
        bulkdelete:mockApi,
        list:tableinfoListApi,
        detail:mockApi,
        update:mockApi
      },
    }
  }
}
//----------------------Api-------------------
function tableinfoListApi (params) {
  return import("../../.vuepress/components/vuePlugins/utils").then(module=>{
      return Promise.resolve(module.apiListMock(fields,5));
  })
}
function mockApi (data) {
  return Promise.resolve({})
}
</script>
```
:::

###  普通增删改查页面配置
>为减少使用过程中，重复配置常用增删改查相关页面配置，Dy-Vue预设了大量常用配置,使常规增删改查页面配置归零。
>只有当预设配置不能满足需求时，才需要额外传入页面配置项，Dy-Vue 会对用户传入的页面配置和预设配置进行深度递归合并，用户配置会自动覆盖预设配置

|  键   | 意义  |类型| 必选  |默认值  |备注   
|  ----  | ----  |----  |----  |----  |----  |----  |
| searchOption  | [搜索栏配置](#自定义搜索栏配置) | Object | ×  | 预设 | 搜索栏配置 | 
| topToolBar  | [上方工具栏操作按钮](#工具栏) | Object |×  | 上方操作按钮 |  | 
| listOption  | [列表配置](#列表配置) |Object |× | 预设| 列表配置 | 
| treeOption  | [左侧筛选树配置](#左侧筛选树) |Object| × | 预设 |   | 
| pagination  | [分页](#分页) | Object |×  |  分页配置|  | 




::: details   页面配置合并原则
1. 用户配置与预设配置数据类型（对象、数组） ，不相同时会丢弃用户配置，使用预设配置，
2. 两者都为对象，会继续进行深度递归合并
3. 两者都为数组  （-鼓励使用对象-）
  - 若预设配置成员都为基本类型，用户配置覆盖预设配置
  - 若预设配置成员包含非基本类型，会合并两者（很少发生）
4. 用户配置为null、undefined  会删除预设配置项 
5. 用户新增配置项，会合并到预设配置中
6. 其他情况，用户配置覆盖预设配置
:::

::: demo 用户配置示例
```html
<template>
<ClientOnly>

  <DynamicCurdPage
    :entityLabel="entityLabel"
    :fields="fields"
    :pageOptionsprops="pageOptions"
    :apiPromises="apiPromises"
  ></DynamicCurdPage>
</ClientOnly>

</template>
<script>

const entityLabel = '****'
 
const fields  =[
 { key: "keyWord",  label: "关键字", searchable: true },
  {
    key: "sName",
    label: "姓名",
    formOption: {
    },
    tableOption: {
    },
  },
  {
    key: "latinSciName",
    label: "外号",
    tableable:true,
    formOption: {
      wraperProperties:{
        class:['grid-col-24']    //覆盖预设配置分栏展示表单项
      }
    },
  },
  {
    key: "originalNumber",
    label: "原编号",   
    tableable:true,
    formOption: {
    },
  }, 
]

export default {
  data () {
    return {
      // 页面配置
      pageOptions: {
        topToolBar:{
          create:null,  //删除顶部新增操作按钮
        },
          treeOption:null,   //删除左侧tree
        },
 
      // 字段配置
      fields,
      entityLabel,
      // Api配置
      apiPromises:{
        create:mockApi,
        bulkdelete:mockApi,
        list:tableinfoListApi,
        detail:mockApi,
        update:mockApi
      },
    }
  }
}
//----------------------Api-------------------
function tableinfoListApi (params) {
  return import("../../.vuepress/components/vuePlugins/utils").then(module=>{
      return Promise.resolve(module.apiListMock(fields,5));
  })
}
function mockApi (data) {
  return Promise.resolve({})
}
</script>

```
:::

### 自定义搜索栏配置
参考搜索栏组件配置：[Dynamic-Search](/guide/components/search)

### 自定义上方操作栏配置
参考表单组件配置：[Dynamic-Action](/guide/actions/index)

### 自定义列表配置
参考列表组件配置：[Dynamic-List/Table](/guide/components/list)


### 自定义查询树配置

#### 预设/默认配置
```
{
  lazy: true,
  'node-key': 'deptId',
  props: {
    label: 'deptName',
    children: 'children',
    isLeaf: 'leaf'
  },
  'current-node-key': null,
  'highlight-current': true,
  fieldName: 'test'
}
```

### 自定义分页配置


#### 预设/默认配置
```
{
  small: false,
  'current-page': 1,
  pageSize: 10,
  layout: 'total,sizes, prev, pager, next, jumper',
  'hide-on-single-page': true,
  'page-sizes': [10, 20, 30, 40, 50]
  // background:true
}
```
 
## Api配置
>Api配置中包含增删改查相关Api函数，返回值均为Promise

|  键   | 意义  |类型| 必选  |默认值  |备注   
|  ----  | ----  |----  |----  |----  |----  |----  |
| create  | 新增 |function| × | ()=>Promise.reslove({}) |   | 
| bulkdelete  | 批量删除  |function |× | 同上|   | 
| list  | 列表 | function | ×  | 同上 |   | 
| detail  | 详情 | function |×  |  同上|  | 
| update  | 修改 | function |×  | 同上 |  | 
| delete  | 删除 | function |×  | 同上 | 未配置delete项是会尝试使用bulkdelete  | 

## 页面名称-entityLabel
>默认、预设情况下 新增/修改/详情 标题会依据页面名称自动生成，若需要自定义可在页面配置中配置以覆盖预设的标题

     
 