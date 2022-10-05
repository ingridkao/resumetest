<template>
  <div class="home">
    <MainHeader/>
    
    <MainItem 
      :info="title"
      :count="parentNum"
      @numadd="numAddOne"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import MainItem from '@/components/MainItem.vue'
import MainHeader from '@/components/layout/MainHeader.vue'

export default {
  components: {
    MainItem,
    MainHeader: MainHeader
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
