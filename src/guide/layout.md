# 栅格系统使用文档  

## 技术支持
- 基于CSS3 Grid布局实现。主要使用到的css属性包括：grid-template-columns grid-template-rows  grid-gap grid-column-start  grid-column-end justify-self。
- 使用css变量 实现自定义间隙，响应式定义栅格列数
<!-- - 开发使用less的 import mixin  Variables  Recursive Mixins 等关键字 -->

 

## 功能描述

- 支持不同设备列数响应式适配（24列）
- 支持自定义间隙
- 支持偏移
- 支持珊格内元素对齐
- 响应式屏幕支持  


|  标签   | 尺寸  |  列类 | 偏移类 |
|  ----  | ----  | ----| ---- |
| md  | 1367 ~ 1679 (Regular) |  grid-col-md-* | grid-offset-md-* |
| sm  | 1194 ~ 1367 |  grid-col-sm-* | grid-offset-sm-* |
| xs  | 768 ~ 1367  |  grid-col-xs-* | grid-offset-xs-* |
| pp  | 768 <  |  grid-col-pp-* | grid-offset-pp-* |



## 使用姿势

1. 布局容器          .grid-wrap                
2. 列容器          .grid-col-*  必须为grid-ro类w的子元素  
3. 自适应          .grid-col-lg-*  必须为grid-row类的子元素  
4. 偏移            .grid-offset-lg-*  必须为grid-row类的子元素  
5. 栅格内元素对齐    .grid-grid-*   必须和grid-row类 同时使用
6. 调整栅格间隙      style="--layout-gap:1px" 必须和grid-row类 同时使用
7. 响应式整栅格间隙   style="--layout-lg-gap:5px;--layout-md-gap:4px;--layout-sm-gap:3px" 必须和grid-row grid-customer-gap 类 同时使用


 


