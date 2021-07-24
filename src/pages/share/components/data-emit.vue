<template>
   <h4>我是组件👉I am data-emit</h4>
    <div>
       我想要发送一个msg给父组件
       <button @click="sendMsg">点我发送信息</button>
    </div>
</template>

<script>
export default {
    props: {
        msg: String,
    },
    methods: {
        sendMsg() {
            this.$emit('data-received', 'hello world!')
        }
    },
    setup(props) {
        console.log(props.title)
        
    }
}
</script>
