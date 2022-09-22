<template>
  <div class="scrollView">
    沒有用外部函式庫的寫法
    <nav>
      <button 
        v-for="item in count" :key="item"
        @click="scrollToBlock(`block${item}`)"
      > {{item}} </button>
    </nav>

    <!-- <div ref="block1">1</div>
    <div ref="block2">2</div>
    <div ref="block3">3</div> -->
    <div
      v-for="item in count" :key="item"
      :ref="`block${item}`"
    >
      {{item}}
    </div>

    <ScrollToTopBtn/>
  </div>
</template>
<script>
import ScrollToTopBtn from '@/components/ScrollTo.vue'
export default {
  components: {
    ScrollToTopBtn
  },
  data(){
    return {
      count: 5
    }
  },
  methods:{
    scrollToBlock(ref){
      // HTML直接寫div
      // const el = this.$refs[ref]

      // 跑for迴圈，會多一個陣列，可以用console.log(this.$refs[ref])觀察
      const el = this.$refs[ref][0]

      //取得元素的大小，以及其相對於可視範圍(viewport) 的位置
      const offsetTarget = el.getBoundingClientRect()
      window.scrollTo({
          top: (offsetTarget.top + window.pageYOffset),
          behavior: 'smooth'
      })
    },
    scrollToTop(){
      window.scrollTo(0,0)
    }
  },
  mounted(){
    //要用到mounted，不能用在created中，因為Dom元件還沒被掛載，讀不到window
    this.scrollToTop()
  }
}
</script>
<style lang="scss">
$base-color: rgb(74, 202, 174);
.scrollView{
  position: relative;
  nav{
    position: fixed;
    left: 1rem;
    top: 30vh;
    width: 5rem;
    button{
      display: block;
    }
  }
  >div{
    width: 100vw;
    height: 100vh;
    line-height: 100vh;
    font-size: 20rem;
    // https://sass-lang.com/documentation/at-rules/control/for
    @for $i from 1 through 5 {
      &:nth-child(#{$i}) {
        background-color: lighten($base-color, $i * 10%);
      }
    }
  }
}
</style>
