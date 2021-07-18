import vue from '@vitejs/plugin-vue'
import CreateEntryPlugin from './plugins/create-entry-plugin'
const path = require('path')

const config = ({command, mode}) => {
  return {
    build: {
      rollupOptions: {
        output: {
          dir: path.resolve(__dirname, 'dist')
        }
      }
    },    
    plugins:[
      CreateEntryPlugin(),
      vue()
    ]
  }
}
export default config
