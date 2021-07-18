###  说明
```安装教程
# npm 6.x
npm init @vitejs/app my-vue-app --template vue
```
```vite修改当前dev-server的根目录
vite serve some/sub/dir
```
- https://github.com/rollup/awesome（该地址罗列了诸多rollup的plugins资源）

1. 创建./src/pages/**/main.js入口虚拟文件 以及 **.html页面，动态引入main.js入口文件
2. 使用 @rollup/plugin-html插件生成html文件，并且动态引入main.js文件 
2. 寻找./src/pages/**/main.js文件内容
3. 使用@rollup/plugin-multi-entry插件生成入口配置