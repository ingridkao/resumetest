<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="123" :title="'🐢'"/> -->
    <MainItem 
      :info="title"
      :count="parentNum"
      @numadd="numAddOne"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import MainItem from '@/components/MainItem.vue'

export default {
  components: {
    HelloWorld,
    MainItem
  },
  data(){
    return {
      title: '🐢',
      parentNum: 0
    }
  },
  methods:{
    numAddOne(val){
      this.parentNum += val
    }
  }
}
</script>
