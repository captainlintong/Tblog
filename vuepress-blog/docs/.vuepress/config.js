const linuxChild = [
"/document/linux/",
"/document/linux/2.1Linux入门.md",
"/document/linux/2.2Linux安装",
"/document/linux/2.3Linux目录结构",
"/document/linux/3.1远程登录Linux系统",
"/document/linux/3.2vi和vim编辑器",
"/document/linux/3.3关机、重启和用户登录注销",
"/document/linux/3.4用户管理",
"/document/linux/3.5实用指令",
"/document/linux/3.6组管理和权限管理",
"/document/linux/3.7定时任务调度",
"/document/linux/3.8Linux磁盘分区、挂载度",
"/document/linux/3.9网络配置",
"/document/linux/3.10进程管理",
"/document/linux/3.11包管理工具(RPM和YUM)"
];

// const fs = require('fs')
// const dir = '/document/linux'
// const files = fs.readdirSync(dir)
// console.log('files', files);

module.exports = {
  title: "林通的博客",
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    ["link", { rel: "icon", href: "/t.png" }], // 增加一个自定义的 favicon(网页标签的图标)
    ["link", { rel: "manifest", href: "/t.png" }],
    ["link", { rel: "apple-touch-icon", href: "/t.png" }],
  ],
  themeConfig: {
    logo: "/t.png", // 左上角logo
    nav: [
      // 导航栏配置
      { text: "首页", link: "/" },
      { text: "技术文档", link: "/document/http/" },
      { text: "文章", link: "/article/" },
      { text: "github", link: "https://github.com/captainlintong" },
    ],
    sidebar: {
      // '/document/': [
      //   '',
      //   'vue',
      //   'ts',
      //   'react',
      //   'java'
      // ],
      "/document/": [
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
          title: "web协议", // 必要的
          path: "/document/http/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          children: ["/document/http/", "/document/http/tcp.md"],
        },
        {
          title: "看看vue", // 必要的
          path: "/document/work/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 1, // 可选的, 默认值是 1
          children: ["/document/work/"],
        },
        {
          title: "聊聊js", // 必要的
          path: "/document/js/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 1, // 可选的, 默认值是 1
          children: ["/document/js/", "/document/js/Array.md"],
        },
        {
          title: "webrtc", // 必要的
          path: "/document/webrtc", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 1, // 可选的, 默认值是 1
          children: ["/document/webrtc/"],
        },
        {
          title: "pdf预览", // 必要的
          path: "/document/pdf", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 1, // 可选的, 默认值是 1
          children: ["/document/pdf/"],
        },
        {
          title: "linux", // 必要的
          path: "/document/linux", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 1, // 可选的, 默认值是 1
          children: linuxChild,
        },
      ],
      "/article/": [
        {
          title: "文学", // 必要的
          path: "/article/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 1, // 可选的, 默认值是 1
          children: ["/article/", "my.md"],
          // children: ["/article/", "my.md", "sanshi.md"],
        },
      ],
    }, // 侧边栏配置
    sidebarDepth: 2,
    serviceWorker: true, // 是否开启 PWA
  },
};
