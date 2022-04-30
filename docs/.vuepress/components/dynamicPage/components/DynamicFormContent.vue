<template>
  <main class="dynamic-form">
    <el-form
      v-bind="formProperties"
      :class="{ 'border-form': borderForm }"
      :model="data"
      :validate-on-rule-change="true"
      ref="form"
    >
      <template  v-for="(formSection, index) of formItemList">
      <main
        v-if="!formSection.hidden"
        :key="formSection.label"
        :class="getBlockClass(formSection)"
        class="pb12"
      >
        <header
          v-if="formSection.label"
          class="block-nav flex justify-between "
        >
          <span class="block-text">{{ formSection.label }}</span>
          <span
            class="block-fold-btn"
            v-if="showFoldBtn &&borderForm&& !textModel && scanType === 'normal'"
            @click="foldBlock(formSection)"
          >
            {{ isBlocked(formSection) ? '展开' : '收起' }}
            <i
              :class="[
                'el-icon-arrow-' + (isBlocked(formSection) ? 'down' : 'up')
              ]"
            ></i>
          </span>
        </header>
        <article class="block-content relative y0 ">
          <section class="grid-wrap">
            <template v-for="formItem in formSection.children">
              <component
                v-if="formItem.type == 'slot'"
                :is="formItem.wrapertype"
                :key="formItem.key"
                :label="getFormItemLabel(formItem)"
                v-bind="formItem.wraperProperties"
              >
                <slot :name="formItem.key"></slot>
              </component>
              <FormHide
                v-else-if="formItem.type=='FormHide'"
                v-model="data[formItem.key]"
                :key="formItem.key"
              >
              </FormHide>
              <el-form-item
                v-else-if="!formItem.hidden"
                :key="formItem.key"
                v-bind="formItem.wraperProperties"
                :rules="(!textModel)&&formItem.rules"
                :label="getFormItemLabel(formItem)"
                :prop="formItem.key"
              >
                <component
                  v-model="data[formItem.key]"
                  :is="formItem.type || 'FormInput'"
                  :ref="formItem.key"
                  v-bind:item="formItem"
                  :key="formItem.key"
                />
              </el-form-item>
            </template>
          </section>
        </article>
      </main>
      </template>
    </el-form>
    <testTool
      v-if="showTestTool && !data.id"
      :fields="formItemList"
      refFormName="form"
    ></testTool>
  </main>
</template>

<script>
import FormMixin from './mixin.js'
import { deepCopy, JSONDeepCopy } from '../utils/tool'



