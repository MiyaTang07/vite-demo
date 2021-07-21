const glob = require('glob')
const { join } = require('path')

// 创建文件内容
const createMainContent = name => `import { createApp } from 'vue'
import App from '${name}.vue'
createApp(App).mount('#app')`

// 创建模板文件
const createHtmlContent = name =>  `
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
    <script type="module" src="${name}.js"></script>
</body>
</html>
`

const pages = glob.sync('src/pages/**/')
const _pages = Array.isArray(pages) && pages.reduce((acc, p) =>  {
  let _p = p.split('src/pages/')[1]
  if (_p) {
    const name = _p.split('/')[0]
    !acc.includes(name) && acc.push(name)
  }
  return acc
}, [])

console.log(_pages)


const jsVm = {}
const htmlVm = {}
const inputInfo = {}
_pages.forEach(p => {
    const _dir = join(process.cwd(), `src/pages/${p}/`)
    jsVm[`pages/${p}/${p}.js`] = createMainContent(_dir + 'index')
    htmlVm[`pages/${p}.html`] = createHtmlContent(`pages/${p}/${p}`)
    inputInfo[p] = `pages/${p}.html`
})
const vms = {...jsVm, ...htmlVm}
module.exports = { vms, inputInfo}