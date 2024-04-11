module.exports = {
    // 编译之后的站点地址，静态文件的地址
    dest: ".site",
    // 标题以及描述
    title: 'So me quitの博客',
    description: 'Java 不止 不止 Java！',
    // HTML head 标签中的内容，常用于给网站添加图标和链接样式表
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }]
    ],
    // 网站基础目录
    base: '/',
    markdown: {
      lineNumbers: false
    },
    // vuepress 默认主题的设置
    themeConfig: {
        // 导航栏图标
        logo: '/logo.png',
        // 导航栏项目，按顺序从左到右显示
        nav: [
            // 单项
            {text: '首页', link: '/'},
            {text: '作者', link: '/notes/about.html'},
            {text: 'Spring 详解', link: '/notes/spring/'},
            // 列表项，可以在 item 里嵌套 item 实现分类
            {
                text: 'Leetcode',
                items: [
                    {text: 'Leetcode-刷题',
                        items: [{text: 'Leetcode', link: '/notes/leetcode/'}]
                    },
                    {text: 'Leetcode-HOT100',
                        items: [{text: 'Leetcode', link: '/notes/leetcode/'}]
                    }
                ]
            }
        ],

        // 侧边栏
        sidebar: 'auto'
    },

    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            const dateTime = new Date().getTime();

            // 清除js版本号
            config.output.filename('assets/js/cg-[name].js?v=' + dateTime).end();
            config.output.chunkFilename('assets/js/cg-[name].js?v=' + dateTime).end();

            // 清除css版本号
            // config.plugin('mini-css-extract-plugin').use(require('mini-css-extract-plugin'), [{
            //     filename: 'assets/css/[name].css?v=' + dateTime,
            //     chunkFilename: 'assets/css/[name].css?v=' + dateTime
            // }]).end();
        }
    },
    // 是否开启默认预加载js
    shouldPrefetch: (file, type) => {
        return false;
    }


};