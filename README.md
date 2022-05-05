## 简介

本项目为 vue3.2.8(setup 版本)+vant+ts+webpack+axiso+vueRouter+vuex 等全家桶 移动端框架

### 目录结构

```javascript
├── src                           项目主文件目录
│   ├── api                       axios请求
│   │   └── ...
│   ├── assets                    静态文件
│   ├── components                组件
│   ├── config                    环境配置
│   ├── router                    路由配置
│   ├── store                     状态管理配置
│   ├── utils                     工具
│   ├── views                     页面目录
│   │   └── ...
└── package.json                  项目依赖
└── vue.config.js                 配置文件
```

### 开始

克隆

```
git clone  https://gitee.com/onlysparrow/vue3-app-admin.git
```

安装依赖(\* 初次禁止使用 cnpm 安装,有依赖拉不下来或报错)

```
npm install
```

启动命令

```
npm run dev
```

打包各环境

```
npm run build:pro //生成环境  npm run build:pre //pre环境 npm run build:uat //测试环境
```

代码校验

```
npm run lint
```

代码修复

```
npm run lint --fix
```

## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 。本项目技术栈基于 [vue3](https://v3.cn.vuejs.org)、[TypeScript](https://www.tslang.cn/docs/handbook/basic-types.html)、[vant](https://vant-contrib.gitee.io/vant/v3/#/zh-CN/home), [vue-router](https://router.vuejs.org/zh-cn/), [vue-cli](https://github.com/vuejs/vue-cli)等提前了解和学习这些知识会对使用本项目有很大的帮助。

```

```
