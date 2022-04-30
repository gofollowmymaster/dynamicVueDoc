import Vue from 'vue'
import { treeToLinearArrayGenerator } from './utils'
import globalStorageConstant from './globalStorage'

const {
  localStorage: { GlobalMenuPermissionList }
} = globalStorageConstant

Vue.directive('permission', {
  bind: function (el, binding, vnode) {
    let hasPermission = false
    const permissionList = localStorage.getItem(GlobalMenuPermissionList)
      ? JSON.parse(localStorage.getItem(GlobalMenuPermissionList))
      : []
    const linear = treeToLinearArrayGenerator(permissionList)
    const route = vnode.context.$route
    const menus = linear.filter((unit) => unit.menuUrl === route.path)
    // console.log('权限按钮测试', linear, route, menus)
    if (menus.length) {
      const menuId = menus[0].id
      const btnNames = linear
        .filter((unit) => unit.parentId === menuId && unit.menuType === 2)
        .map((unit) => unit.menuName)
      console.log(`${route.name}(菜单)=>权限按钮：`, btnNames.join(','))
      if (btnNames.indexOf(binding.value) > -1) {
        hasPermission = true
      }
    }else{
      hasPermission = true
    }
    if (!hasPermission) {
      el.style.display = 'none'
    }
  }
})
