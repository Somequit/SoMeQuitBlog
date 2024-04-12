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
    },

    markdown: {
        lineNumbers: true,
        externalLinks: {
            target: '_blank', rel: 'noopener noreferrer'
        }
    },

    plugins: [
        // See: https://github.com/francoischalifour/medium-zoom#options
        ['@vuepress/medium-zoom', true],
        // see: https://github.com/znicholasbrown/vuepress-plugin-code-copy
        ['vuepress-plugin-code-copy', true],
        // see: https://github.com/tolking/vuepress-plugin-img-lazy
        ['img-lazy', {}],
    ],

    // vuepress 默认主题的设置
    themeConfig: {
        docsRepo: "SoMeQuit/Blog",
        // 编辑文档的所在目录
        docsDir: 'docs',
        // 文档放在一个特定的分支下：
        docsBranch: 'main',
        // 导航栏图标
        logo: "/logo.png",
        editLinks: true,
        sidebarDepth: 0,
        //smoothScroll: true,
        locales: {
        "/": {
            label: "简体中文",
            selectText: "Languages",
            editLinkText: "在 GitHub 上编辑此页",
            lastUpdated: "上次更新",
            nav: [
                // 可单项、可在 item 里嵌套 item 实现分类
                {text: '首页', link: '/'},

                {text: '作者', link: '/notes/about/about.md'},

                {text: 'Java',
                    items: [
                        {text: '基础篇',
                            link: '/notes/java/base/2023-03-02-第一章-计算机基础.md'},

                        {text: '集合篇',
                            link: '/notes/java/collection/2023-04-03-第一章-集合框架设计.md'},

                        {text: '并发篇',
                            link: '/notes/java/concurrent/2023-04-10-第一章-并发基础.md'},

                        {text: 'JVM',
                            link: '/notes/java/jvm/2023-04-15-第一章-走近Java.md'},

                        {text: '网络编程（I/O）',
                            link: '/notes/java/io/2023-05-10-第一章-IO模型.md'},

                        {text: '新版本',
                            link: '/notes/java/new-version/2023-05-13-第一章-函数式编程.md'},

                        {text: '设计模式',
                            link: '/notes/java/design-pattern/2023-06-05-第一章-简介设计模式.md'},
                    ]
                },

                {text: '算法',
                    items: [
                        {text: 'Leetcode-比赛',
                            link: '/notes/algorithm/leetcode/contest/contest.md'},

                        {text: 'Leetcode-好题',
                            link: '/notes/algorithm/leetcode/problem/problem.md'},

                        {text: 'Leetcode-HOT100',
                            link: '/notes/algorithm/leetcode/hot100/hot100.md'},

                        {text: '算法模板',
                            link: '/notes/algorithm/template/template.md'},

                        {text: 'ACM',
                            link: '/notes/algorithm/acm/acm.md'},
                    ]
                },

                {text: 'Spring 详解',
                    items: [
                        {text: '手写简易-Spring',
                            link: '/notes/spring/easy-spring/2023-03-28-第一章-手写简易 Spring（一）.md'},

                        {text: 'Spring与SpringBoot简介',
                            link: '/notes/spring/spring-springboot/2023-03-20-第一章-Spring 简介.md'},
                    ]
                },

                {text: 'MySQL', link: '/notes/mysql/2023-06-08-第一章-SQL 查询语句是如何执行的.md'},

                {text: 'Redis', link: '/notes/redis/redis.md'},

                {text: '分布式理论',
                    items: [
                        {text: '《大型网站技术架构》',
                            link: '/notes/distributed/technical-architecture/technical-architecture.md'},
                    ]
                },

                {text: 'OpenAI', link: '/notes/open-ai/open-ai.md'},

                {text: '线上问题',
                    items: [
                        {text: '解决实际线上问题',
                            link: '/notes/production/issue/issue.md'},

                        {text: '技术总结',
                            link: '/notes/production/summary/summary.md'},

                        {text: '业务与技术',
                            link: '/notes/production/business/business.md'},
                    ]
                },
            ],

            sidebar: {
                "/notes/java/base/": getBarJavaBase(),
                "/notes/java/collection/": getBarJavaCollection(),
                "/notes/java/concurrent/": getBarJavaConcurrent(),
                "/notes/java/jvm/": getBarJvm(),
                "/notes/java/io/": getBarJavaIO(),
                "/notes/java/new-version/": getBarJavaNewVersion(),
                "/notes/java/design-pattern/": getBarJavaDesignPattern(),

                "/notes/algorithm/leetcode/contest/": getBarAlgorithmLeetcodeContest(),
                "/notes/algorithm/leetcode/problem/": getBarAlgorithmLeetcodeProblem(),
                "/notes/algorithm/leetcode/hot100/": getBarAlgorithmLeetcodeHot100(),
                "/notes/algorithm/template/": getBarAlgorithmTemplate(),
                "/notes/algorithm/acm/": getBarAlgorithmACM(),

                "/notes/spring/easy-spring/": getBarSpringEasySpring(),
                "/notes/spring/spring-springboot/": getBarSpringSpringSpringboot(),

                "/notes/mysql/": getBarMysql(),

                "/notes/redis/": getBarRedis(),

                "/notes/distributed/technical-architecture/": getBarDistributedTechnicalArchitecture(),

                "/notes/open-ai/": getBarOpenAi(),

                "/notes/production/issue/": getBarProductionIssue(),
                "/notes/production/summary/": getBarProductionSummary(),
                "/notes/production/business/": getBarProductionBusiness(),

            }
        }
    }
    },
};

