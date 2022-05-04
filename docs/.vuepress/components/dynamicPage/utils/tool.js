import { getRule } from './validate'
import presetConfig from '../presetConfig'

export function isEmpty (value, containEmptyString = false) {
  let emptyValues = ['', undefined, null]
  emptyValues = containEmptyString
    ? emptyValues.concat(['undefined', 'null'])
    : emptyValues
  return emptyValues.includes(value)
}
const superType = (data) => {
  const type = Object.prototype.toString.call(data).toLowerCase()
  return type.replace(/^\[object\s(\w+)\]$/, (...rest) => {
    return rest[1]
  })
}

export function hasValue (a) {
  if (a !== null && a !== undefined) {
    return true
  }
  return false
}

export function isObjEmpty(obj){
  if(['[]','{}'].includes(JSON.stringify(obj))){
    return true
  }
  return false
}

export function JSONDeepCopy (data) {
  return JSON.parse(JSON.stringify(data))
}

export function deepCopy (origin) {
  const valueTypes = ['object', 'array'] // 后面可以支持下 map、set 等
  if (!valueTypes.includes(superType(origin))) {
    return '必须传入对象或数组' // 若不是对象则结束
  }
  const target = Array.isArray(origin) ? [] : {} // 判别是数组还是对象
  for (const k in origin) {
    // 循环拷贝
    if (origin.hasOwnProperty(k)) {
      // 判断属性是否在对象自身上（非原型链上的父级属性）
      if (valueTypes.includes(superType(origin[k]))) {
        // 复杂类型，递归
        target[k] = deepCopy(origin[k])
      } else {
        target[k] = origin[k]
      }
    }
  }
  return target
}

function isObjectOrArray (obj) {
  return ['object', 'array'].includes(superType(obj))
}
export function objectFilter(obj,func,filterEmptyValue=true){
  if(['object','array'].includes(superType(obj))){
    for (let key in obj) {
          if(['object','array'].includes(superType(obj[key]))){
            objectFilter(obj[key],func)
            continue
          }

          obj[key]=func(key,obj)
          if(filterEmptyValue && !hasValue(obj[key]))delete obj[key]
    }
  }
  return obj
}



export function deepMerge (obj1, obj2, isDeleteNull=false) {

  obj1 = deepCopy(obj1)

  let key
  for (key in obj2) {
    // 都為對象
    if (obj1[key] && obj2[key] && ['object'].includes(superType(obj1[key]))) {
      if (superType(obj1[key]) == superType(obj2[key])) {
        obj1[key] = deepMerge(obj1[key], obj2[key], isDeleteNull)
        continue
      }
      console.warn('合并对象异常,类型不匹配：' + key)
      continue
    }
    // 都为数组
    if (Array.isArray(obj1[key])) {
      if (Array.isArray(obj2[key])) {
        // 数组成员都为非Object Array 时用 obj2[key] 覆盖obj1[key]
        if (obj1[key].some((item) => isObjectOrArray(item))) {
          obj1[key] = Array.from(new Set([...obj1[key], ...obj2[key]]))
        } else {
          obj1[key] = obj2[key]
        }
        continue
      }
      console.warn('合并数组异常,类型不匹配：' + key)
      continue
    }
    
    if (!hasValue(obj2[key])&&isDeleteNull) {
      delete obj1[key]
      continue
    }
    
    obj1[key] = obj2[key]
  }
  return obj1
}
//根据key合并  数组也按照索引直接合并
export function deepMergeByKey (obj1, obj2, clone = true) {
  if(!['object','array'].includes(superType(obj1))) return obj1
  if (clone) {
    obj1 = deepCopy(obj1)
  }
  let key
  for (key in obj2) {
    // 都為對象
    if (obj1[key] && obj2[key] && ['object','array'].includes(superType(obj1[key]))) {
      if (superType(obj1[key]) == superType(obj2[key])) {
        obj1[key] = deepMergeByKey(obj1[key], obj2[key], clone)
        continue
      }
      console.warn('合并对象异常,类型不匹配：' + key)
      continue
    }

    if (!hasValue(obj2[key])) {
      delete obj1[key]
      continue
    }
    obj1[key] = obj2[key]
  }
  return obj1
}

