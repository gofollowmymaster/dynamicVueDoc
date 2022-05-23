module.exports = {
    title: 'Dynamic-Vue',
    description: '前端开发利器,数据驱动视图,高效低代码搬砖',
    dest: 'dist',// 设置输出目录
    base:'/dy-vue2',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
      ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
      ['link', { rel: 'icon', href: '/img/logo.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
      ['link', { rel: 'stylesheet', href: '/nav.css' }],
    ],
    markdown: {
        lineNumbers: true
      },
    // theme: 'reco',
    themeConfig: {
      type: 'blog',
    //   logo: '/img/logo.png',
      nav: [
        { text: '文档', link: '/guide/index' },
        { text: '组件', link: '/guide/components/index' },
        { text: '操作', link: '/guide/actions/index' },
        { text: '样式', link: '/guide/layout' },
        { text: '示例', link: '/pageBuilder/index' },
      ],
      sidebar: {
        '/guide/components/': [
          '',     /* /foo/ */
          'form',  /* /foo/one.html */
          'list',   /* /foo/two.html */
          'search',   /* /foo/two.html */
          'detail'   /* /foo/two.html */
        ],
  
        '/guide/actions/': [
          '',      /* /bar/ */
          'requestApi', /* /bar/three.html */
          'router'   /* /bar/four.html */
        ],
  
        // fallback
        // '/': [
        //   '',        /* / */
        //   'contact', /* /contact.html */
        //   'about'    /* /about.html */
        // ]
      },
      displayAllHeaders: false, // 默认值：false
      activeHeaderLinks: true, // 默认值：true
      lineNumbers: true,
      // 密钥
      // keyPage: {
      //   keys: ['09837bc188d666df38872c1274219a9c'], // 1.3.0 版本后需要设置为密文
      //   color: '#42b983', // 登录页动画球的颜色
      //   lineColor: '#42b983' // 登录页动画线的颜色
      // },
      smoothScroll: true,
      lastUpdated: 'Last Updated', // string | boolean
      // sidebar: 'auto',
      // sidebarDepth: 2, // 侧边栏显示2级
      // 备案
      record: 'ICP 备案文案',
      recordLink: 'ICP 备案指向链接',
      cyberSecurityRecord: '公安部备案文案',
      cyberSecurityLink: '公安部备案指向链接',
      startYear: '2021',// 项目开始时间，只填写年份
      author: 'huaz',//设置全局作者
    },
    plugins: ['@vuepress/back-to-top','demo-container'],
 
  };