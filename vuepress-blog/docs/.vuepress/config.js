module.exports = {
  title: '林通的博客',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/t.png' }], // 增加一个自定义的 favicon(网页标签的图标)
    ['link', { rel: 'manifest', href: '/t.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/t.png' }],
  ],
  themeConfig: {
    logo: '/t.png',  // 左上角logo
    nav:[ // 导航栏配置
      {text: '首页', link: '/' },
      {text: '技术文档', link: '/document/http/' },
      {text: '文章', link: '/article/'},
      {text: 'github', link: 'https://github.com/captainlintong'}
    ],
    sidebar:  {
      // '/document/': [
      //   '',
      //   'vue',
      //   'ts',
      //   'react',
      //   'java'
      // ],
      '/document/': [
        // {
        // title: '前端', // 必要的
        // path: '/document/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        // collapsable: true, // 可选的, 默认值是 true,
        // sidebarDepth: 2, // 可选的, 默认值是 1
        // children: [
        //   '/document/',
        //   'vue',
        //   'ts',
        //   'react',
        //   'java'
        // ]},
        {
          title: 'web协议', // 必要的
          path: '/document/http/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          children: [
            '/document/http/',
            '/document/http/tcp.md'
          ]}
      ],
      '/article/': [{
          title: '文学',   // 必要的
          path: '/article/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 1,    // 可选的, 默认值是 1
          children: [
            '/article/',
            'my.md'
          ]
        }
      ]
    }, // 侧边栏配置
    sidebarDepth: 2,
    serviceWorker: true // 是否开启 PWA
  }
};