<template>
    <h4>页面👉I am share</h4>
    <div class="mar_t_20">
      <button @click="changeUserName">查询是否存在miya</button>
    </div>    
    <name-list :user="user"></name-list>
</template>

<script>
import NameList from '@pages/share/components/name-list.vue'
export default {
    data() {
        return { user: 'mi' }
    },
    components: {
        NameList
    },
    methods: {
        changeUserName() {
           this.user = 'miya'
        }
    }
}

</script>

<config>
{
    "title": "Share",
    "mark": "我是Share"
}
</config>

<style scoped>
.mar_t_20 {
    margin-top: 20px;
}
button{
    margin: 0 10px;
}
</style>