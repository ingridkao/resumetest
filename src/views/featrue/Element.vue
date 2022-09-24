<template>
  <div class="shop">
    {{num}}
    <el-button @click="add">Default</el-button>
    <hr>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="Pick a day"
    />
    {{value1}}
    <ImageItem/>
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
