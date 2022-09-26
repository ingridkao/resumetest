<template>
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