export function loadPresetConfig(presetKey){
  return presetConfig[presetKey]||{}
}
export function appendToPreset(presetKey,obj={}){
  return deepMerge(loadPresetConfig(presetKey),obj)
}

const formOptionDefault = {
  wraperProperties: {
    class: ['grid-col-8', 'grid-col-lg-6', 'grid-col-sm-8', 'grid-col-ss-12','grid-col-xs-24','grid-col-pp-24',]
  },
  rules: [],
  properties: {},
  events: {},
  valueLink: {}
}

export function buildFormFields (fields,formSections={}) {
  if(superType(fields)!=='array')return []

  fields = deepCopy(fields)
  // debugger
  fields = fields
    .filter((item) => item.formable || item.formOption)
    .map((item) => {
      const formOption = deepMerge(formOptionDefault, item.formOption, true)
      delete item.tableOption
      delete item.formOption
      delete item.searchable
      delete item.formable
      delete item.tableable
      const extra = formOption.extra
      delete formOption.extra
      item.type =item.type||'FormInput'

      return { ...item, ...formOption, ...extra }
    })
    .map((item) => {
      // 填充预设的验证规则
      item.rules = item.rules
        .filter((rule) =>
          ['object', 'function', 'string'].includes(typeof rule)
        )
        .map((rule) => {
          return getRule(rule, item.type, item.label)
        })

      return item
    })
    .reduce((prev, next) => {
      // 按formSection分组
      const formSection = next.formSection ? next.formSection : ''
      next.formSection = undefined
      if (prev[formSection]) {
        prev[formSection] = prev[formSection].concat([{ ...next }])
      } else {
        prev[formSection] = [{ ...next }]
      }
      return prev
    }, {})
  // 组建标准数据
  fields = Object.entries(fields).map(([key, value]) => {
    const sectionInfo=formSections[key] ||{}
    return { label: key, children: value,...sectionInfo }
  })
  // 只有一个section 不展示
  if (fields.length == 1) {
    fields[0].label = undefined
  }
  return fields
}

const tableOptionDefault = {
  template (row, key) {
    return row[key]??''
  }
}

export function buildTableFields (fields) {
  if(superType(fields)!=='array')return []

  // debugger
  let fieldsClone = deepCopy(fields)

  fieldsClone = fieldsClone
    .filter((item) => item.tableable || item.tableOption)
    .map((item) => {
      item.tableOption = deepMerge(tableOptionDefault, item.tableOption, true)
      return { ...item, ...{ sort: 100, ...item.tableOption } }
    })
    .sort((prev, next) => {
      return prev.tableOption.sort - next.tableOption.sort
    })
    .map((item) => {
      delete item.formOption
      delete item.searchable
      delete item.formable
      delete item.tableable
      // delete item.type
      delete item.tableOption.sort
      return item
    })

  return fieldsClone
}

const searchOptionDefault = {
  wraperProperties: {
    class: ['grid-col-6', 'grid-col-lg-4', 'grid-col-sm-6','grid-col-ss-8', 'grid-col-xs-12','grid-col-pp-24']
  },
  properties: {}
}
export function buildSearchFields (fields) {
  if(superType(fields)!=='array')return []

  let fieldsClone = deepCopy(fields)
  fieldsClone = fieldsClone
    .filter((item) => item.searchable || item.searchOption)
    .map((item) => {
      const searchOption = deepMerge(
        searchOptionDefault,
        item.searchOption,
        true
      )
      delete item.tableOption 
      delete item.formOption  
      delete item.searchOption  
      const type = item.type == 'FormRadio' ? 'FormSelect' : item.type
      return { ...item, type, ...searchOption }
    })

  return fieldsClone.length>0?[{ children: fieldsClone }]:[]
}
 

export function generatRandomNum(max){
  return Math.round(Math.random()*max)
}
