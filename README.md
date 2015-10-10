# Handl-web

### 环境搭建

- Node.js：v4.0+

- Sass & Compass (可选，如果不需要compass雪碧可以不安装sass与compass)

### 安装

``` bash
$ npm install -g gulp webpack
$ npm install -g node-dev
$ cd web && npm install
```

### 开发环境

- 开发

    ``` bash
    $ npm run start
    ```
    浏览器打开`http://localhost:3000/a.html`

- compass雪碧

    ``` bash
    $ compass watch
    ```
    在src/img/icons下添加图标后，会自动生成css/sprites－icons.css与img/sprites-icons.png

### 打包部署

－打包

    ``` bash
    $ npm run build
    ```
    将来build文件夹直接部署到apache

### 架构说明

    - 如果3000端口被占用，请到app.js中修改。

    - ajax跨域请求请到routes.js中参考line 34, 将ip改为所跨域服务器地址。

    - build后所有静态资源(css, js, img)将被压缩，并且会动态的按需合并。

    - 小于10KB的图片自动转为dataUrl，节省请求次数。

    - 开发阶段中css文件直接内嵌到head中，打包后css分离出来单独引用。

##### 目录结构

``` js
- web/
  - src/                   # 开发目录
    + css/                 # css
    + scss/                # sass雪碧
    + img/                 # 图片
    + js/                  # js&jsx
    a.html                 # page a
    b.html                 # page b
    c.html                 # page c
  + build/                 # 输出目录
  + mock/                  # 假数据
  app.js                   # 本地server
  routes.js                # 本地路由
  webpack.config.js        # webpack配置文件
  gulpfile.js              # gulp config
  package.json             # 配置
  README.md                # 说明
```