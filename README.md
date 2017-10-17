# X-Music

> 🎵X-Music 是一款用Vue全家桶(2.x)制作的一款音乐App，性能交互媲美原生。https://maxchan7.github.io/X-Music/dist/

> 在 GitHub Pages 中，通过 jsonp 请求的数据会被正常渲染，而由于无 node 服务，通过 axios 请求的数据不会被正常渲染

![预览图](http://ww1.sinaimg.cn/large/6f28b746gy1fklfxwihycj20xc0jntcp.jpg)


## 技术栈

> [vue](https://github.com/vuejs/vue)

> [vue-router](https://github.com/vuejs/vue-router)

> [vuex](https://github.com/vuejs/vuex)

> [better-scroll](https://github.com/ustbhuangyi/better-scroll)

> [vue-lazyload](https://github.com/hilongjw/vue-lazyload)

> [jsonp](https://github.com/webmodules/jsonp)

> [axios](https://github.com/axios/axios)

### 目录结构

```
.
├── README.md
├── dist                     // 项目build目录
├── build                    // 项目的配置文件目录
│   ├── webpack.dev.conf.js  // 开发的Webpack 配置文件
│   ├── webpack.prod.conf.js // 生产的Webpack 配置文件
│   ├── webpack.base.conf.js // 基本的Webpack 配置文件
├── config                   // 环境变量和入口，出口配置
├── src                      // 生产目录
│   ├── api                  // 后端请求相关文件
│   ├── common               // css js 和图片资源
│   ├── base                 // 各种基础组件
│   ├── components           // 各种业务组件
│   ├── router               // 路由配置
│   ├── store                // 全局状态管理
│   └── App.vue              // 根组件
│   └── main.js              // 主入口文件
├── static                   // 静态资源目录
├── index.html               // 项目入口文件
├── package.json             // 项目配置文件
.
```


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
