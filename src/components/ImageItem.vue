<template>
  <div class="images">
    {{count}}
    <img v-for="item in count" :key="item" :src="imgURL + item"/>
    <button @click="count += 1">+</button>   
  </div>
</template>

<script>
export default {
    data(){
        return {
            imgURL: 'https://picsum.photos/200/200?random=',
            count: 5
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
