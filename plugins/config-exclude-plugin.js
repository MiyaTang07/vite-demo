/**magin-string用来操作字符串和生成source-map*/
import MagicString from 'magic-string'

export default () => {
    return {
        name: 'config-exclude',
        transform(code, id) {
            if (id.endsWith('.vue')) {
                // 匹配两个标签之间的字符内容，包括换行符
                const configNr = /<config>(.|\n)*?<\/config>/g.exec(code)
                
                if (configNr){
                    const [configJSON] = configNr
                    const transCode = code.replace(configJSON, '')

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