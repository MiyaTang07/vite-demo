import axios from 'axios'

/**
 * 1.拦截请求和响应
 * 2.转换请求数据和响应数据
 * Vue.prototype.$http = Http
 * */ 
export default (options) => {
    const defaultOptions = {
        method: 'post',
        url: '',
        data: {}
    }
    const _opt = {...defaultOptions, ...options}

    const { method, url, data } = _opt
    axios[method](url, {
        params: data
    }).then((response) => {
        if (response.responseCode === '000000') {
            return response.data
        } else {
            alert(response.errorMsg)
        }
    }).catch(error => {
        console.log(error)
    })
}