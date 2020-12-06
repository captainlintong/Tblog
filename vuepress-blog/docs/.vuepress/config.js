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
      {text: '技术文档', link: '/tech/' },
      {text: 'mpaas', link: 'https://tech.antfin.com/docs/2/49549'}
    ],
    sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 2,
    serviceWorker: true // 是否开启 PWA
  }
};