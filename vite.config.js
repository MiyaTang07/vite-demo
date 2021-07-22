import vue from '@vitejs/plugin-vue'
const path = require('path')
const { vms, inputInfo } = require('./vms.js')

/**生成虚拟文件*/
function virtual() {
  const vm = {...vms}
  return {
    name: 'virtual',
    resolveId(id) {
      return id in vm ? id : null
    },
    load(id) {
      //修复dev环境下JS文件路径问题
      if(id.startsWith('/pages') && id.endsWith('.js')) {
        id = id.split('/pages/')[1]
      }
      return id in vm ? vm[id] : null
    }
  }
}

export default () => {
  return {
    build: {
      rollupOptions: {
        input: inputInfo,
        output: {
          dir: path.resolve(__dirname, 'dist')
        }
      }
    },    
    plugins:[
      virtual(vms),
      vue()
    ]
  }
}