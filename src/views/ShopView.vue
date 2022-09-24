<template>
  <div class="shop">
    <h1>This is an shop page</h1>
    <h2>Product: {{$route.params.productID}}</h2>
    <!-- <nav>
      <template v-for="item in 5" :key="item">
        <router-link :to="`/shop/${item}`">/shop/{{item}}</router-link> | 
      </template>
    </nav> -->
    <!-- <router-view></router-view> -->


    <!-- {{num}}
    <el-button @click="add">Default</el-button>
    <hr>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="Pick a day"
    />
    {{value1}}
    
    <ImageItem/> -->
  </div>
</template>
<script>
import ImageItem from '@/components/ImageItem.vue'
export default {
    components: {
      ImageItem
    },
    data(){
      return {
        num: 0,
        value1: ''
      }
    },
    methods:{
      add(){
        this.num += 1
      }
    }
}
</script>