// "/notes/java/base/"
function getBarJavaBase() {
    return [
        {
            title: "Java 基础",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2023-03-02-第一章-计算机基础.md",
                "2023-03-03-第二章-面向对象.md",
            ]
        }
    ]
}

// "/notes/java/collection/"
function getBarJavaCollection() {
    return [
        {
            title: "Java 集合",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2023-04-03-第一章-集合框架设计.md",
            ]
        }
    ]
}

// "/notes/java/concurrent/"
function getBarJavaConcurrent() {
    return [
        {
            title: "Java 并发",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2023-04-10-第一章-并发基础.md",
            ]
        }
    ]
}

//  "/notes/java/jvm/"
function getBarJvm() {
    return [
        {
            title: "JVM",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2023-04-15-第一章-走近Java.md",
            ]
        }
    ]
}

// "/notes/java/io/"
function getBarJavaIO() {
    return [
        {
            title: "网络编程（I/O）",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2023-05-10-第一章-IO模型.md",
            ]
        }
    ]
}

// "/notes/java/new-version/"
function getBarJavaNewVersion() {
    return [
        {
            title: "Java 新版本",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2023-05-13-第一章-函数式编程.md",
            ]
        }
    ]
}

// "/notes/java/design-pattern/"
function getBarJavaDesignPattern() {
    return [
        {
            title: "设计模式",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2023-06-05-第一章-简介设计模式.md",
            ]
        }
    ]
}

// "/notes/algorithm/leetcode/contest/"
function getBarAlgorithmLeetcodeContest() {
    return [
        {
            title: "Leetcode 竞赛",
            collapsable: false,
            sidebarDepth: 0,
            children: [
            ]
        }
    ]
}

// "/notes/algorithm/leetcode/problem/"
function getBarAlgorithmLeetcodeProblem() {
    return [
        {
            title: "Leetcode 好题",
            collapsable: false,
            sidebarDepth: 0,
            children: [
            ]
        }
    ]
}

// "/notes/algorithm/leetcode/hot100/"
function getBarAlgorithmLeetcodeHot100() {
    return [
        {
            title: "Leetcode Hot100",
            collapsable: false,
            sidebarDepth: 0,
            children: [
            ]
        }
    ]
}

// "/notes/algorithm/template/"
function getBarAlgorithmTemplate() {
    return [
        {
            title: "算法模板",
            collapsable: false,
            sidebarDepth: 0,
            children: [
            ]
        }
    ]
}

// "/notes/algorithm/acm/"
function getBarAlgorithmACM() {
    return [
        {
            title: "ACM",
            collapsable: false,
            sidebarDepth: 0,
            children: [
            ]
        }
    ]
}

// "/notes/spring/easy-spring/"
function getBarSpringEasySpring() {
    return [
        {
            title: "手写简易 Spring",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2023-03-28-第一章-手写简易 Spring（一）.md",
            ]
        }
    ]
}

// "/notes/spring/spring-springboot/"
function getBarSpringSpringSpringboot() {
    return [
        {
            title: "Spring 与 SpringBoot",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2023-03-20-第一章-Spring 简介.md",
            ]
        }
    ]
}

// "/notes/mysql/"
function getBarMysql() {
    return [
        {
            title: "MySQL 数据库",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2023-06-08-第一章-SQL 查询语句是如何执行的.md",
            ]
        }
    ]
}

// "/notes/redis/"
function getBarRedis() {
    return [
        {
            title: "Redis 缓存",
            collapsable: false,
            sidebarDepth: 0,
            children: [
            ]
        }
    ]
}

// "/notes/distributed/technical-architecture/"
function getBarDistributedTechnicalArchitecture() {
    return [
        {
            title: "大型网站技术架构",
            collapsable: false,
            sidebarDepth: 0,
            children: [
            ]
        }
    ]
}

// "/notes/open-ai/"
function getBarOpenAi() {
    return [
        {
            title: "OpenAI",
            collapsable: false,
            sidebarDepth: 0,
            children: [
            ]
        }
    ]
}

// "/notes/production/issue/"
function getBarProductionIssue() {
    return [
        {
            title: "解决实际线上问题",
            collapsable: false,
            sidebarDepth: 0,
            children: [
            ]
        }
    ]
}

// "/notes/production/summary/"
function getBarProductionSummary() {
    return [
        {
            title: "技术总结",
            collapsable: false,
            sidebarDepth: 0,
            children: [
            ]
        }
    ]
}

// "/notes/production/business/"
function getBarProductionBusiness() {
    return [
        {
            title: "业务与技术",
            collapsable: false,
            sidebarDepth: 0,
            children: [
            ]
        }
    ]
}
