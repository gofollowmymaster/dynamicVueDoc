import moment from 'moment'
import Mock from "mockjs";

export function treeToMap (tree, childrenKey, key) {
  debugger
  return tree.reduce((prev, item, index) => {
    if (!item[key]) {
      console.log('---------warn-------', `key:${key} undefined in tree item`)
      return prev
    }
    if (item[childrenKey]) {
      const childrenList = item[childrenKey]
      prev[item[key]] = item
      return Object.assign(prev, treeToMap(childrenList, childrenKey, key))
    }
    prev[item[key]] = item
    return prev
  }, {})
}

export function treeToLineMap (tree, childrenKey, key) {
  debugger
  let res = {}
  tree.forEach((item, index) => {
    if (item[childrenKey]) {
      const childrenList = item[childrenKey]
      res = { ...res, ...treeToMap(childrenList, childrenKey, key) }
      return
    }
    if (!item[key]) {
      console.warn('---------warn-------', `key:${key} undefined in tree item`)
      return
    }
    res[item[key]] = item
  })
  return res
}

export function arrayToObject (arr, key) {
  return arr.reduce((prev, next) => {
    prev[next.id] = next
    return prev
  }, {})
}

// Date的format方法
function dateFormat (date, format) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return format
}

/*  转换long值为日期字符串
 *  l long值
 *  pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss
 */
export function getFormatDateByLong (l, pattern) {
  return getFormatDate(new Date(l), pattern)
}

function getFormatDate (date, pattern) {
  if (!(date instanceof Date)) {
    date = new Date()
  }
  if (!pattern) {
    pattern = 'yyyy-MM-dd hh:mm:ss'
  }
  return dateFormat(date, pattern)
}

export function deepCloneJson (json) {
  return JSON.parse(JSON.stringify(json))
}

// 对象扁平化
export function objFlat (obj) {
  var result = {}

  function recurse (src, prop) {
    var toString = Object.prototype.toString
    if (toString.call(src) === '[object Object]') {
      var isEmpty = true
      for (var p in src) {
        isEmpty = false
        recurse(src[p], prop ? prop + '.' + p : p)
      }
      if (isEmpty && prop) {
        result[prop] = {}
      }
    } else if (toString.call(src) === '[object Array]') {
      var len = src.length
      if (len > 0) {
        src.forEach(function (item, index) {
          recurse(item, prop ? prop + '.[' + index + ']' : index)
        })
      } else {
        result[prop] = []
      }
    } else {
      result[prop] = src
    }
  }
  recurse(obj, '')

  return result
}

export function isNullOrUndefined (variable) {
  return variable === null || variable === undefined
}
export function isNumber (obj) {
  return typeof obj === 'number' && isFinite(obj)
}

// 下载文件
export function downFile (data, name, suffix = '') {
  const content = data
  const blob = new Blob([content]) // 构造一个blob对象来处理数据
  // const fileName = 'monthAssess.xlsx' // 导出文件名
  // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
  // IE10以上支持blob但是依然不支持download
  if ('download' in document.createElement('a')) {
    // 支持a标签download的浏览器
    const link = document.createElement('a') // 创建a标签
    link.download = name + suffix // a标签添加属性
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    document.body.appendChild(link)
    link.click() // 执行下载
    URL.revokeObjectURL(link.href) // 释放url
    document.body.removeChild(link) // 释放标签
  } else {
    // 其他浏览器
    navigator.msSaveBlob(blob, name + suffix)
  }
}
 

/* 树形结构转一维数组
@createTime 2022-04-18
@createUser luyi
@updateTime 2022-04-18
@updateUser luyi

@params obj:[Object]，形式为：{id:1,children:[{id:2}]}，需要一个根节点
@params childrenKey，子节点的key，默认为children
@params noChildren，返回的一维数组是否不要children
*/
export function treeToLinearArray (
  obj,
  { childrenKey = 'children', noChildren = true } = {}
) {
  const result = []
  result.push(obj)
  if (obj[childrenKey] && obj[childrenKey].length) {
    ;(function deep (arr) {
      arr.forEach((unit) => {
        result.push(unit)
        if (unit[childrenKey] && unit[childrenKey].length) {
          deep(unit[childrenKey])
        }
        if (noChildren) {
          delete unit[childrenKey]
        }
      })
    })(obj[childrenKey])
  }
  if (result.length && noChildren) {
    delete result[0][childrenKey]
  }
  return result
}

