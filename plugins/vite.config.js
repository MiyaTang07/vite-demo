var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// vite.config.js
__export(exports, {
  default: () => vite_config_default
});
var import_plugin_vue = __toModule(require("@vitejs/plugin-vue"));

// plugins/create-entry-plugin.js
var glob = require("glob");
var { join } = require("path");
var createMainContent = (name) => `import { createApp } from 'vue'
import App from '${name}.vue'
createApp(App).mount('#app')`;
var createHtmlContent = (name) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
</head>
<body>
    <div id="app"></div>
    <script type="module" src="${name}.js"><\/script>
</body>
</html>
`;
var pages = glob.sync("src/pages/**/");
var _pages = Array.isArray(pages) && pages.reduce((acc, p) => {
  let _p = p.split("src/pages/")[1];
  if (_p) {
    const name = _p.split("/")[0];
    !acc.includes(name) && acc.push(name);
  }
  return acc;
}, []);
console.log(_pages);
function virtual(modules) {
  return {
    name: "virtual",
    joinId(source) {
      return source;
    },
    load(id) {
      debugger;
      return id in modules ? modules[id] : "";
    }
  };
}
var jsVm = {};
var htmlVm = {};
var inputInfo = {};
_pages.forEach((p) => {
  const _dir = join(process.cwd(), `src/pages/${p}/`);
  jsVm[`pages/${p}/${p}.js`] = createMainContent(join(_dir, 'index'));
  htmlVm[`pages/${p}.html`] = createHtmlContent(`pages/${p}/${p}`);
  inputInfo[p] = `pages/${p}.html`
});
function mainFilePlugin() {
  return {
    options(options = {}) {
      options.plugins = [
        virtual({ ...jsVm, ...htmlVm }),
        ...options.plugins || []
      ];
      options.input = inputInfo
    }
  };
}

// vite.config.js
var path = require("path");
var config = ({ command, mode }) => {
  return {
    build: {
      rollupOptions: {
        output: {
          dir: path.join("/Volumes/FE\u76D8/big-frontend/vite-demo/my-vue-app", "dist")
        }
      }
    },
    plugins: [
      mainFilePlugin(),
      (0, import_plugin_vue.default)()
    ]
  };
};
var vite_config_default = config;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
