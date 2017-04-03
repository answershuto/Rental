# Rental app based on Node.js

## 运行

```bash
cd Rental

# install dependencies
npm install

# app running
npm start
```


	open localhost:2000


## 简介

基于Node.js的爬虫系统。

爬取58同城上的杭州租房信息，并用百度地图进行可视化显示，方便用户快速查找自己附近的租房信息。



![img](./views/image/1.png)   


![img](./views/image/2.png)


![img](./views/image/3.png)     


![img](./views/image/4.png)


## 目录结构
<pre>
├─  package.json        # 项目配置
├─  README.md           # 项目说明
├─  app.js              # 项目入口文件
├─  node_modules        # npm依赖包
├─  .babelrc            # babel配置
│
│
├─	app                 # node后端业务
		│
		│ controllers   #  控制器
		│ models        #  数据模型
		│ routes        #  路由分发
│
│
├─	bin                 # node启动
│
│
└─	views               # 前端代码
		│ css           # css文件
		│ js            # js文件
		│ image         # 图片文件
		│ index.html    # 首页
│
│
└─	config              # node配置
</pre>


## 教程：

[http://answershuto.github.io/jekyll/update/2016/10/25/养只爬虫当宠物-Node.js爬虫爬取58同城租房信息.html](http://answershuto.github.io/jekyll/update/2016/10/25/养只爬虫当宠物-Node.js爬虫爬取58同城租房信息.html)
