// .vuepress/config.js

module.exports = {
  // 网站 Title
  title: "Ourandream's Blog",

  // 网站描述
  description: "This is ourandream's blog",

  // 网站语言
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },

  // 使用的主题
  theme: "meteorlxy",

  // 主题配置
  themeConfig: {
    // 主题语言，参考下方 [主题语言] 章节
    lang: "zh-CN",

    // 个人信息（没有或不想设置的，删掉对应字段即可）
    personalInfo: {
      // 昵称
      nickname: "ourandream",

      // 个人简介 (支持 HTML)
      description: "Happy Coding<br/>Happy Life",

      // 电子邮箱
      email: "ouranhuang@outlook.com",

      // 所在地
      location: "GuangZhou, China",

      // 组织
      organization: "碧蓝档案剧情站",

      // 头像
      // 设置为外部链接
      avatar: "/img/head.jpg",
      // 或者放置在 .vuepress/public 文件夹，例如 .vuepress/public/img/avatar.jpg
      // avatar: '/img/avatar.jpg',

      // 社交平台帐号信息
      sns: {
        // Github 帐号和链接
        github: {
          account: "ourandream",
          link: "https://github.com/ourandream",
        },

        // 掘金 帐号和链接
        juejin: {
          account: "ourandream",
          link: "https://juejin.im/user/3565065937646490",
        },
      },
    },

    // 上方 header 的相关设置 (可选)
    header: {
      // header 的背景，可以使用图片，或者随机变化的图案（geopattern）
      background: {
        // 使用图片的 URL，如果设置了图片 URL，则不会生成随机变化的图案，下面的 useGeo 将失效

        // 使用随机变化的图案，如果设置为 false，且没有设置图片 URL，将显示为空白背景
        useGeo: true,
      },

      // 是否在 header 显示标题
      showTitle: true,
    },

    // 底部 footer 的相关设置 (可选)
    footer: {
      // 是否显示 Powered by VuePress
      poweredBy: true,

      // 是否显示使用的主题
      poweredByTheme: true,

      // 添加自定义 footer (支持 HTML)
      custom:
        'Copyright 2021-present <a href="https://github.com/ourandream" target="_blank">ourandream</a>',
    },

    // 个人信息卡片相关设置 (可选)
    infoCard: {
      // 卡片 header 的背景，可以使用图片，或者随机变化的图案（geopattern）
      headerBackground: {
        // 使用图片的 URL，如果设置了图片 URL，则不会生成随机变化的图案，下面的 useGeo 将失效
        url: "/assets/img/bg.jpg",

        // 使用随机变化的图案，如果设置为 false，且没有设置图片 URL，将显示为空白背景
        useGeo: true,
      },
    },

    // 是否显示文章的最近更新时间
    lastUpdated: true,

    // 顶部导航栏内容
    nav: [
      { text: "首页", link: "/", exact: true },
      { text: "文章", link: "/posts/", exact: false },
      { text: "关于", link: "/about", exact: false },
    ],

    // 是否开启平滑滚动
    smoothScroll: true,

    // vuepress-plugin-zooming 的配置项
    zooming: {
      // @see https://vuepress.github.io/en/plugins/zooming
    },

    // 评论配置，参考下方 [页面评论] 章节
    comments: {
      owner: "ourandream",
      repo: "vuepress-blog",
      clientId: "9d964db2690f7b46cdcd",
      clientSecret: "f4424dae8bb8f5a89eafeb059526667ab3e9977a",
      autoCreateIssue: process.env.NODE_ENV !== "development",
    },

    // 分页配置 (可选)
    pagination: {
      perPage: 5,
    },

    // 默认页面（可选，默认全为 true）
    defaultPages: {
      // 是否允许主题自动添加 Home 页面 (url: /)
      home: true,
      // 是否允许主题自动添加 Posts 页面 (url: /posts/)
      posts: true,
    },
  },
};
