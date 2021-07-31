<template>
   <h4>我是姓名列表👉</h4>
   <div>
       <input type="text" placeholder="请输入姓名" v-model="searchName" @keyup.enter="getSearchedName">
   </div>
   <p>{{nameLen}}</p>
   <p v-if="!nameList.length">暂无相关姓名信息</p>
   <ul v-else v-for="(name, key) in nameList" :key="key + 1">
       <li>{{name}}</li>
   </ul>
</template>

<script>
import useFetchNameList from './useFetchNameList'
import { computed } from 'vue'
export default {
    props: {
        user: ''
    },
    /**
     * 返回的对象将绑定到this实例化对象上，供this调用
     * */ 
    setup(props) {        
        const { nameList, getSearchedName, searchName } = useFetchNameList(props)
        
        const nameLen = computed(() => {
            const count = nameList.value.length
            return `当前姓名列表长度是: ${count}`
        })
        return {
          nameList,
          nameLen,
          searchName,
          getSearchedName
        }
    }
}
</script>

<style scoped>
input {
    min-width: 200px;
    height: 30px;
    text-indent: 10px;
}
</style>
