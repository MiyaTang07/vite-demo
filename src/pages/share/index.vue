<template>
    <h4>页面👉I am share</h4>
    <div>
        我是count<button @click="countAdd">点我➕1</button>:{{count}}
    </div>
    <data-emit @data-received="dataReceived"></data-emit>
</template>

<script>
import DataEmit from '@pages/share/components/data-emit.vue'
export default {
    data() {
        return { count: 0 }
    },
    components: {
        DataEmit
    },
    methods: {
        countAdd() {
            this.count++
        },
        dataReceived(msg) {
           alert(msg)
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
button{
    margin: 0 10px;
}
</style>