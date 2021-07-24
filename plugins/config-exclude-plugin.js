/**magin-string用来操作字符串和生成source-map*/
import MagicString from 'magic-string'
const fs = require('fs')
const { join } = require('path')

function stringToObject(str) {
    return (new Function("return " + str))()
}

function pipeJsonInfoToPages(json) {
    const info = {...json}
    const _url = join(process.cwd(), 'pages.json')
    
   if(!fs.existsSync(_url)) {
        writeJsonIntoPages(info)
   } else {
        let pageCache = fs.readFileSync(_url, { encoding: 'utf-8'})
        pageCache = typeof pageCache === 'string' && stringToObject(pageCache)
        pageCache = {...pageCache, ...info}
        writeJsonIntoPages(pageCache)
   }

   function writeJsonIntoPages(obj){
    fs.writeFileSync(_url, JSON.stringify(obj))
    console.log(`\n🎈${Object.keys(info)[0]} config info collected successfully🎈`)
   }
}

export default () => {
    return {
        name: 'config-exclude',
        transform(code, id) {
            if (id.endsWith('.vue')) {
                // 匹配两个标签之间的字符内容，包括换行符
                const configNr = /<config>(.|\n)*?<\/config>/g.exec(code)
                
                if (configNr){
                    const [configStr] = configNr
                    const transCode = code.replace(configStr, '')
                   
                    const strJSON = configStr.replace(/<config>|<\/config>|\n/g, '')
                    // 将json信息输入到本地pages.json中
                    const json = stringToObject(strJSON)
                    const pagename = id.split('src/pages/')[1]
                    debugger
                    pipeJsonInfoToPages({
                        [pagename]: {...json}
                    })

                    const magicString = new MagicString(transCode)
                    return {
                        code: magicString.toString(),
                        map: magicString.generateMap()
                    }
                }                
            }
        }
    }
}