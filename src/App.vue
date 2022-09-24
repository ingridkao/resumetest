<template>
  <header>Header</header>
  <nav>
    <router-link 
      v-for="item in pageRoutes"
      :key="item.path"
      :to="item.path"
    >
      {{item.chName? item.chName: item.name }}
    </router-link> |
    <!-- <router-link to="/about">About</router-link> |
    <router-link to="/calendar">日曆</router-link> |
    <router-link to="/scroll">scroll事件</router-link> |
    <router-link to="/featrue">圖片相關</router-link> | -->
  </nav>
  <nav>
    <!-- <router-link :to="{
      name: 'shop',
      params: {
        productID: 1
      }
    }">商品1</router-link> -->
    <router-link 
      v-for="item in 10"
      :key="item"
      :to="{
        name: 'shop',
        params: {
          productID: item
        }
      }"
    >
      商品{{item }}
    </router-link>
  </nav>
  <!-- <nav>
    <template v-for="item in 5" :key="item">
      <router-link :to="`/shop/${item}`">/shop/{{item}}</router-link> | 
    </template>
    <router-link :to="{
      name: 'shop',
      params: {productID: '123'}
    }">/shop/123</router-link> | 
  </nav> -->
  <router-view/>
  <footer>Footer</footer>
</template>

<script>
import {routes} from '@/router/index.js'
export default {
  data(){
    return {
      // routes: routes
      //省略寫法
      routes,
    }
  },
  computed:{
    pageRoutes(){
      // const route = this.routes.filter(item => {
      //   console.log(item);
      //   return item.name !== "404"
      // })
      const route = this.routes.filter(item => item.name !== "404")
      return route
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 10px;
  a {
    font-weight: bold;
    color: #2c3e50;
    margin-right: .5rem;
    //模糊比對
    &.router-link-active {
      color: #4279b9;
    }
    //準確比對
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
