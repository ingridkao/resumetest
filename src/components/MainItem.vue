<template>
    <main>
        父層給的數字：{{count}}
        <button @click="modify"> 改父層的數字 </button>
        <hr>
        {{info}}
        <button @click="add"> + </button>
        {{childNum}}
        <button @click="reduse"> - </button>
        {{info}}
    </main>
</template>

<script>
export default {
    //寫法一：
    // props: ["info", "count"],
    //寫法二：
    // props: {
    //     info: String,
    //     count: Number
    // },
    //寫法三：
    props: {
        info: {
            type: String
        },
        count: {
            type: Number
        }
    },
    data(){
        return {
            childNum: 0
        }
    },
    methods:{
        add(){
            // this.childNum = this.childNum + 1
            this.childNum += 1
        },
        reduse(){
            this.childNum -= 1
        },
        modify(){
            // this.$emit('numadd')
            this.$emit('numadd', this.childNum)
        }
    }
}
</script>