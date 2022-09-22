<template>
    <button class="scrollToBtn left" @click="go1"> 👆🏿 </button>
    <button class="scrollToBtn right" @click="go2"> 👆 </button>
</template>

<script>
export default {
    methods:{
        go1(){
            window.scrollTo(0, 0)
        },
        go2(){
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        },
    }
}
</script>
<style lang="scss" scoped>
.scrollToBtn{
    position: absolute;
    bottom: 1rem;
    width: 2rem;
    height: 2rem;
    font-size: 1.5rem;
    border-radius: 50%;
    padding: 0;
    background-color: rgb(187, 185, 240);
    &.left{
        left: 1rem;
    }
    &.right{
        right: 1rem;
    }
}
</style>