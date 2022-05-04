# PJ栅格系统使用文档   <Badge text="beta" type="warning"/> <Badge text="默认主题"/>

## 技术支持
- 基于CSS3 Grid布局实现。主要使用到的css属性包括：grid-template-columns grid-template-rows  grid-gap grid-column-start  grid-column-end justify-self。
- 使用css变量 实现自定义间隙，响应式定义栅格列数
- 开发使用less的 import mixin  Variables  Recursive Mixins 等关键字

<dynamic-a> </dynamic-a>
<span v-for="i in 3">{{ i }} </span>

## 功能描述

- 支持不同设备列数响应式适配（默认手机竖屏6列，其他12列）
- 支持自定义间隙
- 支持偏移
- 支持珊格内元素对齐
- 响应式屏幕支持  


|  标签   | 尺寸  |  列类 | 偏移类 |
|  ----  | ----  | ----| ---- |
| lg  |  >1680 | pj-col-lg-* | pj-offset-lg-* |
| md  | 1367 ~ 1679 (Regular) |  pj-col-md-* | pj-offset-md-* |
| sm  | 1194 ~ 1367 |  pj-col-sm-* | pj-offset-sm-* |
| xs  | 768 ~ 1367  |  pj-col-xs-* | pj-offset-xs-* |
| pp  | 768 <  |  pj-col-pp-* | pj-offset-pp-* |



## 使用姿势
1. 全局容器类       #pj-full-container   不建议在body中添加
2. 行容器          .pj-row                
3. 列容器          .pj-col-*  必须为pj-ro类w的子元素  
4. 自适应          .pj-col-lg-*  必须为pj-row类的子元素  
5. 偏移            .pj-offset-lg-*  必须为pj-row类的子元素  
6. 栅格内元素对齐    .pj-grid-*   必须和pj-row类 同时使用
7. 调整栅格间隙      style="--layout-gap:1px" 必须和pj-row类 同时使用
8. 响应式整栅格间隙   style="--layout-lg-gap:5px;--layout-md-gap:4px;--layout-sm-gap:3px" 必须和pj-row pj-customer-gap 类 同时使用

```
  demo  参见index.html
```

## 注意事项：
- 由于竖向手机屏幕只有六列，其他屏幕为12列，
- 如需要适配手机竖屏:建议列数不要超过6（列数大于6时，系统自动向后排列，样式可能会有异常）如果列数超过6，建议添加响应式间隙，间隙单位不要使用百分比(%,vw,vh).同时必须使用 pj-col-pp-*  偏移必须添加pj-offset-pp-*  类。
- 如添加禁止缩放功能，布局单位使用(vw)会产生细微不一致。                        %为相对父元素（relative）高宽，vw为相对视口高宽


---
{
  "title": "Blogging Like a Hacker",
  "lang": "en-US"
}
---

