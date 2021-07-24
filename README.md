### 项目说明
- 在生产构建时，基于rollup的插件的hooks和约束大于配置原则，生成虚拟入口HTML和JS文件，一是方便以后的页面拓展和维护。
- 在开发环境构建时，利用express生成本地客户端静态服务器，读取生产构建过程中的内存虚拟文件并返回静态资源。
- 该项目可为前端多页项目构建提供静态模板

### 技术栈
- vite、rollup、vue3.0、express

### 页面特殊处理
- 使用<config>{页面信息}</config>，该特殊标签经过@vue/component-compiler-utils编译.vue的API方法获取该页面信息，并进行后续流程处理。（主要用来所有页面信息的统一输出和处理等。）