export default {
  name: 'DynamicFormContent',
  mixins: [FormMixin],

  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      }
    },
    formProperties: {
      type: Object,
      default: function () {
        return {}
      }
    },
    formItemList: {
      type: Array,
      default: () => []
    },
    showTestTool: Boolean,
    // 是否显示收起、展开按钮
    showFoldBtn: {
      type: Boolean,
      default: false
    },
    // 是否显示 全部收起、展开按钮
    showAllFoldBtn: {
      type: Boolean,
      default: false
    },
    // 是否显示浏览模式切换按钮
    showScanTypeBtn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentFileds: [], // 中间态数据，依赖于 fields。当 fields 改变时，这个会跟着一起变。
      changeData: {
        // 所有动态数据，更准确的说，是会重新赋值的，需要放到 data 里，才能实现响应式。这是因为 provide 本身的特性导致的
        allDisabled: this.allDisabled,
        // 隐藏的要素列表。这里的数组元素是该要素的 key。
        // 隐藏的要素，不进行校验。提交的时候，也要过滤掉
        textModel: this.textModel
      },

      foldBlockList: [], // 收起的区块（放在这个里面，该区块就只显示区块标题，不显示内容）
      scanType: 'normal', // normal 默认（大表单），single（表单只显示单个区块，上方显示所有区块的按钮组）
      singleScanBlock: '', // 单个模式时，显示哪个表单
      formItemListBak: null
    }
  },
  watch: {
    data: {
      handler (data) {
        console.log('----this.data----' + JSON.stringify(data))
        this.computeExpressions()
      },
      deep: true,
      immediate: true
    }
  },
  components: {},
  created () {},
  provide () {
    return {
      // 状态切换函数
      statusChangeFn: {
        // 设置为禁用
        setElementDisable: this.setElementDisable,
        // 设置为隐藏
        setElementHidden: this.setElementHidden,
        // 设置为必填
        setElementRequired: this.setElementRequired,
        // 更新其他数据
        updateFormData: this.updateFormData,
        valueUpdateEvent: this.valueUpdateEvent
      },
      // 会动态变化的数据（注意，来自 props【更上级组件】的数据，不能放这个里面，只能显式的通过 props 往下面传）
      changeData: this.changeData,
      formItemType: '',
      childChangeData: {},

      transExpression: this.transExpression
    }
  },
  methods: {
    computeExpressions () {
      if (!this.formItemListBak) {
        this.formItemListBak = deepCopy(this.formItemList)
      }

      this.formItemListBak.forEach((formSection, index) => {
          const reg = /\$\{(.+)?\}/
        
         if (typeof formSection.hidden === 'string' && reg.test(formSection.hidden)) {
            this.formItemList[index].hidden =
              this.transExpression(formSection.hidden)
          }
          if (typeof formSection.disabled === 'string' && reg.test(formSection.disabled)) {
              const disabled= this.transExpression(formSection.disabled)
              this.setSectionElementDisable(this.formItemList[index].children,disabled)
          }

        (!this.textModel)&&formSection.children.forEach((item, innerIndex) => {

          for (const key in item.properties) {
            const propertyValue = item.properties[key]
            // if(item.key=='name'){
            //   debugger
            // }
            if (typeof propertyValue === 'string' && reg.test(propertyValue)) {
              if (key == 'required') {
                this.setElementRequired(
                  item.key,
                  this.transExpression(propertyValue)
                )
                continue
              }
              this.formItemList[index].children[innerIndex].properties[key] =
                this.transExpression(propertyValue)
            }
          }
          if (typeof item.hidden === 'string' && reg.test(item.hidden)) {
            this.formItemList[index].children[innerIndex].hidden =
              this.transExpression(item.hidden)
          }
        })
      })
    },
    transExpression (expression) {
      const instance = this.data

      expression = expression.replace(/\$\{(.+)?\}/g, 'instance.$1')
      const func = new Function('instance', `return ${expression}`)
      const res = func(instance)
      return res
    },
    // 监听值更新
    valueUpdateEvent (params) {
      this.$emit('formDataUpdated', this, params)
    },

    getData () {
      return this.filterData(this.data)
    },
    // 更新数据
    updateFormData (data) {
      debugger
      Object.keys(data).forEach((key) => {
        this.$set(this.data, key, data[key])
      })
    },

    validate (fn) {
      // 先校验父级表单的值
      this.$refs.form.validate((valid) => {
        if (!valid) return
        // 克隆一份数据
        const data = JSONDeepCopy(this.getData())

        // 判断是否需要校验子表单
        const childFormKeyList = []
        this.formItemList.forEach((filed) => {
          if (filed.children && filed.children.length > 0) {
            filed.children.forEach((formItem) => {
              // 如果某一项是
              if (formItem.type === 'child-form') {
                childFormKeyList.push(formItem.key)
              }
            })
          }
        })

        if (childFormKeyList.length === 0) {
          if (valid) {
            fn(true, data)
          } else {
            fn(false, data)
          }
        } else {
          const validateList = childFormKeyList.map((key) => {
            return this.$refs[key][0].validateForm()
          })
          Promise.all(validateList)
            .then(() => {
              // 父表单校验也通过了，才算都通过
              if (valid) {
                fn(true, data)
              } else {
                // 否则即使子表单校验通过，父表单校验没通过，也是算不通过的
                fn(false, data)
              }
            })
            .catch(() => {
              fn(false, data)
            })
        }
      })
    },
    filterData (data) {
      const filteredData = {}
      this.formItemMap((formItem) => {
        if(formItem.type!=='slot'){
          filteredData[formItem.key] = data[formItem.key]
        }
      })
      return filteredData
    },
    formItemMap (func) {
      for (const formSection of this.formItemList) {
        if (formSection.children && formSection.children.length > 0) {
          for (const formItem of formSection.children) {
            const isOver = func(formItem)
            if (isOver) return
          }
        }
      }
    },
    
    // 设置某个要素必填
    // key：操作的 key
    // Required true，表示隐藏。而 false，表示取消隐藏
    setElementRequired (key, beRequired = true) {
      debugger
      this.formItemMap((formItem) => {
        if (formItem.key == key) {
          let rules = formItem.rules

          if (rules.length) {
            const requiredIndex = rules.findIndex(
              (item) => item.required !== undefined
            )
            if (requiredIndex >= 0) {
              rules[requiredIndex].required = beRequired
            } else {
              rules = rules.push({
                required: beRequired,
                message: '请输入',
                trigger: ['change']
              })
            }
          } else {
            rules = [
              {
                required: beRequired,
                message: '请输入',
                trigger: ['change']
              }
            ]
          }

          this.$set(formItem, 'rules', rules)
          return true
        }
      })
    },
    setSectionElementDisable(subFieldsList,beDisable=false){
      subFieldsList.forEach((field,index)=>{
          this.setElementDisable(field.key,beDisable)
      })
    },
    // 设置某个要素禁用
    // key：操作的 key
    // beDisable：必填，默认是 true，表示禁用。而 false，表示取消禁用
    setElementDisable (key, beDisable = true) {
      this.formItemMap((formItem) => {
        if (formItem.key == key) {
          if (formItem.properties instanceof Object) {
            this.$set(formItem.properties, 'disabled', beDisable)
          } else {
            this.$set(formItem, 'properties', { disabled: beDisable })
          }
          return true
        }
      })
    },

    // 设置某个要素隐藏
    // key：操作的 key
    // beHidden：必填，默认是 true，表示隐藏。而 false，表示取消隐藏
    setElementHidden (key, beHidden = true) {
      this.formItemMap((formItem) => {
        if (formItem.key == key) {
          this.$set(formItem, 'hidden', beHidden)
          return true
        }
      })
    },

    // 重置表单数据
    resetFields () {
      this.$refs.form.resetFields()
      this.formItemMap((formItem) => {
        // 如果某一项是
        if (formItem.type === 'child-form') {
          const a = this.$refs[formItem.key]
          if (a instanceof Array) {
            a[0].resetFields()
          } else {
            a.resetFields()
          }
        }
      })
    },
    // 收起/展开区块
    foldBlock (block) {
      const label = block.label
      const index = this.foldBlockList.indexOf(label)
      if (index === -1) {
        this.foldBlockList.push(block.label)
      } else {
        this.foldBlockList.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
