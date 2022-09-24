<template>
    <div class="shopList">
        <!-- {{mydata}} -->
        <div
            v-for="item in mydata"
            :key="item.id"
        >
            {{item}}
        </div>
    </div>
</template>
<script>
export default {
    props:{
        mydata:{
            type: Array
        } 
    }
}
</script>
<style lang="scss" scoped>
.shopList{
    display: flex;
    >div{
        width: 30%;
        height: 10rem;
    }
}
</style>