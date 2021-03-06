const express = require('express')
const { createServer: createViteServer } = require('vite')
const { vms } = require('./plugins/vms.js')
const open = require('open')
const ejs = require('ejs')

const htmlPageListDisplay = () => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= title %></title>
  </head>
  <body>
    <div>
    <h3>所有页面集合👇</h3>
    <% for(let key in list) {%>
      <div><%= key%></div>
      <% list[key].forEach(function(page){ %>
        <div style="margin-left:40px;">
        |-<a href="<%= page.path%>"><%= page.name%></a>   
        </div>     
      <% }); %>
      <% } %>
    </div>
  </body>
</html>
`
async function createServer() {
  const app = express()

  const vite = await createViteServer({
    server: { middlewareMode: 'development' }
  })
  // use vite's connect instance as middleware
  app.use(vite.middlewares)

  app.get('/', async (req, res) => {
    let list = Object.keys(vms).filter(page => page.endsWith('.html'))
    list = list.reduce((acc, cur) => {
      const items = cur.split('/', 6)
      if(!acc[items[0]]) {
        acc[items[0]] = []
      }
      acc[items[0]].push({
        name: items[1],
        path: cur
      })
      return acc
    }, {})
    const html = ejs.render(htmlPageListDisplay(), {
      list,
      title: '页面导航'
    })
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)  
  })
  
  app.use('/pages/*', async (req, res) => {
    let url = req.originalUrl
    const vmUrl = url.endsWith('.html') ? url.slice(1) : url.slice(1).concat('.html')
    if (vmUrl in vms) {
      try {
          const template = vms[vmUrl]
          // vite HTML transform--注入vite HMR client
          const html = await vite.transformIndexHtml(url, template)
          res.status(200).set({ 'Content-Type': 'text/html' }).end(html)           
      } catch (e) {
          console.error(e)
          res.status(500).end(e.message)
      }
    }
    
  })
  function tryListenOnAvaliablePort() {
    let PORT = process.env.PORT || 3000
    const listenOnPort = () => {
      app.listen(PORT, () => {
        const online = `http://localhost:${PORT}`
        console.log(`server is at 👉 ${online}`)
        open(online)
      }).on('error', (err) => {
         const { code } = err
         if (code === 'EADDRINUSE') {
           setTimeout(() => {
             vite.close()
             PORT++
             listenOnPort()
           })
         }
      })
    }
    return listenOnPort
  }
  tryListenOnAvaliablePort()()
}

createServer()