<template>
  <nav>
    <!-- <router-link to="/">Home</router-link> | -->
    <router-link :to="{name: 'home'}">Home</router-link> |

    <router-link to="/about">About</router-link> |
    <!-- <router-link to="/shop">route說明(shop)</router-link> |  -->
    <router-link to="/calendar">日曆</router-link> |
    <router-link to="/scroll">scroll事件</router-link> |

    <!-- <router-link to="/featrue">圖片相關</router-link> | -->
    <!-- <router-link :to="{ path: '/featrue'}">圖片相關</router-link> | -->
    <router-link :to="{ name: 'featrue'}">圖片相關</router-link> |
  </nav>

  <nav>
    <template v-for="item in 5" :key="item">
      <router-link :to="`/shop/${item}`">/shop/{{item}}</router-link> | 
    </template>
    <router-link :to="{
      name: 'shop',
      params: {productID: '123'}
    }">/shop/123</router-link> | 
  </nav>
  <router-view/>
</template>

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
