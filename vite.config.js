const path = require('path')
import vue from '@vitejs/plugin-vue'
import virtual from './plugins/virtual-plugin.js'
import configExclude from './plugins/config-exclude-plugin.js'
const { vms, inputInfo } = require('./plugins/vms.js')


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
      configExclude(),
      vue()
    ]
  }
}