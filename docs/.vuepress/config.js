module.exports = {
    // 编译之后的站点地址，静态文件的地址
    dest: ".site",
    // 标题以及描述
    title: 'So me quit の 博客',
    description: 'Java 不止 不止 Java！',
    // HTML head 标签中的内容，常用于给网站添加图标和链接样式表
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }]
    ],
    // 网站基础目录
    base: '/',
    markdown: {
      lineNumbers: true
    },
    // vuepress 默认主题的设置
    themeConfig: {
        // 导航栏图标
        logo: '/logo.png',
        // 导航栏项目，按顺序从左到右显示
        nav: [
            // 可单项、可在 item 里嵌套 item 实现分类
            {text: '首页', link: '/'},
            {text: '作者', link: '/notes/about.html'},
            {text: 'Java',
                items: [
                    {text: '基础篇',
                        link: '/notes/java/base/计算机基础.html'},

                    {text: '集合篇',
                        link: '/notes/java/collection/collection.htm'},

                    {text: '并发篇',
                        link: '/notes/java/concurrent/concurrent.htm'},

                    {text: 'JVM',
                        link: '/notes/java/jvm/jvm.htm'},

                    {text: '网络编程（I/O）',
                        link: '/notes/java/io/io.htm'},

                    {text: '设计模式',
                        link: '/notes/java/design-pattern/design-pattern.htm'},

                    {text: '新版本',
                        link: '/notes/java/new-version/new-version.htm'},
                ]
            },
            {text: '算法',
                items: [
                    {text: 'Leetcode-比赛',
                        link: '/notes/algorithm/leetcode/contest/contest.html'},

                    {text: 'Leetcode-好题',
                        link: '/notes/algorithm/leetcode/problem/problem.html'},

                    {text: 'Leetcode-HOT100',
                        link: '/notes/algorithm/leetcode/hot100/hot100.html'},

                    {text: '算法模板',
                        link: '/notes/algorithm/template/template.html'},

                    {text: 'ACM',
                        link: '/notes/algorithm/acm/acm.html'},
                ]
            },

            {text: 'Spring 详解',
                items: [
                    {text: '手写简易-Spring',
                        link: '/notes/spring/easy-spring/easy-spring.html'},

                    {text: 'Spring与SpringBoot简介',
                        link: '/notes/spring/spring-springboot/spring-springboot.html'},
                ]
            },

            {text: 'MySQL', link: '/notes/mysql/mysql.html'},

            {text: 'Redis', link: '/notes/redis/redis.html'},

            {text: '分布式理论',
                items: [
                    {text: '《大型网站技术架构》',
                        link: '/notes/distributed/technical-architecture/technical-architecture.html'},
                ]
            },

            {text: 'OpenAI', link: '/notes/open-ai/open-ai.html'},

            {text: '线上问题',
                items: [
                    {text: '解决实际线上问题',
                        link: '/notes/production/issue/issue.thml'},

                    {text: '技术总结',
                        link: '/notes/production/summary/summary.thml'},

                    {text: '业务与技术',
                        link: '/notes/production/business/business.thml'},
                ]
            },
        ],

        // 侧边栏
        sidebarDepth: 0
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