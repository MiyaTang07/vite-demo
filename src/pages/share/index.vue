<template>
    <h4>页面👉I am share</h4>
    <div>
        我是count<button @click="countAdd">点我➕1</button>:{{count}}
    </div>
    <div class="mar_t_20">
      <button @click="changeUserName">点我改变user的值</button>
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
        countAdd() {
            this.count++
        },
        changeUserName() {
           this.user = 'jo'
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