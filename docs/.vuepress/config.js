module.exports = {
    title: '君逑的博客',
    description: 'blog,sidama,junqiu',
    //dest: 'dist',// 设置输出目录
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
        { text: '前端基础', link: '/guide/layout' },
        {
          text: '后端基础',
          // 这里是下拉列表展现形式。
          items: [
            { text: 'JAVA', link: 'http://c.biancheng.net/cpp/u/java_rumen/' },
            { text: 'PHP', link: '/guide/font' },
          ]
        }
      ],
      // 密钥
      // keyPage: {
      //   keys: ['09837bc188d666df38872c1274219a9c'], // 1.3.0 版本后需要设置为密文
      //   color: '#42b983', // 登录页动画球的颜色
      //   lineColor: '#42b983' // 登录页动画线的颜色
      // },
      smoothScroll: true,
      lastUpdated: 'Last Updated', // string | boolean
      //sidebar: 'auto',// 该语法表示使用当前页面标题自动生成侧边栏
      sidebar: 'auto',
      sidebarDepth: 2, // 侧边栏显示2级
      // 备案
      record: 'ICP 备案文案',
      recordLink: 'ICP 备案指向链接',
      cyberSecurityRecord: '公安部备案文案',
      cyberSecurityLink: '公安部备案指向链接',
      startYear: '2021',// 项目开始时间，只填写年份
      author: '君逑',//设置全局作者
    },
    plugins: ['@vuepress/back-to-top','demo-container']
  };