/* 树形结构转一维数组(generator方式)
@createTime 2022-04-18
@createUser luyi
@updateTime 2022-04-18
@updateUser luyi

@params list:[Object]，形式为：[{id:1,children:[{id:11}]},{id:2,children:[id:21]}]
@params childrenKey，子节点的key，默认为children
@params noChildren，返回的一维数组是否不要children
@params addLevel，是否添加层级$level
@params routeSumPath，是否给路由累加path，一般用作处理$router的children为相对路径时
*/
export function treeToLinearArrayGenerator (
  list,
  {
    childrenKey = 'children',
    noChildren = true,
    addLevel = true,
    routeSumPath = false
  } = {}
) {
  const result = []
  const initialLevel = 1 // 初始层级
  const initialPath = ''
  const run = function * (arr, level, parentPath) {
    for (let i = 0; i < arr.length; i++) {
      const itemOrgin = arr[i]
      const itemPure = { ...arr[i] }
      if (noChildren) {
        // 删除children
        delete itemPure[childrenKey]
      }
      if (addLevel) {
        // 添加层级
        itemPure.$level = level
      }
      if (routeSumPath) {
        // 路由累加path
        if (itemPure.path) {
          if (itemPure.path.startsWith('/')) {
            itemPure.$sumPath = parentPath + itemPure.path
          } else {
            itemPure.$sumPath = parentPath + `/${itemPure.path}`
          }
        }
      }
      yield itemPure
      if (itemOrgin[childrenKey] && itemOrgin[childrenKey].length) {
        yield * run(itemOrgin[childrenKey], level + 1, itemOrgin.path)
      }
    }
  }
  const gen = run(list, initialLevel, initialPath)
  for (const item of gen) {
    result.push(item)
  }
  return result
}

export function hasValue (a) {
  if (a !== null && a !== undefined) {
    return true
  }
  return false
}

export function pureType (value) {
  const type = Object.prototype.toString.call(value).toLowerCase()
  return type.replace(/^\[object\s(\w+)\]$/, (...rest) => {
    return rest[1]
  })
}



const Random = Mock.Random;

export function mockDyFields(fields) {
  const mockInfo = {};
  fields.forEach((field) => {
    switch (field.type) {
      case "FormDate":
        mockInfo[field.key + "|1"] = "@date";
        break;
      case "FormDateTime":
        mockInfo[field.key + "|1"] = "@datetime";
        break;
      case "FormRadio":
      case "FormSelect":
        // mockInfo[field.key + "|1"] = field.options(
        //   Random.integer(0, field.options.length - 1)
        // );
        mockInfo[field.key + "|1"] = Random.integer(0, 3);
        break;
      case "FormIntNumber":
        mockInfo[field.key + "|1-100"] = 1;
        break;
      case "FormDecimalNumber":
        mockInfo[field.key + "|1-100.1-3"] = 1;
        break;
      default:
        mockInfo[field.key + "|1"] = "@cword";
    }
  });
  return  mockInfo;
}
 
export function  apiListMock(fields,num=10){
  return Mock.mock({
    ["list|"+num]: [mockDyFields(fields)],
    totalCount: 20,
  })
}


export function parseObject(obj) {
  let res;
  try {
    res = JSON.parse(obj, (k, v) => {
      if (typeof v === "string" && v.startsWith("function")) {
        return window.eval("(" + v + ")");
      }
      return v;
    });
  } catch (er) {
    try{
    res= eval(obj)
    }catch(err){
      console.error(err);
    }
    
  }
  return res;
}

