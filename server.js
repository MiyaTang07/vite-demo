const express = require('express')
const { createServer: createViteServer } = require('vite')
const { vms } = require('./vms.js')
const open = require('open')
const ejs = require('ejs')

const htmlPageListDisplay = () => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}</title>
  </head>
  <body>
    <ul>
      <% list.forEach(function(page){ %>
        <a href="<%= page%>"><%= page%></a>        
      <% }); %>
    </ul>
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
    const list = Object.keys(vms).filter(page => page.endsWith('.html'))
    const html = ejs.render(htmlPageListDisplay(), {
      list,
      title: '页面信息'
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